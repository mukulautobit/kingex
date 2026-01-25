/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../service/socketService";
import { hideLoader, showLoader } from "./loadingSlice";
import { parseErrorMessage } from "../../Utils/errorUtils";

// --- Interfaces ---
// --- Interfaces ---
export interface VariableDefinitionValue {
  name: string;
  type: string;
  side: string;
  [key: string]: any;
}

export interface VariableDefinition {
  account_id: string;
  id: string;
  level: string;
  level_value: {
    category?: string;
    instrument?: string;
  };
  name: string;
  value: VariableDefinitionValue[];
}

export interface AccountLevelSetting {
  variable: string;
  value: Record<string, any>[];
}

export interface CategoryLevelSetting extends AccountLevelSetting {
  category: string;
}

export interface InstrumentLevelSetting extends CategoryLevelSetting {
  name: string; 
}

export interface Account {
  id?: string;
  username: string;
  password?: string;
  type: string;
  system: string;
  currency: string;
  balance?: number;
  broker_code?: string;
  account_level_settings: AccountLevelSetting[];
  category_level_settings: CategoryLevelSetting[];
  instrument_level_settings: InstrumentLevelSetting[];
  variables_definitions?: VariableDefinition[];
}

type Status = "idle" | "loading" | "succeeded" | "failed";

interface AccountsState {
  data: Account[];
  status: Status;
  error: string | null;
}

const initialState: AccountsState = {
  data: [],
  status: "idle",
  error: null,
};

// --- Async Thunks ---

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAll",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
      if (!apiClient) {
        return rejectWithValue("WebSocket not connected");
      }
      const [accountsRes, variablesRes] = await Promise.all([
        apiClient.send<Account[]>("query", {
          query: "fintrabit.accounts",
        }),
        apiClient.send<any[]>("query", {
          query: "fintrabit.accounts{variables_definitions}",
        }),
      ]);

      if (accountsRes.status === "success") {
        const accounts = accountsRes.data || [];
        const variablesData = variablesRes.data || [];

        // Merge variables_definitions into accounts
        const mergedAccounts = accounts.map((account, index) => {
          // Attempt to find matching variables block
          // Strategy 1: Find by account_id inside the variables definitions
          let matchingVars = variablesData.find((vItem) =>
            vItem.variables_definitions?.some(
              (def: VariableDefinition) => def.account_id === account.id
            )
          );

          // Strategy 2: If not found (or empty definitions), fallback to index mapping if lengths match
          // Note: Index mapping is risky if sorting differs, but frequent in some GQL-like setups.
          // Using strict ID match is safer. If no vars found, it remains undefined/empty.
          if (!matchingVars && variablesData.length === accounts.length) {
              matchingVars = variablesData[index];
          }

          return {
            ...account,
            variables_definitions: matchingVars?.variables_definitions || [],
          };
        });

        return mergedAccounts;
      }

      return rejectWithValue(
        parseErrorMessage(accountsRes.message || "Failed to fetch accounts")
      );
    } catch (error: any) {
      return rejectWithValue(parseErrorMessage(error));
    } finally {
      dispatch(hideLoader());
    }
  }
);

export const createAccount = createAsyncThunk(
  "accounts/create",
  async (newAccount: Account, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
       if (!apiClient) {
        return rejectWithValue("WebSocket not connected");
      }
      const response = await apiClient.send<string>("account/create", newAccount);
      if (response.status === "success") {
        return { ...newAccount, id: response.data as string };
      }
      return rejectWithValue(parseErrorMessage(response.message || "Failed to create account"));
    } catch (error: any) {
      return rejectWithValue(parseErrorMessage(error));
    } finally {
      dispatch(hideLoader());
    }
  }
);

export const updateAccount = createAsyncThunk(
  "accounts/update",
  async (updatedAccount: Account, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
       if (!apiClient) {
        return rejectWithValue("WebSocket not connected");
      }
      const response = await apiClient.send("account/update", updatedAccount);
      if (response.status === "success") {
        return updatedAccount;
      }
      return rejectWithValue(parseErrorMessage(response.message || "Failed to update account"));
    } catch (error: any) {
      return rejectWithValue(parseErrorMessage(error));
    } finally {
      dispatch(hideLoader());
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/delete",
  async (accountId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(showLoader());
       if (!apiClient) {
        return rejectWithValue("WebSocket not connected");
      }
      const response = await apiClient.send("account/delete", { id: accountId });
      if (response.status === "success") {
        return accountId;
      }
      return rejectWithValue(parseErrorMessage(response.message || "Failed to delete account"));
    } catch (error: any) {
      return rejectWithValue(parseErrorMessage(error));
    } finally {
      dispatch(hideLoader());
    }
  }
);

// --- Slice ---

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        const index = state.data.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) state.data[index] = action.payload;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.data = state.data.filter((a) => a.id !== action.payload);
      });
  },
});

export default accountsSlice.reducer;