'use client';

import Image from 'next/image';
import { CartItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Props {
  item: CartItem;
}

export default function CartItemComponent({ item }: Props) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.productId);
    } else {
      updateQuantity(item.productId, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.productId);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 py-4 border-b border-gray-200">
      {/* Product Image and Info */}
      <div className="flex items-center space-x-4 flex-1">
        {/* Product Image */}
        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-400 text-xs">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatPrice(item.price)} cada
          </p>
          {/* Total Price for mobile */}
          <div className="sm:hidden text-lg font-semibold text-gray-900 mt-2">
            {formatPrice(item.price * item.quantity)}
          </div>
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
        {/* Quantity Controls */}
        <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
            aria-label="Diminuir quantidade"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          
          <span className="w-10 text-center font-medium text-sm">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1.5 rounded-md hover:bg-gray-200 transition-colors"
            aria-label="Aumentar quantidade"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Total Price for desktop */}
        <div className="hidden sm:block text-lg font-semibold text-gray-900 min-w-[80px] text-right">
          {formatPrice(item.price * item.quantity)}
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
          aria-label="Remover item"
        >
          <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}
