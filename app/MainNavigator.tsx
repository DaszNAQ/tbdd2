import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './(tabs)/index'; // Màn hình chính (nơi hiển thị danh sách sản phẩm)
import CartScreen from '@/app/(tabs)'; 
import ProductDetail from '@/app/ProductDetail'; 

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ title: 'DiNiStore' }} />
        <Stack.Screen name="cartscreen" component={CartScreen} options={{ title: 'Cart' }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'ProductDetail' }} />
      </Stack.Navigator>
      <Stack.Navigator initialRouteName="app">
      <Stack.Screen name="app" component={App} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="cartscreen" component={CartScreen} /> {/* Assuming you have a CartScreen component */}
    </Stack.Navigator>
    </NavigationContainer> 
     
  );
};

export default App;
