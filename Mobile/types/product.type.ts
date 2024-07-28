import { ImageSourcePropType } from 'react-native';

export interface Product {
  id: number;
  title: string;
  price: number;
  imgs: ImageSourcePropType[];
}
