'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { useOrderStore } from '@/store/orderStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { formatPrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, TruckIcon, CreditCardIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: 'credit_card' | 'debit_card' | 'pix';
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addOrder } = useOrderStore();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review

  const [form, setForm] = useState<CheckoutForm>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Brasil',
    paymentMethod: 'credit_card',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return !!(form.firstName && form.lastName && form.street && form.city && form.state && form.zipCode);
      case 2:
        return !!form.paymentMethod;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/login?redirect=/checkout');
      return;
    }

    setIsLoading(true);

    try {
      // Simular processamento do pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Criar pedido fake
      const orderId = addOrder({
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
          street: form.street,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          country: form.country
        },
        total,
        status: 'pending'
      });

      // Limpar carrinho
      clearCart();
      
      // Redirecionar para confirmação
      router.push(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Carrinho vazio</h1>
          <p className="text-gray-600 mb-6">Adicione produtos ao carrinho para continuar</p>
          <Button onClick={() => router.push('/products')}>
            Continuar Comprando
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white text-gray-400 border-gray-300'
                }`}>
                  {step > stepNumber ? (
                    <CheckCircleIcon className="w-6 h-6" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-20 h-0.5 ml-4 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 mt-2">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Entrega
            </span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Pagamento
            </span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}>
              Revisão
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <TruckIcon className="w-6 h-6 text-blue-600 mr-3" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Informações de Entrega
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Telefone"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <Input
                      label="Endereço"
                      name="street"
                      value={form.street}
                      onChange={handleInputChange}
                      required
                      className="mb-4"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!validateStep(1)}
                      className="w-full"
                    >
                      Continuar para Pagamento
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <CreditCardIcon className="w-6 h-6 text-blue-600 mr-3" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Método de Pagamento
                      </h2>
                    </div>

                    <div className="space-y-4 mb-6">
                      {[
                        { id: 'credit_card', label: 'Cartão de Crédito', icon: '💳' },
                        { id: 'debit_card', label: 'Cartão de Débito', icon: '💳' },
                        { id: 'pix', label: 'PIX', icon: '📱' }
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`block p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            form.paymentMethod === method.id 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={form.paymentMethod === method.id}
                              onChange={handleInputChange}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="ml-3 text-2xl">{method.icon}</span>
                            <span className="ml-3 font-medium text-gray-900">
                              {method.label}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Voltar
                      </Button>
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="flex-1"
                      >
                        Revisar Pedido
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review Order */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-6">
                      <ShieldCheckIcon className="w-6 h-6 text-blue-600 mr-3" />
                      <h2 className="text-xl font-semibold text-gray-900">
                        Revisar Pedido
                      </h2>
                    </div>

                    {/* Shipping Address Review */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Endereço de Entrega</h3>
                      <p className="text-gray-600">
                        {form.firstName} {form.lastName}<br />
                        {form.street}<br />
                        {form.city}, {form.state} {form.zipCode}<br />
                        {form.country}
                      </p>
                    </div>

                    {/* Payment Method Review */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Método de Pagamento</h3>
                      <p className="text-gray-600">
                        {form.paymentMethod === 'credit_card' && 'Cartão de Crédito'}
                        {form.paymentMethod === 'debit_card' && 'Cartão de Débito'}
                        {form.paymentMethod === 'pix' && 'PIX'}
                      </p>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="flex-1"
                      >
                        Voltar
                      </Button>
                      <Button
                        type="submit"
                        loading={isLoading}
                        className="flex-1"
                      >
                        {isLoading ? 'Processando...' : 'Finalizar Pedido'}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Resumo do Pedido
              </h3>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.image}`} className="flex items-center space-x-3">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image || '/placeholder-product.png'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Qtd: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <ShieldCheckIcon className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800 font-medium">
                    Compra 100% segura
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
