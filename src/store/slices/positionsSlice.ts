import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { apiClient, subscribeToInstruments } from '../../service/socketService';
import type { RootState } from '../Store';
import { hideLoader, showLoader } from './loadingSlice';

// --- Types for TOrder (Stop Loss/Take Profit) Data ---
export interface TOrder {
    account_id: string;
    end_execution_time: number;
    filled_qty: number;
    id: string;
    instrument_id: string;
    metadata: {
        legs: {
            stoploss: number;
            target: number;
        };
    };
    order_type: 'limit' | 'stop' | string; // 'limit' for T/P, 'stop' for S/L
    placed_qty: number;
    placed_time: number;
    position_id: string;
    price: number;
    side: 'buy' | 'sell';
    start_execution_time: number;
    status: string;
    tid: string;
    validity: string;
    validity_type: string;
}

// --- Types for Position Data --- 
export interface Position {
    id: string;
    account_id: string;
    closed_pnl: number;
    created_at: number;
    instrument_id: string;
    price: number;
    qty: number;
    side: 'buy' | 'sell';
    status: string;
    tid: string;
    trading_name: string;
    updated_at: number;
    used_balance: number;
    position_id?: string;
    // CRITICAL FIX: Ensure torders is typed correctly, but we'll normalize it to TOrder[] in the thunk
    torders: TOrder[];
    // Live data from WebSocket stream (will be added dynamically)
    live_bid?: number;
    live_ask?: number;
}

// Internal type for data coming directly from the API (before normalization)
type PositionApiData = Omit<Position, 'torders'> & {
    torders: TOrder[] | string | undefined; // Handle string (e.g., "") or undefined from API
};

interface PositionsState {
    positions: Position[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: PositionsState = {
    positions: [],
    status: 'idle',
    error: null,
};

// Type for the incoming stream data payload
type QuoteStreamDataPayload = {
    bid?: number[];
    ask?: number[];
};


// --- Thunk for fetching initial positions data ---
export const fetchPositions = createAsyncThunk<
  Position[],
  void,
  { rejectValue: string }
>(
  "positions/fetchPositions",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      console.log("⏳ Waiting for WebSocket connection (positions)...");

      return await new Promise<Position[]>((resolve, reject) => {
        apiClient.onConnected(async () => {
          try {
            console.log("✅ WebSocket connected, fetching positions...");

            const query =
              'fintrabit.positions[status="open" or status="partial"]{account_id,closed_pnl,created_at,id,instrument_id,price,qty,side,status,tid,updated_at,used_balance,"trading_name":instruments.trading_name[0],torders[status="pending"],instruments.static_data}';

            const response = await apiClient.send<PositionApiData[]>(
              "query",
              { query }
            );

            console.log("📥 Positions response:", response);

            if (response.status === "success" && response.data) {
              const normalizedData: Position[] = response.data.map((pos) => ({
                ...pos,
                torders: Array.isArray(pos.torders)
                  ? (pos.torders as TOrder[])
                  : [],
              }));

              resolve(normalizedData);
            } else {
              reject(response.message || "Failed to fetch positions");
            }
          } catch (error) {
            const message =
              (error as { message?: string }).message ||
              "Positions fetch failed";
            reject(message);
          }
        });
      });
    } catch (error) {
      return rejectWithValue(
        (error as { message?: string }).message || "Unknown error"
      );
    } finally {
      dispatch(hideLoader());
    }
  }
);


export const positionsSlice = createSlice({
    name: 'positions',
    initialState,
    reducers: {
        // Reducer to update live price data for a position
        updatePositionQuote: (state, action: PayloadAction<{ instrumentId: string; data: QuoteStreamDataPayload }>) => {
            const { instrumentId, data } = action.payload;
            const positionsToUpdate = state.positions.filter(pos => pos.instrument_id === instrumentId);

            positionsToUpdate.forEach(pos => {
                // Update bid and ask if they exist in the incoming data
                if (data.bid && data.bid.length > 0) {
                    pos.live_bid = data.bid[0];
                }
                if (data.ask && data.ask.length > 0) {
                    pos.live_ask = data.ask[0];
                }
            });
        },
        // Action to optimistically remove a position from the store
        removePosition: (state, action: PayloadAction<string>) => {
            state.positions = state.positions.filter(pos => pos.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPositions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPositions.fulfilled, (state, action: PayloadAction<Position[]>) => {
                state.status = 'succeeded';
                state.positions = action.payload;

                // Collect unique instrument IDs to subscribe to their quotes
                const uniqueInstrumentIds = Array.from(new Set(action.payload.map(pos => pos.instrument_id)));
                subscribeToInstruments(uniqueInstrumentIds);
            })
            .addCase(fetchPositions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { updatePositionQuote, removePosition } = positionsSlice.actions;
export const selectPositions = (state: RootState) => state.positions.positions;
export default positionsSlice.reducer;