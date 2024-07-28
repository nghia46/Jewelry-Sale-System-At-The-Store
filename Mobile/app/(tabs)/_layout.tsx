import { Tabs } from 'expo-router';
import { ImageSourcePropType, Platform, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { Badge } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { RootState } from '~/store';

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabsLayout = () => {
  const favorites = useSelector((state: RootState) => state.productSlice.favorites);
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary.DEFAULT,
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Regular',
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: colors.gray.C5,
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarLabel: 'Favorites',
            tabBarIcon: ({ color, size }) => (
              <View className="relative">
                <MaterialIcons name="favorite-border" size={size} color={color} />
                <Badge
                  className="absolute left-5"
                  label={favorites.length > 0 ? favorites.length.toString() : '0'}
                  backgroundColor="red"
                  size={16}
                />
              </View>
            ),
            headerShown: false,
          }}
        />
        {/* <Tabs.Screen
          name="selectService"
          options={{
            tabBarLabel: 'Dịch vụ',
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  top: Platform.OS === 'ios' ? -10 : -20,
                  width: Platform.OS === 'ios' ? 50 : 60,
                  height: Platform.OS === 'ios' ? 50 : 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: focused ? color : colors.secondary.DEFAULT,
                }}
                className={`rounded-full border-[4px] border-white bg-white shadow-lg`}>
                <MaterialIcons name="elderly" size={24} color="#fff" />
              </View>
            ),
            headerShown: false,
          }}
        /> */}

        <Tabs.Screen
          name="cart"
          options={{
            tabBarLabel: 'Cart',
            tabBarIcon: ({ color, size }) => (
              <View className="relative">
                <AntDesign name="shoppingcart" size={size} color={color} />
                <Badge className="absolute left-5" label={'0'} backgroundColor="red" size={16} />
              </View>
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="notification" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />,
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
