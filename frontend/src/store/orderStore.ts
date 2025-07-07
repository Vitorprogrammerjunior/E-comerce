import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  createdAt: string;
  estimatedDelivery?: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'estimatedDelivery'>) => string;
  cancelOrder: (orderId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrder: (orderId: string) => Order | undefined;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      
      addOrder: (orderData) => {
        const orderId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const now = new Date();
        const estimatedDelivery = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
        
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          createdAt: now.toISOString(),
          estimatedDelivery: estimatedDelivery.toISOString(),
          status: 'pending'
        };

        set((state) => ({
          orders: [newOrder, ...state.orders]
        }));

        return orderId;
      },

      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter(order => order.id !== orderId)
        }));
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map(order => 
            order.id === orderId ? { ...order, status } : order
          )
        }));
      },

      getOrder: (orderId) => {
        return get().orders.find(order => order.id === orderId);
      },

      clearOrders: () => {
        set({ orders: [] });
      }
    }),
    {
      name: 'order-storage',
    }
  )
);
