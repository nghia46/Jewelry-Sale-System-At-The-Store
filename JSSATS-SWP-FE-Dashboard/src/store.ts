import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import authSlice from './slices/authSlice';
import accountApi from './services/accountApi';
import jewelryApi from './services/jewelryApi';
import jewelrySlice from './slices/jewelrySlice';
import promotionApi from './services/promotionApi';
import billApi from './services/billsApi';
import customerSlice from './slices/customerSlice';
import customerApi from './services/customerApi';
import goldPriceApi from './services/goldPriceApi';
import goldPriceSlice from './slices/goldPriceSlice';
import billSlice from './slices/billSlice';

export const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    whitelist: ['auth', 'jewelry'],
};

const rootReducer = combineReducers({
    auth: authSlice,
    jewelry: jewelrySlice,
    customer: customerSlice,
    goldPrice: goldPriceSlice,
    bill: billSlice,
    [accountApi.reducerPath]: accountApi.reducer,
    [jewelryApi.reducerPath]: jewelryApi.reducer,
    [promotionApi.reducerPath]: promotionApi.reducer,
    [billApi.reducerPath]: billApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [goldPriceApi.reducerPath]: goldPriceApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) =>
        defaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
            .concat(accountApi.middleware)
            .concat(jewelryApi.middleware)
            .concat(promotionApi.middleware)
            .concat(billApi.middleware)
            .concat(customerApi.middleware)
            .concat(goldPriceApi.middleware),
});

// get roostate and appdispatch from store handle for typescript
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
//
//setupListeners(store.dispatch);
