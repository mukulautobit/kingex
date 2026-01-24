import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../service/socketService';
import { hideLoader, showLoader } from './loadingSlice';

export type Category = string; 

interface CategoriesState {
  data: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
      
      console.log(" Waiting for WebSocket connection...");
      
      //  Wait for connection before sending
      return await new Promise<Category[]>((resolve, reject) => {
        apiClient.onConnected(async () => {
          try {
            console.log("✅ WebSocket connected, fetching categories...");
            
            const response = await apiClient.send<Category[]>("query", {
              query: "fintrabit.instrument_categories[type=\"static\"].name"
            });

            console.log(" Categories response:", response);

            if (response.status === 'success' && response.data) {
              resolve(response.data);
            } else {
              reject(response.message || "Failed to fetch categories.");
            }
          } catch (error) {
            console.error(" Categories fetch error:", error);
            const errorMessage = (error as { message?: string }).message || "An unknown error occurred";
            reject(errorMessage);
          }
        });
      });
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoader());
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log("categories_is_fullfilled")
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.data = [];
      });
  },
});

export default categoriesSlice.reducer;