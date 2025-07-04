import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProductVariant {
  name: string;
  value: string;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  selectedVariants?: ProductVariant[];
  stock?: number;
  weight?: number;
  addedAt: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  subtotal: number;
  itemCount: number;
  isLoading: boolean;
  addItem: (item: Omit<CartItem, 'addedAt'>) => void;
  removeItem: (productId: number, variants?: ProductVariant[]) => void;
  updateQuantity: (productId: number, quantity: number, variants?: ProductVariant[]) => void;
  clearCart: () => void;
  setItems: (items: CartItem[]) => void;
  setLoading: (loading: boolean) => void;
  getItemCount: () => number;
  getCartSummary: () => {
    subtotal: number;
    itemCount: number;
    totalWeight: number;
  };
}

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const calculateItemCount = (items: CartItem[]) => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

// Helper function to compare variants
const variantsMatch = (variants1?: ProductVariant[], variants2?: ProductVariant[]) => {
  if (!variants1 && !variants2) return true;
  if (!variants1 || !variants2) return false;
  if (variants1.length !== variants2.length) return false;
  
  return variants1.every(v1 => 
    variants2.some(v2 => v1.name === v2.name && v1.value === v2.value)
  );
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      subtotal: 0,
      itemCount: 0,
      isLoading: false,
      
      addItem: (item) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(i => 
          i.productId === item.productId && variantsMatch(i.selectedVariants, item.selectedVariants)
        );
        
        let newItems;
        if (existingItemIndex > -1) {
          // Update existing item
          newItems = items.map((i, index) => 
            index === existingItemIndex 
              ? { ...i, quantity: Math.min(i.quantity + item.quantity, item.stock || 999) }
              : i
          );
        } else {
          // Add new item
          newItems = [...items, { 
            ...item, 
            quantity: Math.min(item.quantity, item.stock || 999),
            addedAt: new Date().toISOString() 
          }];
        }
        
        const newTotal = calculateTotal(newItems);
        const newItemCount = calculateItemCount(newItems);
        set({ 
          items: newItems, 
          total: newTotal, 
          subtotal: newTotal,
          itemCount: newItemCount 
        });
      },
      
      removeItem: (productId, variants) => {
        const { items } = get();
        const newItems = items.filter(item => 
          !(item.productId === productId && variantsMatch(item.selectedVariants, variants))
        );
        
        const newTotal = calculateTotal(newItems);
        const newItemCount = calculateItemCount(newItems);
        set({ 
          items: newItems, 
          total: newTotal, 
          subtotal: newTotal,
          itemCount: newItemCount 
        });
      },
      
      updateQuantity: (productId, quantity, variants) => {
        if (quantity <= 0) {
          get().removeItem(productId, variants);
          return;
        }
        
        const { items } = get();
        const newItems = items.map(item => {
          if (item.productId === productId && variantsMatch(item.selectedVariants, variants)) {
            return { 
              ...item, 
              quantity: Math.min(quantity, item.stock || 999) 
            };
          }
          return item;
        });
        
        const newTotal = calculateTotal(newItems);
        const newItemCount = calculateItemCount(newItems);
        set({ 
          items: newItems, 
          total: newTotal, 
          subtotal: newTotal,
          itemCount: newItemCount 
        });
      },
      
      clearCart: () => {
        set({ 
          items: [], 
          total: 0, 
          subtotal: 0, 
          itemCount: 0 
        });
      },
      
      setItems: (items) => {
        const newTotal = calculateTotal(items);
        const newItemCount = calculateItemCount(items);
        set({ 
          items, 
          total: newTotal, 
          subtotal: newTotal,
          itemCount: newItemCount 
        });
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
      
      getItemCount: () => {
        const { items } = get();
        return calculateItemCount(items);
      },
      
      getCartSummary: () => {
        const { items } = get();
        return {
          subtotal: calculateTotal(items),
          itemCount: calculateItemCount(items),
          totalWeight: items.reduce((weight, item) => 
            weight + ((item.weight || 0.5) * item.quantity), 0
          )
        };
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
