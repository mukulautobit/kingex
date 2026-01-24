// src/store/slices/quotesSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../Store';

export interface QuoteData {
  id: string; 
  name: string;
  feeding_name: string;
  trading_name: string;
  bid: number;
  ask: number;
  low: number;
  high: number;
  close: number;
  open: number;
  timestamp: number;
  ltp: number; 
  contract_size?: number;
  contractsize?: number;
  tick_size?: number;
  ticksize?: number;
  static_data: Record<string, string | number>;
}

// ✅ NEW: Type for the incoming stream data payload for better type safety
export type StreamDataPayload = {
  ask?: number[];
  askq?: number[];
  bid?: number[];
  bidq?: number[];
  // New OHLC format
  c?: number | number[]; // close
  h?: number | number[]; // high
  l?: number | number[]; // low
  o?: number | number[]; // open
  // Old format (backward compatibility)
  close?: number[];
  high?: number[];
  low?: number[];
  open?: number[];
  ltp?: number[];
  ltpq?: number[];
  ltpt?: number[];
};

interface QuotesState {
  quotes: QuoteData[];
}

const initialState: QuotesState = {
  quotes: [],
};

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    // Sets the list of instruments for the current active page
    setQuotes: (state, action: PayloadAction<QuoteData[]>) => {
      state.quotes = action.payload;
    },

    // ✅ REWRITTEN REDUCER to update both watchlist and live cache
    updateQuoteData: (state, action: PayloadAction<{ instrumentId: string; data: StreamDataPayload }>) => {
      const { instrumentId, data } = action.payload;

      // Helper to safely get value (whether it's number, array, or undefined)
      const getValue = (val: number | number[] | undefined): number | undefined => {
        if (typeof val === 'number') return val;
        if (Array.isArray(val) && val.length > 0) return val[0];
        return undefined;
      };

      // Debug logging
      const c = getValue(data.c);
      const h = getValue(data.h);
      const l = getValue(data.l);
      const o = getValue(data.o);
      
      const index = state.quotes.findIndex(q => q.id === instrumentId);
      if (index !== -1) {
        state.quotes[index] = {
          ...state.quotes[index],
          bid: getValue(data.bid) ?? state.quotes[index].bid,
          ask: getValue(data.ask) ?? state.quotes[index].ask,
          low: l ?? getValue(data.low) ?? state.quotes[index].low,
          high: h ?? getValue(data.high) ?? state.quotes[index].high,
          close: c ?? getValue(data.close) ?? state.quotes[index].close,
          open: o ?? getValue(data.open) ?? state.quotes[index].open,
          ltp: getValue(data.ltp) ?? state.quotes[index].ltp,
          timestamp: getValue(data.ltpt) ?? state.quotes[index].timestamp,
        };
      }
    },

    // Clears quotes (Call this on unmount or before setting new page quotes)
    clearQuotes: (state) => {
      state.quotes = [];
    }
  },
});

export const { setQuotes, updateQuoteData, clearQuotes } = quotesSlice.actions;
export const selectQuotes = (state: RootState) => state.quotes.quotes;
export default quotesSlice.reducer;