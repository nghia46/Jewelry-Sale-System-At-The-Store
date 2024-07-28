import { FlatList, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, TouchableOpacity, View } from 'react-native-ui-lib';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import Item from '~/components/Item';
import { images } from '~/constants/images';
import colors from '~/constants/colors';

const cart = () => {
  const items = useSelector((state: RootState) => state.productSlice.carts);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View flex className="!bg-white">
        <View className="w-full p-4" row>
          <View>
            <Text className="font-plight text-xl">Favorite</Text>
            <Text className="font-pmedium text-2xl"> Jewelry</Text>
          </View>
          <View flex row className="justify-end">
            <TouchableOpacity
              center
              className="h-[45px] w-[45px] self-center !rounded-full bg-primary">
              <MaterialCommunityIcons name="sort-ascending" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={items}
          renderItem={({ item }) => <Item product={item} />}
          numColumns={2}
          //keyExtractor={(i) => i.toString()}
          className="mx-5 mt-5"
          onEndReachedThreshold={0.5}
          ListEmptyComponent={() => (
            <View center className="mt-[150px]">
              <Image
                source={images.icons.empty}
                className="h-[100px] w-[100px]"
                resizeMode="contain"
                tintColor={colors.gray.C5}
              />
              <Text className="font-plight text-base !text-gray-C5">Empty</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default cart;
