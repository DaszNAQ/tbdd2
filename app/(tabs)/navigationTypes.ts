// navigationTypes.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Home: undefined; // Màn hình Home không có tham số
    ProductDetail: { productId: number }; // Màn hình ProductDetail nhận tham số productId
  };
  