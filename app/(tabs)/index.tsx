import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from 'react-native';
import 'react-native-gesture-handler';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import { RootStackParamList } from './navigationTypes';
import ProductDetail from '@/app/(tabs)/detail'; // Màn hình chi tiết sản phẩm


// Tạo kiểu dữ liệu cho Category và Product
type Category = {
  id: string;
  name: string;
  image: string;
};

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};



// Dữ liệu mẫu cho Category và Product
const CATEGORIES: Category[] = [
  { id: '1', name: 'Iphone', image: require('./img/15pl.jpg') },
  { id: '2', name: 'Airpods', image: require('./img/airpod.jpg') },
  { id: '3', name: 'Ipad', image: require('./img/air6.jpg') },
  { id: '4', name: 'Samsung', image: require('./img/a25.jpg') },
];

// const PRODUCTS: Product[] = [
//   { id: '1', name: 'Iphone 15 Plus', price: '18.000.000 VND', image: require('./img/15pl.jpg') },
//   { id: '2', name: 'Iphone 15 Pro Max', price: '25.000.000 VND', image: require('./img/15pm.jpg') },
//   { id: '3', name: 'Iphone 16', price: '20.000.000 VND', image: require('./img/16n.jpg') },
//   { id: '4', name: 'Iphone 16 Plus', price: '22.000.000 VND', image: require('./img/16pl.jpg') },
//   { id: '5', name: 'Iphone 16 Pro', price: '28.000.000 VND', image: require('./img/16pro.jpg') },
//   { id: '6', name: 'Iphone 16 Pro Max', price: '30.000.000 VND', image: require('./img/16pm.jpg') },
// ];

// Dữ liệu cho các banner
const BANNERS = [
  require('./img/banner.png'), // Hình ảnh banner thứ nhất
  require('./img/banner1.png'), // Hình ảnh banner thứ hai
];

// Component Header
const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>DiNiStore</Text>
  </View>
);

// Component Banner với hiệu ứng chuyển đổi động
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


// // Component CategoryItem
// const CategoryItem = ({ item }: { item: Category }) => (
//   <TouchableOpacity style={styles.categoryItem}>
//     <Image source={item.image} style={styles.categoryImage} />
//     <Text style={styles.categoryName}>{item.name}</Text>
//   </TouchableOpacity>
// );

// // Component ProductItem
// const ProductItem = ({ item }: { item: Product }) => (
//   <View style={styles.productItem}>
//     <Image source={item.image} style={styles.productImage} />
//     <Text style={styles.productName}>{item.name}</Text>
//     <Text style={styles.productPrice}>{item.price}</Text>

//     <View style={styles.buttonContainer}>
//       <TouchableOpacity style={styles.addToCartButton}>
//         <Text style={styles.buttonText}>Thêm vào giỏ</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.buyNowButton}>
//         <Text style={styles.buttonText}>Mua ngay</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// Component Footer
const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>© 2024 DiNiStore - Tất cả quyền được bảo lưu</Text>
  </View>
);
const ProductItem = ({ item }: { item: Product }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })} // Điều hướng với productId
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price} USD</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products/categories')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Banner />
      <Text style={styles.sectionTitle}>Danh Mục</Text>
      <View>
        <FlatList
          data={categories}
          horizontal={true}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text style={{ fontSize: 18 }}>{item}</Text>
            </View>
          )}
        />
      </View>
      <Text style={styles.sectionTitle}>Sản Phẩm</Text>
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductItem item={item} />} // Sử dụng ProductItem với điều hướng
          numColumns={2}
        />
      </View>
      <Footer />
    </ScrollView>
  );
};
// Style cho giao diện
const styles = StyleSheet.create({



  container: {
    flex: 1,
    padding: 10,
  },
  productContainer: {
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    borderRadius: 10,
    // Đảm bảo mỗi sản phẩm chiếm 50% màn hình
    width: '50%',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
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
  categoryList: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 30,
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
  },
  productList: {
    paddingHorizontal: 10,
  },
  productItem: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 10,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  // productImage: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 8,
  // },
  productName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // productPrice: {
  //   marginTop: 4,
  //   fontSize: 14,
  //   color: 'green',
  // },
  footer: {
    backgroundColor: '#6200EE',
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 10,
    width: '40%',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  buyNowButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 10,
    width: '40%',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default App;
