import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ProductCard from './ProductCard';

interface item {
  name: string;
  price: string;
}

export interface ProductRowProps {
  title: string;
  desc: string;
  items: item[];
}

const ProductRow = ({ items, title, desc }: ProductRowProps) => {
  return (
    <View>
      <View className="flex-row items-center justify-between px-4">
        <View>
          <Text className="font-pbold text-lg">{title}</Text>
          <Text className="text-xs text-gray-500">{desc}</Text>
        </View>
        <TouchableOpacity>
          <Text className="font-psemibold text-primary">See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="overflow-visible py-5">
        {items.map((item, index) => (
          <ProductCard key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductRow;
