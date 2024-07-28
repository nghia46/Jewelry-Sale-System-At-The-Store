import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import colors from '~/constants/colors';
import { setDetails, toggleFavorite } from '~/slices/ProductSlice';
import { RootState } from '~/store';
import { Jewelry } from '~/types/jewelry.type';
import { toMoney } from '~/utils/formater';

const screenWidth = Dimensions.get('window').width;
const viewWidth = screenWidth * 0.4;

interface ItemProps {
  product: Jewelry;
}

const Item = ({ product }: ItemProps) => {
  const dispatch = useDispatch();
  const favotites = useSelector((state: RootState) => state.productSlice.favorites);
  const onItemClick = () => {
    dispatch(setDetails(product));
    router.push('itemDetails');
  };
  const isInList = favotites.findIndex((p) => p.jewelryId === product.jewelryId) != -1;
  return (
    <View style={styles.responsiveViewContainer}>
      <TouchableOpacity
        style={styles.responsiveView}
        onPress={() => onItemClick()}
        className="relative !rounded-lg !bg-gray-200">
        <Image source={{ uri: product.imageUrl }} style={styles.imageView} resizeMode="contain" />
        <TouchableOpacity
          onPress={() => {
            dispatch(toggleFavorite(product));
          }}
          className="absolute right-2 top-2 h-[30px] w-[30px] !rounded-full !bg-white"
          center>
          <MaterialIcons
            name={isInList ? 'favorite' : 'favorite-border'}
            size={18}
            color={isInList ? 'red' : colors.primary.DEFAULT}
          />
        </TouchableOpacity>
      </TouchableOpacity>
      <View className="mt-2 w-full">
        <Text className="line-clamp-1 font-pregular text-base">{product.name}</Text>
        <Text className="font-pmedium text-lg">{toMoney(product.totalPrice)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  responsiveViewContainer: {
    width: viewWidth,
    marginHorizontal: 10,
    marginBottom: 20,
  },

  responsiveView: {
    width: viewWidth,
    height: viewWidth,
  },
  imageView: {
    width: viewWidth - 20,
    height: viewWidth - 10,
    margin: 'auto',
    borderRadius: 12,
  },
});

export default Item;
