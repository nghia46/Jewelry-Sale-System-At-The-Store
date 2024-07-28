import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import jewelryApi from '~/services/jewelryApi';
import { JewelryType } from '~/types/user.type';

export interface CategoriesProps {
  onChangeSelected: (category: JewelryType | null) => void;
}

const Categories = ({ onChangeSelected }: CategoriesProps) => {
  //-----------------------handle call get Jewelries ---------------------------//
  const {
    data,
    isSuccess: isGetTypeSuccess,
    isError,
    error,
  } = jewelryApi.useGetJewelryTypesQuery();

  useEffect(() => {
    if (isGetTypeSuccess && data) {
    }
  }, [isGetTypeSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.log('error load type', error);
    }
  }, [isError]);

  //----------------------- end handle call get Jewelries ---------------------------//

  const [categoryActive, setCategoryActive] = useState<JewelryType | null>(null);
  useEffect(() => {
    onChangeSelected(categoryActive);
  }, [categoryActive]);
  return (
    <View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        className="overflow-visible py-4"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}>
        <View className={`mr-6 flex items-center justify-center shadow-md `}>
          <TouchableOpacity
            onPress={() => setCategoryActive(null)}
            className={` rounded-md px-4 py-3 ${categoryActive == null ? 'bg-primary' : 'bg-gray-200'}`}>
            <Text
              className={`font-psemibold  ${categoryActive == null ? 'text-white' : 'text-black-200'}`}>
              Tất cả
            </Text>
          </TouchableOpacity>
        </View>
        {data &&
          data.map((item, index) => {
            let isActive = item.jewelryTypeId === categoryActive?.jewelryTypeId;
            return (
              <View key={index} className={`mr-6 flex items-center justify-center shadow-md `}>
                <TouchableOpacity
                  onPress={() => setCategoryActive(item)}
                  className={` rounded-md px-4 py-3 ${isActive ? 'bg-primary' : 'bg-gray-200'}`}>
                  <Text className={`font-psemibold  ${isActive ? 'text-white' : 'text-black-200'}`}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Categories;
