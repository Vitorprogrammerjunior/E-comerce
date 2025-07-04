'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/api';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'credit_card' | 'debit_card' | 'pix';
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<CheckoutForm>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Brasil',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }

    setIsLoading(true);

    try {
      // Create order
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          street: form.address, // Changed from address to street to match backend expectations
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country
        },
        paymentMethod: form.paymentMethod,
        paymentDetails: form.paymentMethod === 'pix' ? {} : {
          cardNumber: form.cardNumber,
          cardName: form.cardName,
          cardExpiry: form.cardExpiry,
          cardCvv: form.cardCvv
        },
        total
      };

      const response = await apiClient.createOrder(orderData);
      
      if (response.data.success) {
        clearCart();
        router.push(`/order-confirmation/${response.data.data.id}`);
      } else {
        alert('Erro ao processar pedido: ' + response.data.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Carrinho Vazio</h1>
          <p className="text-gray-600 mb-8">Adicione produtos ao carrinho para continuar</p>
          <Button onClick={() => router.push('/products')}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Shipping Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">1. Informações de Entrega</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Sobrenome"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Telefone"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  required
                  mask="(00) 00000-0000"
                  placeholder="(11) 99999-9999"
                />
                <div className="md:col-span-2">
                  <Input
                    label="Endereço"
                    name="address"
                    value={form.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Input
                  label="Cidade"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Estado"
                  name="state"
                  value={form.state}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="CEP"
                  name="zipCode"
                  value={form.zipCode}
                  onChange={handleInputChange}
                  required
                  mask="00000-000"
                  placeholder="12345-678"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    País
                  </label>
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Brasil">Brasil</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Forma de Pagamento</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Método de Pagamento
                </label>
                <div className="space-y-2">
                  <label className="flex items-center text-gray-900">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={form.paymentMethod === 'credit_card'}
                      onChange={handleInputChange}
                      className="mr-2 text-gray-900"
                    />
                    Cartão de Crédito
                  </label>
                  <label className="flex items-center text-gray-900">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debit_card"
                      checked={form.paymentMethod === 'debit_card'}
                      onChange={handleInputChange}
                      className="mr-2 text-gray-900"
                    />
                    Cartão de Débito
                  </label>
                  <label className="flex items-center text-gray-900">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={form.paymentMethod === 'pix'}
                      onChange={handleInputChange}
                      className="mr-2 text-gray-900"
                    />
                    PIX
                  </label>
                </div>
              </div>

              {(form.paymentMethod === 'credit_card' || form.paymentMethod === 'debit_card') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Número do Cartão"
                      name="cardNumber"
                      value={form.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      mask="0000 0000 0000 0000"
                    />
                  </div>
                  <div className="md:col-span-2 text-gray-900">
                    <Input
                      label="Nome no Cartão"
                      name="cardName"
                      value={form.cardName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    label="Validade"
                    name="cardExpiry"
                    value={form.cardExpiry}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    required
                    mask="00/00"
                  />
                  <Input
                    label="CVV"
                    name="cardCvv"
                    value={form.cardCvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    mask="000"
                  />
                </div>
              )}

              {form.paymentMethod === 'pix' && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Após finalizar o pedido, você receberá o código PIX para pagamento.
                  </p>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Processando...' : 'Finalizar Pedido'}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-black mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-black items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-gray-900">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              
              <hr />
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-900">Subtotal</p>
                <p className='font-bold text-gray-900'>R$ {total.toFixed(2)}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-900">Frete</p>
                <p className='font-bold text-green-500'>Grátis</p>
              </div>
              
              <hr />
              
              <div className="flex justify-between text-gray-900 items-center font-bold text-lg">
                <p>Total</p>
                <p>R$ {total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
