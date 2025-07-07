'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/store/toastStore';
import { ShoppingCartIcon, StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCartStore();
  const toast = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAddingToCart(true);
    
    try {
      const productImage = product.images && product.images.length > 0 ? product.images[0] : product.image || '';
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: productImage,
        quantity: 1,
      });
      
      // Show success toast
      toast.success('Produto adicionado!', `${product.name} foi adicionado ao carrinho.`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Erro', 'Não foi possível adicionar o produto ao carrinho.');
    } finally {
      setAddingToCart(false);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarIconSolid key={i} className="h-4 w-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarIcon className="h-4 w-4 text-gray-300" />
            <StarIconSolid className="h-4 w-4 text-yellow-400 absolute top-0 left-0 w-1/2 overflow-hidden" />
          </div>
        );
      } else {
        stars.push(
          <StarIcon key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  const getImageUrl = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return product.image || '/placeholder-product.png';
  };

  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.compare_price! - product.price) / product.compare_price!) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <Link href={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              -{discountPercentage}%
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-sm transition-colors duration-200"
          >
            {isWishlisted ? (
              <HeartIconSolid className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>

          {/* Product Image */}
          <div className="relative w-full h-full">
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-t-2xl" />
            )}
            <Image
              src={getImageUrl()}
              alt={product.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoadingComplete={() => setImageLoading(false)}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full bg-white text-gray-900 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {addingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-900"></div>
                  Adicionando...
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="h-4 w-4" />
                  Adicionar ao Carrinho
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category */}
          {product.category && (
            <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">
              {product.category}
            </div>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {renderStars(product.rating || 0)}
            </div>
            <span className="text-sm text-gray-500">
              ({product.review_count || product.reviews || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.compare_price!)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.stock && product.stock > 0 ? (
                <>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">
                    Em estoque
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-red-600 font-medium">
                    Esgotado
                  </span>
                </>
              )}
            </div>
            
            {product.sold_count && product.sold_count > 0 && (
              <span className="text-xs text-gray-500">
                {product.sold_count} vendidos
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
