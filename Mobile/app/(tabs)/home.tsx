import { FlatList, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Categories from '~/components/Categories';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-ui-lib';
import Item from '~/components/Item';
import { images } from '~/constants/images';
import colors from '~/constants/colors';
import { Jewelry } from '~/types/jewelry.type';
import jewelryApi from '~/services/jewelryApi';
import { PaggingRespone } from '~/types/base.type';
import authApi from '~/services/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { setUserInfo } from '~/slices/authSlice';
import LoadingModel from '~/components/LoadingModel';

const home = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.athSlice.token?.nameid);
  const userName = useSelector((state: RootState) => state.athSlice.userInfo?.fullName);
  //-----------------------handle call get user ---------------------------//
  const {
    isSuccess: isGetUserSuccess,
    isError: isGetUserError,
    data: userData,
    isLoading,
  } = authApi.useGetUserByIdQuery(userId ?? '');

  useEffect(() => {
    if (isGetUserSuccess && userData) {
      dispatch(setUserInfo(userData));
    }
  }, [isGetUserSuccess]);

  //-----------------------end handle call get user ---------------------------//
  const [itemList, setitemList] = useState<PaggingRespone<Jewelry>>({
    data: [],
    pageNumber: 1,
    pageSize: 50,
    totalPage: 0,
    totalRecord: 0,
  });
  const [selectedType, setselectedType] = useState('');
  //-----------------------handle call get Jewelries ---------------------------//
  const { data, isSuccess, isFetching, isError, error, refetch } = jewelryApi.useGetJewelriesQuery({
    pageNumber: itemList.pageNumber,
    pageSize: itemList.pageSize,
    data: { jewelryTypeId: selectedType, name: '' },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setitemList(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log('error load jewelries', error);
    }
  }, [isError]);

  //----------------------- end handle call get Jewelries ---------------------------//

  // const loadMoreItems = () => {
  //   if (itemList.pageNumber < itemList.totalPage) {
  //     setitemList({ ...itemList, pageNumber: itemList.pageNumber + 1 });
  //     refetch();
  //   }
  // };

  return (
    <SafeAreaView>
      <LoadingModel isloading={isFetching || isLoading} />
      <View className="h-full w-full !bg-white">
        <StatusBar style="dark" backgroundColor="#fff" />
        <View className="px-6 pb-2 pt-4">
          <Text className="font-plight text-base">Hello,</Text>
          <Text className="font-pmedium text-lg">{userName}</Text>
        </View>
        {/* search bar */}
        <View className="flex-row items-center gap-2 px-4 pb-2">
          <View className="flex-1 flex-row items-center rounded-full border border-gray-300 p-3">
            <AntDesign name="search1" size={24} color="gray" />
            <TextInput placeholder="Jewelrys" className="ml-2 flex-1" />
          </View>
          <TouchableOpacity className="rounded-full bg-primary p-3">
            <Feather name="sliders" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* main */}
        <View>
          <Categories
            onChangeSelected={(c) => {
              setselectedType(c ? c.jewelryTypeId : '');
            }}
          />
        </View>
        {/* item list */}
        {data && (
          <FlatList
            data={data?.data}
            renderItem={({ item }) => <Item product={item} />}
            numColumns={2}
            //keyExtractor={(i) => i.toString()}
            className="mx-5 mt-5"
            onEndReachedThreshold={0.5}
            // onEndReached={loadMoreItems}
            ListEmptyComponent={() => (
              <View centerH className="w-fit !bg-white">
                <Image
                  source={images.icons.empty}
                  className="h-[100px] w-[100px]"
                  resizeMode="contain"
                  tintColor={colors.gray.C5}
                />
                <Text className="font-plight text-base">Empty</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default home;
