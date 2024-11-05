import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, ActivityIndicator, Alert, TextInput } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';

type RootStackParamList = {
  app: undefined;
  cartscreen: { cartItems: Product[] };
  ProductDetail: { productId: number };
};

type ProductDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;
type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'cartscreen'>;

type Category = {
  id: string;
  name: string;
};

type Product = {
  category: string;
  id: number;
  title: string;
  price: string;
  image: string;
};

const BANNERS = [
  require('./img/banner.png'),
  require('./img/banner1.png'),
];

const Header = ({ cartItemCount, cartItems }: { cartItemCount: number; cartItems: Product[] }) => {
  const navigation = useNavigation<CartScreenNavigationProp>();

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>DiNiStore</Text>
      <TouchableOpacity onPress={() => navigation.navigate('cartscreen', { cartItems })}>
        <View style={styles.cartIconContainer}>
          <Icon name="cart" size={24} color="#FFF" />
          {cartItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      setCurrentBanner((prevBanner) => (prevBanner + 1) % BANNERS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  return (
    <View style={styles.bannerContainer}>
      <Animated.Image
        source={BANNERS[currentBanner]}
        style={[styles.banner, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 DiNiStore - All rights reserved</Text>
  </View>
);

const ProductItem = ({ item, addToCart }: { item: Product; addToCart: (product: Product) => void }) => {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  return (
    <View style={styles.productContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </TouchableOpacity>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price} USD</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => addToCart(item)}
        >
          <Icon name="cart-outline" size={24} color="#FF8C00" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        >
          <Icon name="eye-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          axios.get('https://fakestoreapi.com/products'),
          axios.get('https://fakestoreapi.com/products/categories'),
        ]);
        setProducts(productResponse.data);
        setCategories(
          categoryResponse.data.map((name: string, index: number) => ({
            id: index.toString(),
            name,
          }))
        );
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product: Product) => {
    if (cartItems.some((item) => item.id === product.id)) {
      Alert.alert("Success", `${product.title} has already been added to cart.`);
    } else {
      setCartItems([...cartItems, product]);
      Alert.alert("Success", `${product.title} has been added to cart.`);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Header cartItemCount={cartItems.length} cartItems={cartItems} />

      <TextInput
        style={styles.searchInput}
        placeholder="Find Product..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <Banner />
      <Text style={styles.sectionTitle}>Category</Text>
      <FlatList
        data={categories}
        horizontal={true}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.categoryItem}
            onPress={() => setSelectedCategory(item.name)}
          >
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.sectionTitle}>All Product</Text>
      <FlatList
        data={filteredProducts} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductItem item={item} addToCart={addToCart} />
        )}
        numColumns={2}
      />
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    backgroundColor: '#808080',
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchInput: { 
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#737373',
    borderRadius: 4,
    fontSize: 16,
    color: '#fff',
  },
  bannerContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  banner: {
    width: '90%',
    height: 150,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingLeft: 10,
    backgroundColor: '#cccccc',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  productContainer: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    borderRadius: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#FF8C00',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  iconButton: {
    marginHorizontal: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#808080',
  },
});

export default App;
