'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { apiClient } from '@/lib/api';
import ProductCard from '@/components/product/ProductCard';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await apiClient.getFeaturedProducts();
        setFeaturedProducts(response.data.data || []);
      } catch (err) {
        setError('Erro ao carregar produtos em destaque');
        console.error('Error fetching featured products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Bem-vindo à E-Shop
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-orange-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Descubra os melhores produtos com preços incríveis
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/products">
                <Button variant="primary" size="lg" className="text-orange-600  hover:bg-gray-100">
                  Ver Todos os Produtos
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" className=" border-white hover:bg-white/10">
                  Explorar Categorias
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              {
                icon: "🚚",
                title: "Entrega Rápida",
                description: "Entrega em todo o Brasil com agilidade e segurança",
                color: "bg-orange-100 text-orange-600"
              },
              {
                icon: "✅",
                title: "Qualidade Garantida", 
                description: "Produtos selecionados com garantia de qualidade",
                color: "bg-green-100 text-green-600"
              },
              {
                icon: "🔒",
                title: "Pagamento Seguro",
                description: "Diversas formas de pagamento com segurança total",
                color: "bg-blue-100 text-blue-600"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${feature.color} group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">Produtos em Destaque</h2>
            <Link
              href="/products"
              className="flex items-center text-orange-600 hover:text-orange-800 font-medium transition-colors group"
            >
              Ver todos
              <ChevronRightIcon className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {loading ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {[...Array(4)].map((_, i) => (
                <motion.div 
                  key={i} 
                  className="animate-pulse"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </motion.div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
              >
                Tentar Novamente
              </Button>
            </motion.div>
          ) : featuredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600">Nenhum produto em destaque encontrado.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-900 text-white py-16 flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className='text-center flex flex-col items-center'
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Fique por dentro das novidades</h2>
            <p className="text-gray-300 mb-8">Receba ofertas exclusivas e lançamentos em primeira mão</p>
            <div className="w-full max-w-md mx-auto flex flex-col gap-4">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <Button 
                variant="primary" 
                className="w-full rounded-lg"
              >
                Inscrever
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
