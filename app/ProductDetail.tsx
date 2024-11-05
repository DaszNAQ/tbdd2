import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

type Product = {
  category: string;
  id: number;
  title: string;
  price: string;
  image: string;
  description: string; // Assuming the API provides a description field
};

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params as { productId: number };
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // State to manage cart items (you can also use a context or a state management library)
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product detail: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetail();
  }, [productId]);

  const addToCart = () => {
    if (product) {
      setCartItems((prevItems) => [...prevItems, product]);
      Alert.alert('Success', `${product.title} has been added to your cart!`);
    }
  };

  const buyNow = () => {
    if (product) {
      Alert.alert('Buy Now', `You have chosen to buy ${product.title}.`);
      // Here you can navigate to a checkout screen or handle the purchase
      navigation.navigate('Checkout', { product });
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#FFF" />
      </TouchableOpacity>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>{product.price} USD</Text>
      <Text style={styles.description}>{product.description}</Text>
      
      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
      
      {/* Buy Now Button */}
      <TouchableOpacity style={styles.button} onPress={buyNow}>
        <Text style={styles.buttonText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff', // Added background color for better contrast
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    backgroundColor: '#4CAF50', // Change to your preferred color
    borderRadius: 5,
  },
  image: {
    width: '50%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#FF8C00',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
