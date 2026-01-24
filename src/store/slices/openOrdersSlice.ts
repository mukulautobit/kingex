// src/store/slices/openOrdersSlice.ts

import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { apiClient } from "../../service/socketService";
import type { RootState } from "../Store";
import { hideLoader, showLoader } from "./loadingSlice";
import { showToasty } from "./notificationSlice";

// --- NEW TYPES FOR RAW API RESPONSE ---

// The data structure for an individual order object received directly from the API query
export interface RawOrderData {
  account_id: string;
  end_execution_time: number;
  filled_qty: number;
  id: string;
  instrument_id: string;
  // The instruments array structure from the raw response
  instruments: Array<{
    trading_name?: string;
    static_data?: {
      contract_size?: number;
      contractsize?: number;
      tick_size?: number; 
      ticksize?: number;
    };
  }>;
  metadata: {
    legs: {
      stoploss: number;
      target: number;
    };
  };
  order_type: "market" | "limit" | "stop";
  placed_qty: number;
  placed_time: number;
  position_id: string;
  price: number;
  side: "buy" | "sell";
  status: "pending" | "partial_filled" | "placed" | string;
  tid: string;
  validity: string;
  validity_type: string;
}

// The complete API response structure for a successful query
export interface ApiQueryResponse {
  map(arg0: (order: RawOrderData) => OpenOrder): OpenOrder[];
  status: "success" | "failed";
  data?: RawOrderData[]; // The data property holds the array of raw orders
  message?: string;
}

// --- NEW TYPE FOR CANCEL ORDER API RESPONSE ---
interface CancelOrderApiResponse {
  data: string; // The ID of the canceled order, e.g., "SEP25-c190c039..."
  message: string;
  status: "success" | "failed";
}
// --- END NEW TYPES ---

// --- Types for Instrument Static Data (from your API response) ---
export interface InstrumentStaticData {
  contract_size?: number;
  contractsize?: number;
  tick_size?: number;
  ticksize?: number;
  trading_name: string; // This is added via the query path
}

// --- Types for Open Order Data (based on your API response) ---
export interface OpenOrder {
  account_id: string;
  end_execution_time: number;
  filled_qty: number;
  id: string;
  instrument_id: string;
  // Note: The instruments field in OpenOrder is simplified/modified after mapping,
  // but we can keep it for consistency with the original structure if needed.
  instruments: InstrumentStaticData[];
  metadata: {
    legs: {
      stoploss: number;
      target: number;
    };
  };
  order_type: "market" | "limit" | "stop";
  placed_qty: number;
  placed_time: number;
  position_id: string;
  price: number;
  side: "buy" | "sell";
  status: "pending" | "partial_filled" | "placed" | string;
  tid: string;
  validity: string;
  validity_type: string;
  // Utility field for display (for easier access)
  trading_name: string;
  contract_size: number;
}

