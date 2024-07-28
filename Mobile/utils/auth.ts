import { SignInRespone } from '~/types/auth.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS } from '~/enums';
import { router } from 'expo-router';

export const saveToken = (data: SignInRespone) => {
  AsyncStorage.setItem(KEYS.ACCESS_TOKEN, data.token);
  AsyncStorage.setItem(KEYS.EXPIRED_TOKEN, data.expiration);
};

export const loadToken = async () => {
  const token = await AsyncStorage.getItem(KEYS.ACCESS_TOKEN);
  const expiration = await AsyncStorage.getItem(KEYS.EXPIRED_TOKEN);
  if (token && expiration) {
    const loaded: SignInRespone = {
      expiration,
      token,
    };
    return loaded;
  }
  return null;
};

export const clearToken = () => {
  AsyncStorage.clear();
};

export const logout = ()=>{
  clearToken();
  router.dismissAll();
}
