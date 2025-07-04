'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { apiClient } from '@/lib/api';
import Button from '@/components/ui/Button';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address?: string; // For backwards compatibility
    street?: string;  // New field name
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
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

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchOrder(params.id as string);
    }
  }, [params.id]);

  const fetchOrder = async (orderId: string) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      if (response.data.success) {
        setOrder(response.data.order);
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancelOrder = async () => {
    if (!order) return;
    
    if (!confirm('Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita.')) {
      return;
    }
    
    setIsCancelling(true);
    
    try {
      const response = await apiClient.cancelOrder(order.id);
      if (response.data.success) {
        // Update the order in the state
        setOrder({
          ...order,
          status: 'cancelled'
        });
        
        // Show success message with order number
        const orderNumber = order.id.split('-')[1] || order.id;
        alert(`Pedido #${orderNumber} cancelado com sucesso!`);
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Não foi possível cancelar o pedido. Tente novamente ou contate o suporte.');
    } finally {
      setIsCancelling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Carregando pedido...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Pedido não encontrado</h1>
          <p className="text-gray-600 mb-8">
            Não foi possível encontrar este pedido.
          </p>
          <Button onClick={() => router.push('/products')}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Pedido Confirmado!
        </h1>
        <p className="text-gray-600">
          Obrigado pela sua compra. Seu pedido foi processado com sucesso.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Detalhes do Pedido</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Número do Pedido</p>
              <p className="font-medium">#{order.id}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Data do Pedido</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <span className={`inline-block ${getStatusColor(order.status)} text-sm px-3 py-1 rounded-full font-medium`}>
                {getStatusText(order.status)}
              </span>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Método de Pagamento</p>
              <p className="font-medium capitalize">
                {order.paymentMethod.replace('_', ' ')}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="font-bold text-lg">R$ {order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Endereço de Entrega</h2>
          
          <div className="space-y-2">
            <p className="font-medium">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p>{order.shippingAddress.street || order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </p>
            <p>{order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Itens do Pedido</h2>
        
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 border-b border-gray-200 pb-4">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)} cada</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Próximos Passos</h2>
        
        <div className="space-y-2">
          <p>• Você receberá um email de confirmação em breve</p>
          <p>• Acompanhe o status do seu pedido na sua conta</p>
          <p>• O prazo de entrega é de 5-7 dias úteis</p>
          <p>• Em caso de dúvidas, entre em contato conosco</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button
          onClick={() => router.push('/profile/orders')}
          className="flex-1"
        >
          Ver Meus Pedidos
        </Button>
        <Button
          onClick={() => router.push('/products')}
          variant="outline"
          className="flex-1"
        >
          Continuar Comprando
        </Button>
        {(order.status.toLowerCase() === 'pending' || order.status.toLowerCase() === 'processing') && (
          <Button
            onClick={handleCancelOrder}
            variant="danger"
            className="flex-1"
            loading={isCancelling}
          >
            {isCancelling ? 'Cancelando...' : 'Cancelar Pedido'}
          </Button>
        )}
      </div>
    </div>
  );
}
