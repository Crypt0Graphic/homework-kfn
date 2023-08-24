export interface Product {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}

export interface Rating {
  rate: number;
  count: number;
}
