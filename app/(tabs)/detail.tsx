import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/app/(tabs)/navigationTypes';

type ProductDetailProps = {
  route: RouteProp<RootStackParamList, 'ProductDetail'>;
};

const ProductDetail: React.FC<ProductDetailProps> = ({ route }) => {
  const productId = route.params.productId;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (productId) {
      axios.get(`https://fakestoreapi.com/products/${productId}`)
        .then(response => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {product ? (
        <>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>{product.price} USD</Text>
        </>
      ) : (
        <Text>Không tìm thấy sản phẩm</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default ProductDetail;
