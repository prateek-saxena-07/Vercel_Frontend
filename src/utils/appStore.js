import { configureStore, combineReducers } from "@reduxjs/toolkit";
import homeVideosGridReducer from "./homeVideosSlice.js";
import userReducer from "./userSlice.js";
import commentReducer from './commentsSlice.js';
import videoReducer from './videoPlayerSlice.js'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Use sessionStorage

// Persist config for sessionStorage
const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession, // Use session storage instead of local storage
};

const rootReducer = combineReducers({
  user: userReducer,
  homeVideosGrid: homeVideosGridReducer,
  comments: commentReducer,
  video:videoReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(appStore);

export default appStore;
