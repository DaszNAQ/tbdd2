import { Tabs } from 'expo-router';
import React from 'react';
import 'react-native-gesture-handler';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import App from '@/app/(tabs)/index'; // Màn hình chính (Home)
import ProductDetail from '@/app/(tabs)/detail'; // Màn hình chi tiết sản phẩm
const Stack = createStackNavigator();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={App} options={{ title: 'DiNiStore' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Chi Tiết Sản Phẩm' }} />
    </Stack.Navigator>
  </NavigationContainer>
);
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="fav"
        options={{
          title: 'Favorite',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'heart' : 'heart-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
