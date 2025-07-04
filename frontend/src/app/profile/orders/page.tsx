'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { apiClient } from '@/lib/api';
import Button from '@/components/ui/Button';
import { ShoppingBagIcon, EyeIcon } from '@heroicons/react/24/outline';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{
    productId: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  paymentMethod: string;
}

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
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchOrders();
  }, [user, router]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      if (response.data.success) {
        setOrders(response.data.orders || []);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita.')) {
      return;
    }
    
    setIsCancelling(orderId);
    
    try {
      const response = await apiClient.cancelOrder(orderId);
      if (response.data.success) {
        // Update the order in the state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId 
              ? { ...order, status: 'cancelled' } 
              : order
          )
        );
        
        // Show success message
        const orderNumber = orderId.split('-')[1] || orderId;
        alert(`Pedido #${orderNumber} cancelado com sucesso!`);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Não foi possível cancelar o pedido. Tente novamente ou contate o suporte.');
    } finally {
      setIsCancelling(null);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Carregando pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
        <Button onClick={() => router.push('/products')}>
          Continuar Comprando
        </Button>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBagIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Nenhum pedido encontrado
          </h2>
          <p className="text-gray-600 mb-8">
            Você ainda não fez nenhum pedido. Que tal explorar nossos produtos?
          </p>
          <Button onClick={() => router.push('/products')}>
            Explorar Produtos
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                    <div>
                      <p className="text-sm text-gray-600">Pedido</p>
                      <p className="font-medium">#{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Data</p>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-medium">R$ {order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    <Button
                      onClick={() => router.push(`/order-confirmation/${order.id}`)}
                      variant="outline"
                      size="sm"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                          <span className="text-gray-400 text-xs">Sem imagem</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Quantidade: {item.quantity} • R$ {item.price.toFixed(2)} cada
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          R$ {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {order.items.length > 3 && (
                    <div className="text-center py-2">
                      <p className="text-sm text-gray-600">
                        e mais {order.items.length - 3} item(s)...
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Actions */}
              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                    Pagamento: {order.paymentMethod.replace('_', ' ')}
                  </div>
                  <div className="flex space-x-2">
                    {order.status.toLowerCase() === 'delivered' && (
                      <Button size="sm" variant="outline">
                        Avaliar Produtos
                      </Button>
                    )}
                    {(order.status.toLowerCase() === 'pending' || order.status.toLowerCase() === 'processing') && (
                      <Button 
                        size="sm" 
                        variant="danger"
                        onClick={() => handleCancelOrder(order.id)}
                        loading={isCancelling === order.id}
                        className="text-red-600 hover:bg-red-50 border border-red-200"
                      >
                        {isCancelling === order.id ? 'Cancelando...' : 'Cancelar Pedido'}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={() => router.push(`/order-confirmation/${order.id}`)}
                    >
                      Ver Pedido Completo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Profile */}
      <div className="mt-8 text-center">
        <Button
          onClick={() => router.push('/profile')}
          variant="outline"
        >
          Voltar ao Perfil
        </Button>
      </div>
    </div>
  );
}
