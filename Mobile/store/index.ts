// store.ts
import { configureStore } from '@reduxjs/toolkit';
import authApi from '~/services/authApi';
import jewelryApi from '~/services/jewelryApi';
import authSlice from '~/slices/authSlice';
import ProductSlice from '~/slices/ProductSlice';

export const store = configureStore({
  reducer: { productSlice: ProductSlice ,
    athSlice: authSlice ,
     [jewelryApi.reducerPath]: jewelryApi.reducer,
     [authApi.reducerPath]: authApi.reducer,},
     middleware:(getDefaultMiddleWare) => getDefaultMiddleWare()
     .concat(jewelryApi.middleware).concat(authApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
