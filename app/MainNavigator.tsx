import React from 'react';
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

export default MainNavigator;
