import { Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Container } from '~/components/Container';
import { SignUpForm } from '../../types/auth.type';
import { StatusBar } from 'expo-status-bar';
import { images } from '~/constants/images';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import { Text, View } from 'react-native-ui-lib';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '~/constants/colors';

const SignUp = () => {
  const [form, setform] = useState<SignUpForm>({
    email: '',
    password: '',
  });
  return (
    <>
      <View flex className="relative">
        <Image
          className="absolute h-[600px] w-full"
          source={images.background.background1}
          resizeMode="cover"
          tintColor={colors.primary.DEFAULT}
        />

        {/* lights */}
        <View className="absolute w-full flex-row justify-around">
          <Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            className="h-[150px] w-[70px] "
            source={images.object.light}
            resizeMode="contain"
          />
          <Animated.Image
            entering={FadeInUp.delay(400).duration(1000).springify()}
            className="h-[120px] w-[50px] "
            source={images.object.light}
            resizeMode="contain"
          />
        </View>
        <StatusBar style="light" />
        <View>
          <View className=" h-full w-full justify-around pb-5 pt-36">
            {/* title */}
            <Animated.View
              entering={FadeInUp.duration(1000).springify()}
              className="flex items-center">
              <Text className="py-2 font-pbold text-5xl tracking-wider !text-white">Sign Up</Text>
            </Animated.View>

            {/* form */}
            <View className="mx-4 flex items-center gap-4 ">
              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                className=" w-full rounded-2xl bg-gray-200 p-5">
                <TextInput placeholder="Username" placeholderTextColor={'gray'} />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                className=" w-full rounded-2xl bg-gray-200 p-5">
                <TextInput
                  placeholder="Email"
                  textContentType="emailAddress"
                  placeholderTextColor={'gray'}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(400).duration(1000).springify()}
                className=" w-full rounded-2xl bg-gray-200 p-5">
                <TextInput placeholder="Password" placeholderTextColor={'gray'} secureTextEntry />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                className=" w-full rounded-2xl bg-gray-200 p-5">
                <TextInput
                  placeholder="Confirm password"
                  placeholderTextColor={'gray'}
                  secureTextEntry
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(800).duration(1000).springify()}
                className="mt-2 w-full">
                <TouchableOpacity
                  onPress={() => router.push('sign-in')}
                  className=" w-full rounded-2xl bg-primary p-4">
                  <Text className="!text-center font-pbold text-xl !text-white">SignUp</Text>
                </TouchableOpacity>
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(1000).duration(1000).springify()}
                className="mt-2 flex-row justify-center gap-1">
                <Text className="font-pregular">Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('sign-in')}>
                  <Text className="font-pregular !text-sky-600">Login.</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default SignUp;
