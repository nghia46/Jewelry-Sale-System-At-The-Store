import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
const { width: viewportWidth } = Dimensions.get('window');
const PAGE_WIDTH = viewportWidth;

const colors = ['#26292E', '#899F9C', '#B3C680', '#5C6265', '#F5D399', '#F1F1F1'];
const Test = () => {
  const [isVertical, setIsVertical] = React.useState(false);
  const baseOptions = isVertical
    ? ({
        vertical: true,
        width: PAGE_WIDTH * 0.86,
        height: PAGE_WIDTH * 0.6,
      } as const)
    : ({
        vertical: false,
        width: PAGE_WIDTH,
        height: PAGE_WIDTH * 0.6,
      } as const);

  const progress = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };
  return (
    <View>
      <Carousel
        ref={ref}
        {...baseOptions}
        style={{
          width: PAGE_WIDTH,
        }}
        loop
        pagingEnabled={true}
        snapEnabled={true}
        autoPlay={true}
        autoPlayInterval={1500}
        //onProgressChange={}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        data={colors}
        renderItem={({ item, index }) => <View key={index} className={'bg-' + item}></View>}
      />
    </View>
  );
};

export default Test;
