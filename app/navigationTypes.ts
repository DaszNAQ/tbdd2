// navigationTypes.ts
import { NavigatorScreenParams } from '@react-navigation/native';
type Product = {
  category: string;
  id: number;
  title: string;
  price: string;
  image: string;};
export type RootStackParamList = {
    Home: undefined; // Màn hình Home không có tham số
    cartscreen: { cartItems: Product[] };
    ProductDetail: { productId: number };
  };
  