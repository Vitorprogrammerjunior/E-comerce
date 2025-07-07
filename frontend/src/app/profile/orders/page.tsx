'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useOrderStore } from '@/store/orderStore';
import { useToast } from '@/store/toastStore';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { ShoppingBagIcon, EyeIcon } from '@heroicons/react/24/outline';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-300';
    case 'processing':
      return 'bg-blue-100 text-blue-800 border border-blue-300';
    case 'shipped':
      return 'bg-purple-100 text-purple-800 border border-purple-300';
    case 'delivered':
      return 'bg-green-100 text-green-800 border border-green-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-300';
  }
};

const getStatusText = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Pendente';
    case 'processing':
      return 'Processando';
    case 'shipped':
      return 'Enviado';
    case 'delivered':
      return 'Entregue';
    case 'cancelled':
      return 'Cancelado';
    default:
      return status;
  }
};

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { orders, cancelOrder } = useOrderStore();
  const toast = useToast();
  const [isCancelling, setIsCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
  }, [user, router]);

  const handleCancelOrder = (orderId: string) => {
    if (!confirm('Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita.')) {
      return;
    }
    
    setIsCancelling(orderId);
    
    try {
      // Remove order from local storage using Zustand store
      cancelOrder(orderId);
      
      // Show success message
      toast.success('Pedido cancelado!', 'O pedido foi removido com sucesso.');
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Erro ao cancelar', 'Não foi possível cancelar o pedido. Tente novamente.');
    } finally {
      setIsCancelling(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Meus Pedidos</h1>
            <Button onClick={() => router.push('/products')} className="w-full sm:w-auto">
              Continuar Comprando
            </Button>
          </div>

          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center py-16"
            >
              <ShoppingBagIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Nenhum pedido encontrado
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Você ainda não fez nenhum pedido. Que tal explorar nossos produtos e fazer sua primeira compra?
              </p>
              <Button onClick={() => router.push('/products')} size="lg">
                Explorar Produtos
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-100">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 mb-4 lg:mb-0">
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Pedido</p>
                          <p className="text-lg font-bold text-gray-900">#{order.id.slice(-8).toUpperCase()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Data</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">Total</p>
                          <p className="text-lg font-bold text-blue-600">{formatPrice(order.total)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          <div className="w-2 h-2 rounded-full mr-2 bg-current opacity-60"></div>
                          {getStatusText(order.status)}
                        </span>
                        <Button
                          onClick={() => router.push(`/order-confirmation/${order.id}`)}
                          variant="outline"
                          size="sm"
                          className="hidden sm:flex"
                        >
                          <EyeIcon className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-6">
                    <div className="grid gap-4">
                      {order.items.slice(0, 3).map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
                          <div className="relative w-16 h-16 bg-white rounded-lg overflow-hidden shadow-sm">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-xs font-medium">Sem imagem</span>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 line-clamp-1 text-lg">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Quantidade: <span className="font-medium">{item.quantity}</span> • 
                              Preço unitário: <span className="font-medium">{formatPrice(item.price)}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {order.items.length > 3 && (
                        <div className="text-center py-3 bg-blue-50 rounded-xl">
                          <p className="text-sm text-blue-700 font-medium">
                            + {order.items.length - 3} item(s) adicional(is)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <span className="font-medium">Endereço:</span>
                          <span className="ml-1">
                            {order.shippingAddress.city}, {order.shippingAddress.state}
                          </span>
                        </span>
                        {order.estimatedDelivery && (
                          <span className="flex items-center">
                            <span className="font-medium">Entrega prevista:</span>
                            <span className="ml-1">
                              {new Date(order.estimatedDelivery).toLocaleDateString('pt-BR')}
                            </span>
                          </span>
                        )}
                      </div>
                      
                      <div className="flex space-x-2">
                        {order.status === 'delivered' && (
                          <Button size="sm" variant="outline">
                            Avaliar Produtos
                          </Button>
                        )}
                        
                        {(order.status === 'pending' || order.status === 'processing') && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCancelOrder(order.id)}
                            loading={isCancelling === order.id}
                            className="text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                          >
                            {isCancelling === order.id ? 'Cancelando...' : 'Cancelar Pedido'}
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          onClick={() => router.push(`/order-confirmation/${order.id}`)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Ver Pedido Completo
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Back to Profile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Button
              onClick={() => router.push('/profile')}
              variant="outline"
              size="lg"
            >
              Voltar ao Perfil
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
