
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { apiClient } from "../../service/socketService";
// import { useAppDispatch } from "../hook";

export interface Instrument {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dinamic_data: any;
  id: string;
  name: string;
  trading_name: string;
  feeding_name: string;
  icon: string;
  overnight_margin_time: string;
  static_category_id: string;
  static_data: Record<string, string | number>;
  timings: string;
  dinamic_category_ids?: { id: string; history_interval: number }[];
}

interface InstrumentsState {
  data: Record<string, Instrument[]>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedInstrumentId: string | null;

}
const INSTRUMENT_STORAGE_KEY = 'selectedInstrument';
// Helper to load the ID from localStorage
const loadSelectedInstrumentId = (): string | null => {
  try {
    const storedId = localStorage.getItem(INSTRUMENT_STORAGE_KEY);
    return storedId;
  } catch (e) {
    console.error("Failed to load selected instrument ID from localStorage", e);
    return null;
  }
};

const loadState = (): Record<string, Instrument[]> => {
  try {
    const serializedState = localStorage.getItem('instrumentsData');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from local storage", err);
    return {};
  }
};

const initialState: InstrumentsState = {
  data: loadState(),
  status: "idle",
  error: null,
  selectedInstrumentId: loadSelectedInstrumentId(),
};

export const fetchInstrumentsByCategory = createAsyncThunk(
  "instruments/fetchInsturmentCategory",
  async (categoryName: string, { rejectWithValue }) => {
    try {
      // let query = `fintrabit.instruments[category[0].name="${categoryName}"]`

      console.log("INSTRUMENT_CALL", categoryName)
      const response = await apiClient.send<Instrument[]>("query", {
        query: `fintrabit.instruments[category[0].name="${categoryName}"]`,
      });

      // await apiClient.
      console.log("RESPOINSE", response)
      if (response.status === "success" && response.data) {
        // Save to local storage after successful fetch
        console.log(response)
        const existingData = JSON.parse(localStorage.getItem('instrumentsData') || '{}');
        const newData = { ...existingData, [categoryName]: response.data };
        localStorage.setItem('instrumentsData', JSON.stringify(newData));
        return { categoryName, instruments: response.data };
      }

      return rejectWithValue(
        response.message || "Failed to fetch instruments for this category."
      );
    } catch (error) {
      console.error("❌ THUNK ERROR:", error);

      const errorMessage =
        (error as { message?: string }).message || "An unknown error occurred";

      return rejectWithValue(errorMessage);
    }
  }
);

const instrumentsSlice = createSlice({
  name: "instruments",
  initialState,
  reducers: {
    setSelectedInstrument: (state, action: PayloadAction<string>) => {
      state.selectedInstrumentId = action.payload;
      // Persist the ID to session storage
      localStorage.setItem(INSTRUMENT_STORAGE_KEY, action.payload);
    },
    updateInstrumentFeed: (state, action) => {
      const { instrument_id, data } = action.payload;

      for (const category in state.data) {
        state.data[category] = state.data[category].map((inst) =>
          inst.id === instrument_id
            ? {
              ...inst,
              dinamic_data: {
                ...inst.dinamic_data,
                quotes: {
                  ...inst.dinamic_data.quotes,
                  ...data.quotes,
                },
              },
            }
            : inst
        );
      }
    }



  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstrumentsByCategory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchInstrumentsByCategory.fulfilled,
        (
          state,
          action: PayloadAction<{
            categoryName: string;
            instruments: Instrument[];
          }>
        ) => {
          state.status = "succeeded";
          const { categoryName, instruments } = action.payload;
          state.data[categoryName] = instruments;
        }
      )
      .addCase(fetchInstrumentsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedInstrument, updateInstrumentFeed } = instrumentsSlice.actions;


export default instrumentsSlice.reducer;