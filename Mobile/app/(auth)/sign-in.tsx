import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { images } from '~/constants/images';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import authApi from '~/services/authApi';
import { useDispatch } from 'react-redux';
import { setSignInResponse } from '~/slices/authSlice';
import { SignInRequest } from '~/types/auth.type';
import LoadingModel from '~/components/LoadingModel';
const SignIn = () => {
  const dispatch = useDispatch();
  const [form, setform] = useState<SignInRequest>({
    phone: '',
    password: '',
  });
  //----------------------------- call api sign in ------------------------------\\
  const [SignIn, { isLoading, isSuccess, data, isError, error }] = authApi.useSignInMutation();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setSignInResponse(data));
      router.push('home');
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError]);

  const handleSignIn = () => {
    SignIn(form);
  };

  return (
    <>
      <LoadingModel isloading={isLoading} />
      <Image
        className="absolute h-full w-full"
        source={images.background.background1}
        tintColor={'#333'}
        resizeMode="cover"
      />

      {/* lights */}
      <View className="absolute w-full flex-row justify-around">
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          className="h-[200px] w-[85px] "
          source={images.object.light}
          resizeMode="contain"
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          className="h-[140px] w-[60px] "
          source={images.object.light}
          resizeMode="contain"
        />
      </View>
      <StatusBar style="light" />
      <View className="h-full w-full justify-around pb-7 pt-40">
        {/* title */}
        <View className="flex items-center">
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            className="py-2 font-pbold text-5xl tracking-wider text-white">
            Đăng Nhập
          </Animated.Text>
        </View>

        {/* form */}
        <View className="mx-4 flex items-center gap-4 space-y-5">
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            className=" w-full rounded-2xl bg-gray-200 p-5">
            <TextInput
              onChangeText={(e) => setform({ ...form, phone: e })}
              value={form.phone}
              placeholder="Số điện thoại"
              placeholderTextColor={'gray'}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            className=" w-full rounded-2xl bg-gray-200 p-5">
            <TextInput
              onChangeText={(e) => setform({ ...form, password: e })}
              value={form.password}
              placeholder="Mật khẩu"
              placeholderTextColor={'gray'}
              secureTextEntry
            />
          </Animated.View>
          {isError && (
            <Text className="font-pregular text-red-400">
              Tên đăng nhập hoặc mật khẩu không đúng
            </Text>
          )}
          <Animated.View
            entering={FadeInDown.delay(400).duration(1000).springify()}
            className="mt-2 w-full">
            <TouchableOpacity
              onPress={() => handleSignIn()}
              className=" w-full rounded-2xl bg-primary p-4">
              <Text className="text-center font-pbold text-xl text-white">Đăng Nhập</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            className="mt-2 flex-row justify-center gap-1">
            <Text className="font-pregular">Không có tài khoản? </Text>
            <TouchableOpacity onPress={() => router.push('sign-up')}>
              <Text className="font-pregular text-sky-600">Đăng Ký.</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </>
  );
};

export default SignIn;
