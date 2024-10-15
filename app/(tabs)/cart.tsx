import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

// Tạo kiểu dữ liệu cho Product trong giỏ hàng
type CartProduct = {
  id: string;
  name: string;
  price: number;  // Giá trị sẽ là kiểu số để dễ tính toán
  image: string;
  quantity: number;
};

// Dữ liệu mẫu cho sản phẩm trong giỏ hàng
const CART_PRODUCTS: CartProduct[] = [
  { id: '1', name: 'Iphone 15 Plus', price: 18000000, image: require('./img/15pl.jpg'), quantity: 1 },
  { id: '2', name: 'Iphone 15 Pro Max', price: 25000000, image: require('./img/15pm.jpg'), quantity: 2 },
  { id: '3', name: 'Iphone 16', price: 20000000, image: require('./img/16n.jpg'), quantity: 1 },
];

// Component Header
const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>DiNiStore</Text>
  </View>
);

// Component ProductItem trong giỏ hàng
const CartItem = ({ item, onIncrease, onDecrease, onRemove }: { item: CartProduct, onIncrease: () => void, onDecrease: () => void, onRemove: () => void }) => (
  <View style={styles.cartItem}>
    <Image source={item.image} style={styles.cartImage} />
    <View style={styles.cartDetails}>
      <Text style={styles.cartName}>{item.name}</Text>
      <Text style={styles.cartPrice}>{item.price.toLocaleString('vi-VN')} VND</Text>

      {/* Số lượng sản phẩm */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={onDecrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
      <Text style={styles.removeButtonText}>Xóa</Text>
    </TouchableOpacity>
  </View>
);

// Component Footer hiển thị tổng tiền
const Footer = ({ total }: { total: number }) => (
  <View style={styles.footer}>
    <Text style={styles.totalText}>Tổng Tiền: {total.toLocaleString('vi-VN')} VND</Text>
    <TouchableOpacity style={styles.checkoutButton}>
      <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
    </TouchableOpacity>
  </View>
);

// App chính
const App = () => {
  const [cart, setCart] = useState<CartProduct[]>(CART_PRODUCTS);

  // Tính tổng tiền
  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Tăng số lượng sản phẩm
  const increaseQuantity = (id: string) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  // Giảm số lượng sản phẩm
  const decreaseQuantity = (id: string) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeProduct = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Header />
      <View style={styles.cart}>
        <Text style={styles.cartText}>Giỏ Hàng Của Bạn</Text>
      </View>
      {/* Danh sách sản phẩm trong giỏ hàng */}
      <FlatList
        data={cart}
        renderItem={({ item }: { item: CartProduct }) => (
          <CartItem
            item={item}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
            onRemove={() => removeProduct(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.cartList}
      />

      {/* Footer */}
      <Footer total={total} />
    </ScrollView>
  );
};

// Style cho giao diện
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#6200EE',
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  cart: {
    padding: 16,
    alignItems: 'center',
  },
  cartText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  cartList: {
    paddingHorizontal: 10,
  },
  cartItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cartDetails: {
    flex: 1,
  },
  cartName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartPrice: {
    fontSize: 14,
    color: 'green',
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 5,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