interface OpenOrdersState {
  orders: OpenOrder[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OpenOrdersState = {
  orders: [],
  status: "idle",
  error: null,
};

// --- Thunk for fetching pending orders data ---
export const fetchOpenOrders = createAsyncThunk<
  OpenOrder[],
  void,
  { rejectValue: string }
>(
  "openOrders/fetchOpenOrders",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());

      console.log("⏳ Waiting for WebSocket connection (open orders)...");

      return await new Promise<OpenOrder[]>((resolve, reject) => {
        apiClient.onConnected(async () => {
          try {
            console.log("✅ WebSocket connected, fetching open orders...");

            const query =
              'fintrabit.orders[status="pending" or status="partial_filled"]._desc(placed_time){instruments.trading_name,account_id,end_execution_time,filled_qty,id,instrument_id,metadata,order_type,placed_qty,placed_time,position_id,price,side,start_execution_time,status,tid,instruments.static_data}';

            const response = await apiClient.send<ApiQueryResponse>(
              "query",
              { query }
            );

            console.log("📥 Open orders response:", response);

            if (response.status === "success" && response.data) {
              const ordersWithUtilityFields: OpenOrder[] = response.data.map(
                (order: RawOrderData) => {
                  const instrumentData = order.instruments?.[0];

                  const contractSize =
                    instrumentData?.static_data?.contract_size ??
                    instrumentData?.static_data?.contractsize ??
                    (instrumentData as any)?.contract_size ??
                    (instrumentData as any)?.contractsize ??
                    1;

                  return {
                    ...order,
                    instruments: [], // normalize
                    trading_name: instrumentData?.trading_name || "N/A",
                    contract_size: contractSize,
                  } as OpenOrder;
                }
              );

              resolve(ordersWithUtilityFields);
            } else {
              reject(response.message || "Failed to fetch open orders");
            }
          } catch (error) {
            const message =
              (error as { message?: string }).message ||
              "Open orders fetch failed";
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

/**
 * Thunk for canceling an order.
 * @param orderId The ID of the order to cancel.
 */
export const cancelOrder = createAsyncThunk<
  string, // Return type is the canceled order ID
  { orderId: string; accountId: string }, // Argument type is an object
  { state: RootState } // Define the thunk context
>("openOrders/cancelOrder", async ({ orderId, accountId }, { rejectWithValue, dispatch }) => {
  try {
    // === INTEGRATED API CALL ===
    const response = await apiClient.send<CancelOrderApiResponse>(
      "order/cancel",
      {
        id: orderId, // Use 'id' as per your request JSON
        account_id: accountId, // Required field
      }
    );
    // === END API CALL ===

    if (response.status === "success") {
      console.log(`Order ${orderId} successfully canceled.`);

      // Optimistically dispatch action to remove the order from state
      dispatch(openOrdersSlice.actions.removeOrder(orderId));

      // Return the order ID to the fulfilled action handler
      dispatch(
        showToasty({
          title: "Success",
          message: "Order cancelled successfully!",
          type: "success",
        })
      );
      return orderId;
    } else {
      // API call failed, but returned a status
      return rejectWithValue(
        response.message || `Failed to cancel order ${orderId}`
      );
    }
  } catch (error) {
    const errorMessage =
      (error as { message?: string }).message ||
      `An unknown error occurred while canceling order ${orderId}.`;
      dispatch(
        showToasty({
          title: "Error",
          message:
            (error as { message?: string }).message ||
            "Failed to cancel order.",
          type: "error",
        })
      );
    return rejectWithValue(errorMessage);
  }
});

/**
 * Thunk for updating an order (e.g., SL/TP).
 * @param orderPayload The full order object with ID, account_id, etc.
 */
export const updateOrder = createAsyncThunk<
  string, // Return type is the updated order ID or message
  {
    id: string;
    account_id: string;
    instrument_id: string;
    qty: number;
    price: number;
    order_type: string;
    side: "buy" | "sell";
    stoploss: number;
    target: number;
  },
  { state: RootState }
>("openOrders/updateOrder", async (orderPayload, { rejectWithValue, dispatch }) => {
  try {
    const response = await apiClient.send<CancelOrderApiResponse>(
      "order/update",
      orderPayload
    );
    console.log("RESPONSE",response)
    if (response.status === "success") {
      console.log(`Order ${orderPayload.id} successfully updated.`);
      // Refresh the open orders list
      dispatch(fetchOpenOrders());
      dispatch(
        showToasty({
          title: "Success",
          message: "Order updated successfully!",
          type: "success",
        })
      );

      return orderPayload.id;
    } else {
      return rejectWithValue(
        response.message || `Failed to update order ${orderPayload.id}`
      );
    }
  } catch (error) {
    const errorMessage =
      (error as { message?: string }).message ||
      `An unknown error occurred while updating order ${orderPayload.id}.`;
      dispatch(
        showToasty({
          title: "Error",
          message: errorMessage,
          type: "error",
        })
      );
    return rejectWithValue(errorMessage);
  }
});

export const openOrdersSlice = createSlice({
  name: "openOrders",
  initialState,
  reducers: {
    // Reducer to handle order updates from a WebSocket stream can be added here later
    // ✅ Reducer to remove a canceled order from the state
    removeOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpenOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchOpenOrders.fulfilled,
        (state, action: PayloadAction<OpenOrder[]>) => {
          state.status = "succeeded";
          state.orders = action.payload;
        }
      )
      .addCase(fetchOpenOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        console.error("Order update failed:", action.payload);
      });
  },
});

export const selectOpenOrders = (state: RootState) => state.openOrders.orders;
export const selectOpenOrdersStatus = (state: RootState) =>
  state.openOrders.status;

export default openOrdersSlice.reducer;