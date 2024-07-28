import { FlatList, Image, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';
import Item from '~/components/Item';
import { images } from '~/constants/images';
import colors from '~/constants/colors';
enum OrderType {
  HIGH_TO_LOW,
  LOW_TO_HIGH,
}
const options = [
  { label: 'Sort by highest price', value: OrderType.HIGH_TO_LOW },
  { label: 'Sort by lowest price', value: OrderType.LOW_TO_HIGH },
];
const category = () => {
  const [selectOrder, setselectOrder] = useState(OrderType.HIGH_TO_LOW);
  const pickerRef = useRef();
  const items = useSelector((state: RootState) => state.productSlice.favorites);
  console.log(items);
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

export default category;
