import { QueryParam } from '@commercetools/platform-sdk';

export interface ProductData {
  description: string;
  name: string;
  image: string;
  price: string;
  discounted: boolean;
  discount: string;
}

export interface QueryType {
  [key: string]: QueryParam;
}
