export interface Rating {
  rate: number;
  count: number;
}

export type Products = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  rating: Rating;
}[];
