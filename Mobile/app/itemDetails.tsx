import { Image, Dimensions } from 'react-native';
import React, { useRef, useState } from 'react';
import { images } from '~/constants/images';
import colors from '~/constants/colors';
import { StatusBar } from 'expo-status-bar';
import { Button, Card, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { router } from 'expo-router';
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import Carousel from 'react-native-reanimated-carousel';
import { toggleCart, toggleFavorite } from '~/slices/ProductSlice';
import BarcodeModel from '~/components/BarcodeModel';
import { toMoney } from '~/utils/formater';

const { width: viewportWidth, height } = Dimensions.get('window');
const itemDetails = () => {
  const dispatch = useDispatch();
  const favotites = useSelector((state: RootState) => state.productSlice.favorites);
  const carts = useSelector((state: RootState) => state.productSlice.carts);
  const item = useSelector((state: RootState) => state.productSlice.details);
  const isInList = favotites.findIndex((p) => p.jewelryId === item?.jewelryId) != -1;
  const isInCart = carts.findIndex((p) => p.jewelryId === item?.jewelryId) != -1;
  const [showQr, setshowQr] = useState(false);
  console.log(item);
  return (
    <View>
      {item && (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <StatusBar style="light" backgroundColor="#333" />
          <Image
            source={images.background.bgshape3}
            tintColor={colors.primary.DEFAULT}
            className="absolute left-0 top-0 h-[150px] w-full"
            resizeMode="stretch"
          />
          <View row centerV className="relative w-full justify-between p-6 ">
            <TouchableOpacity
              onPress={() => router.back()}
              className="h-[48px] w-[48px] items-center justify-center rounded-xl bg-white/10">
              <AntDesign name="left" size={30} color="#fff" />
            </TouchableOpacity>
            <Text className="absolute ml-6 w-full font-pregular text-xl !text-white" center>
              Chi tiết sản phẩm
            </Text>
            <TouchableOpacity
              onPress={() => {
                setshowQr(true);
              }}
              className="h-[48px] w-[48px] items-center justify-center rounded-xl !bg-white/10">
              <AntDesign name="qrcode" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <View flex className="mt-6">
            <Carousel
              vertical={false}
              width={viewportWidth}
              height={viewportWidth}
              loop
              pagingEnabled={true}
              snapEnabled={true}
              autoPlay={true}
              autoPlayInterval={1500}
              mode="parallax"
              modeConfig={{
                parallaxScrollingScale: 0.8,
                parallaxScrollingOffset: 170,
              }}
              style={{ marginTop: 50 }}
              data={[item.imageUrl]}
              renderItem={({ item, index }) => (
                <Card
                  enableShadow
                  elevation={5}
                  style={{ width: viewportWidth * 0.7 }}
                  center
                  key={index}
                  className="!rounded-md !bg-gray-200">
                  <Image
                    source={{ uri: item }}
                    style={{ width: viewportWidth * 0.6, height: viewportWidth * 0.6 }}
                    resizeMode="contain"
                  />
                </Card>
              )}
            />
          </View>
          <View style={{ marginTop: height * 0.5 }} className="h-[300px] !bg-[#555] p-6">
            <Text className="font-psemibold text-2xl !text-secondary">{item.name}</Text>
            <View className="relative mt-4 justify-start gap-1 pb-4">
              <View
                center
                className="absolute right-0 top-1/2 h-[90px] w-[90px] -translate-y-1/2 rounded-full !bg-secondary">
                <Text className="my-1  font-psemibold text-xl !text-[#555]">
                  {toMoney(item.totalPrice)}
                </Text>
              </View>
              <View row centerV>
                <Text className="font-pmedium text-base !text-secondary">Mã sản phẩm:</Text>
                <Text className="ml-1 font-plight text-base !text-white"> {item.jewelryId}</Text>
              </View>
              <View row centerV>
                <Text className="font-pmedium text-base !text-secondary">Loại:</Text>
                <Text className="ml-1 font-plight text-base !text-white">{item.type}</Text>
              </View>
              <View row centerV>
                <Text className="self-start font-pmedium text-base !text-secondary">
                  Chất liệu:
                </Text>
                <Text className="ml-1 max-w-[190px] font-plight text-base !text-white">
                  Vàng {item.materials[0].gold.goldType}, Đá {item.materials[0].gem.gem}{' '}
                </Text>
              </View>
            </View>
            <View row centerV className="mt-5 items-center justify-between gap-6 ">
              <Button
                flex
                className="!rounded-md !bg-red-400"
                onPress={() => dispatch(toggleCart(item))}>
                <Ionicons name="bag-add" size={24} color="white" />
                <Text className="ml-6 py-1 font-pmedium text-lg uppercase !text-white">
                  {isInCart ? 'Xóa khỏi giỏ hàng' : 'Thêm vào giỏ hàng'}
                </Text>
              </Button>
              <TouchableOpacity
                onPress={() => dispatch(toggleFavorite(item))}
                className="!rounded-md !bg-white p-4"
                center>
                <View>
                  <MaterialIcons
                    name={isInList ? 'favorite' : 'favorite-border'}
                    size={24}
                    color={isInList ? 'red' : colors.primary.DEFAULT}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <BarcodeModel visble={showQr} bgDismissable setVisible={setshowQr} code={item.barcode} />
        </SafeAreaView>
      )}
    </View>
  );
};

export default itemDetails;
