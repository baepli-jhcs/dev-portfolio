import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { validateApi } from "./apis/validate";
import contactSlice from "./slices/contactSlice";
import initialLoadSlice from "./slices/initialLoadSlice";
import loadSlice from "./slices/loadSlice";
import authSlice from "./slices/authSlice";
import { getProjectApi } from "./apis/get-project";
import { fetchQuoteApi } from "./apis/fetch-quote";
import { calculatorSlice } from "./slices/mathSlice";
import { calculatorOperationSlice } from "./slices/mathOperationSlice";
import breakSlice from "./slices/breakSlice";
import clockSlice from "./slices/clockSlice";
import { convertUnitApi } from "./apis/convert-unit";
import { sudokuApi } from "./apis/solve-sudoku";
import { translateAmericanBritishApi } from "./apis/translate-american-british";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  load: loadSlice.reducer,
  initialLoad: initialLoadSlice.reducer,
  auth: authSlice.reducer,
  contact: contactSlice.reducer,
  calculator: calculatorSlice.reducer,
  calculatorOperation: calculatorOperationSlice.reducer,
  clock: clockSlice.reducer,
  break: breakSlice.reducer,
  [convertUnitApi.reducerPath]: convertUnitApi.reducer,
  [fetchQuoteApi.reducerPath]: fetchQuoteApi.reducer,
  [getProjectApi.reducerPath]: getProjectApi.reducer,
  [sudokuApi.reducerPath]: sudokuApi.reducer,
  [translateAmericanBritishApi.reducerPath]:
    translateAmericanBritishApi.reducer,
  [validateApi.reducerPath]: validateApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      fetchQuoteApi.middleware,
      getProjectApi.middleware,
      convertUnitApi.middleware,
      sudokuApi.middleware,
      translateAmericanBritishApi.middleware,
      validateApi.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
