import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};
  
type RootStackParamList = {
  cartscreen: { cartItems: Product[] };
};

type CartScreenRouteProp = RouteProp<RootStackParamList, 'cartscreen'>;

type Props = {
  route: CartScreenRouteProp;
};

const ProductItem: React.FC<{ item: Product }> = React.memo(({ item }) => {
  return (
    <View style={styles.productContainer}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.productImage} 
        onError={() => {
          console.error('Undefined IMG:', item.image);
        }}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>{item.price.toFixed(2)} USD</Text>
      </View>
    </View>
  );
});

const CartScreen: React.FC<Props> = ({ route }) => {
  const { cartItems = [] } = route.params || {};

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your Cart Is Empty.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem item={item} />}
        />
      )}
      <Text style={styles.total}>All Price: {getTotalPrice()} USD</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
    color: 'gray',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  emptyCart: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CartScreen;
