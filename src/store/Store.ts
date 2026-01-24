import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
// import chartReducer from "./slices/chartSlice";
import categoriesReducer from "./slices/categoriesSlice";
import webSocketReducer from "./slices/webSocketSlice"
import loadingReducer from "./slices/loadingSlice";
import instrumentsReducer from "./slices/instrumentsSlice";
// import themeReducer, { toggleTheme } from "./slices/themeSlice";
// import favouritesReducer from "./slices/favouritesSlice";
// import  aiChartSlicereducer from "./slices/aiChatSlice"
import positionReducer from "./slices/positionsSlice"
import dealsReducer from "./slices/dealsSlice"
import quotesReducer from "./slices/quotesSlice";
import historyOrdersReducer from "./slices/historyOrdersSlice";
import historyPositionsReducer from "./slices/historyPositionsSlice";
import notificationReducer from "./slices/notificationSlice";
// import accountsReducer from "./slices/accountSlice";
import openOrdersReducer from "./slices/openOrdersSlice";
// import authReducer from "./slices/authSlice";
import ordersReducer from "./slices/ordersSlice"



const rootReducer = {
  websockets: webSocketReducer,
//   chart: chartReducer,
  categories: categoriesReducer,
  loading: loadingReducer,
  instruments: instrumentsReducer,
//   favourites: favouritesReducer, 
//   theme: themeReducer,
//   aiChat : aiChartSlicereducer,
  positions: positionReducer,
  deals: dealsReducer,
  quotes: quotesReducer,
  historyOrders: historyOrdersReducer,
  historyPositions: historyPositionsReducer,
  notification: notificationReducer,
//   accounts: accountsReducer,
  openOrders: openOrdersReducer,
  orders : ordersReducer,
//   auth: authReducer,
};

// Derive RootState from reducers
export type RootState = {
  [K in keyof typeof rootReducer]: ReturnType<(typeof rootReducer)[K]>;
};

// Listener middleware with correct typing
const listenerMiddleware = createListenerMiddleware<RootState>();

// listenerMiddleware.startListening({
//   actionCreator: toggleTheme,
//   effect: (_action, listenerApi) => {
//     const state = listenerApi.getState();
//     const mode = state.theme?.mode;

//     if (typeof mode === "string") {
//       try {
//         localStorage.setItem("theme", mode);
//       } catch {
//         /* ignore */
//       }
//     }
//   },
// });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

// Export typed helpers
export type AppDispatch = typeof store.dispatch;