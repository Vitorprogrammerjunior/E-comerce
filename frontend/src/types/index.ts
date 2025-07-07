export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  compare_price?: number;
  category: string;
  image: string | null;
  images: string[];
  stock: number;
  rating: number;
  reviews: number;
  review_count?: number;
  sold_count?: number;
  featured: boolean;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  productCount: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  estimatedDelivery: string;
  paymentId?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  count?: number;
  total?: number;
  page?: number;
  pages?: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
