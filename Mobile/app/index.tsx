import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, Text, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';

import colors from '~/constants/colors';
import { images } from '~/constants/images';
import { loadFavorites, saveFavorites } from '~/slices/ProductSlice';
import { AppDispatch } from '~/store';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Tải dữ liệu yêu thích khi ứng dụng khởi động
    dispatch(loadFavorites());

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'background') {
        // Lưu dữ liệu yêu thích khi ứng dụng chuyển sang nền
        dispatch(saveFavorites());
      }
    };

    // Đăng ký lắng nghe sự kiện thay đổi trạng thái ứng dụng
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Hủy đăng ký sự kiện khi component bị unmount
    return () => {
      subscription.remove();
    };
  }, [dispatch]);
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#fff" />
        <View flex className="!bg-white">
          <View flex center className="">
            <Image source={images.background.girl} className="h-full" resizeMode="contain" />
          </View>
          <View className="px-10 py-6">
            <Text className="py-1 font-psemibold text-4xl !tracking-widest !text-primary">
              Let your
            </Text>
            <Text className="py-1 font-psemibold text-4xl !tracking-widest !text-primary">
              Style Speak
            </Text>
            <Text className="mt-4 font-plight text-base tracking-widest">
              Discover the lastest trends in women
            </Text>
            <Text className="mt-1 font-plight text-base tracking-widest">
              fashion and explore your personality
            </Text>
            <Button
              onPress={() => router.push('sign-in')}
              backgroundColor={colors.primary.DEFAULT}
              className="mb-4 mt-6 gap-2 self-end ">
              <Text className="py-2 font-pbold text-base !text-white">Get Started</Text>
              <AntDesign name="arrowright" size={24} color="white" />
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
