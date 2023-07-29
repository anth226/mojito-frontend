import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from 'reduxSlices/auth/auth';
import onboardingReducer from 'reduxSlices/onboarding/onboarding';
import alertReducer from 'reduxSlices/alerts/alerts';
import clientReducer from 'reduxSlices/clients/clients';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage: storage,
};

const onBoardingPersistConfig = {
  key: 'onBoarding',
  storage: storage,
};

const clientToConnectPersistConfig = {
  key: 'clienToConnect',
  storage: storage,
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);
const persistedOnBoardingReducer = persistReducer(
  onBoardingPersistConfig,
  onboardingReducer
);

const persistClientToConnectReducer = persistReducer(
  clientToConnectPersistConfig,
  clientReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    onboarding: persistedOnBoardingReducer,
    alert: alertReducer,
    client: persistClientToConnectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistorStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
