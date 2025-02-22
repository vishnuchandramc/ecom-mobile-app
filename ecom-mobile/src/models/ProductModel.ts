// Interface for the category object
interface Category {
  id: number;
  name: string;
  image: string;
}

// Main Product interface
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
