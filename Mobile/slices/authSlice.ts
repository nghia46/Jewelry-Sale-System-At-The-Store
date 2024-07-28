// slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '~/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Jewelry } from '~/types/jewelry.type';
import { GetUserResponse, JWTDecode, SignInRespone } from '~/types/auth.type';
import { jwtDecode } from 'jwt-decode';
import { saveToken } from '~/utils/auth';

export interface AuthState {
    token:JWTDecode|undefined
    userInfo: GetUserResponse | undefined
}


const initialState: AuthState = {
    token:undefined,
    userInfo:undefined
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setSignInResponse: (state, action: PayloadAction<SignInRespone>) => {
      saveToken(action.payload);
      state.token = jwtDecode<JWTDecode>(action.payload.token);
    },
    setUserInfo:  (state, action: PayloadAction<GetUserResponse>) => {
        state.userInfo = action.payload
      },
   
  },
});

export const { setSignInResponse,setUserInfo } = authSlice.actions;

export default authSlice.reducer;


