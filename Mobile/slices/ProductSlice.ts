// slices/ProductSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '~/store';
import { Product } from '~/types/product.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Jewelry } from '~/types/jewelry.type';

export interface ProductState {
  favorites: Jewelry[];
  details: Jewelry|null;
  carts: Jewelry[];
}


const initialState: ProductState = {
  favorites: [],
  details: null,
  carts:[]
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Jewelry>) => {
      const index = state.favorites.findIndex((i) => i.jewelryId === action.payload.jewelryId);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    setFavorites: (state, action: PayloadAction<Jewelry[]>) => {
      state.favorites = action.payload;
    },
    setDetails: (state, action: PayloadAction<Jewelry>) => {
      state.details = action.payload;
    },toggleCart: (state, action: PayloadAction<Jewelry>) => {
      const index = state.carts.findIndex((i) => i.jewelryId === action.payload.jewelryId);
      if (index === -1) {
        state.carts.push(action.payload);
      } else {
        state.carts.splice(index, 1);
      }
    },
    setCarts: (state, action: PayloadAction<Jewelry[]>) => {
      state.carts = action.payload;
    }
  },
});

export const { toggleFavorite, setFavorites, setDetails,setCarts,toggleCart } = productSlice.actions;

export default productSlice.reducer;

export const loadFavorites = () => async (dispatch: AppDispatch) => {
  try {
    const favoritesData = await AsyncStorage.getItem('favorites');
    const cartsData = await AsyncStorage.getItem('carts');
    if (favoritesData) {
      const favorites = JSON.parse(favoritesData);
      dispatch(setFavorites(favorites));
    }
    if (cartsData) {
      const carts = JSON.parse(cartsData);
      dispatch(setCarts(carts));
    }
  } catch (error) {
    console.error('Failed to load favorites from storage:', error);
  }
};

export const saveFavorites = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  try {
    const state = getState();
    await AsyncStorage.setItem('favorites', JSON.stringify(state.productSlice.favorites));
    await AsyncStorage.setItem('carts', JSON.stringify(state.productSlice.carts));
  } catch (error) {
    console.error('Failed to save favorites to storage:', error);
  }
};
