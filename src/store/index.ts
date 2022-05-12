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
import projectsSlice from "./slices/projectsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const reducers = combineReducers({
  load: loadSlice.reducer,
  initialLoad: initialLoadSlice.reducer,
  auth: authSlice.reducer,
  projects: projectsSlice.reducer,
  contact: contactSlice.reducer,
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
    }).concat(validateApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
