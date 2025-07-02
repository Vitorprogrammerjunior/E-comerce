const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');

// Mock payment gateway simulation
const simulatePayment = (paymentData) => {
  // Simula processamento de pagamento
  const success = Math.random() > 0.1; // 90% de sucesso
  
  return {
    success,
    transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: success ? 'approved' : 'failed',
    message: success ? 'Payment processed successfully' : 'Payment failed - insufficient funds',
    processedAt: new Date().toISOString()
  };
};

// Mock de cálculo de frete
const calculateShipping = (address, items) => {
  const baseRate = 15.99;
  const weightFactor = items.reduce((total, item) => total + (item.weight || 0.5) * item.quantity, 0);
  const distanceFactor = address.state === 'SP' ? 1 : 1.5; // Simulação baseada no estado
  
  const shippingCost = Math.max(baseRate * distanceFactor + (weightFactor * 2), 0);
  const estimatedDays = address.state === 'SP' ? '2-3' : '5-7';
  
  return {
    cost: Math.round(shippingCost * 100) / 100,
    estimatedDays,
    carrier: 'Correios',
    service: 'PAC'
  };
};

// @desc    Calculate shipping costs
// @route   POST /api/checkout/shipping
// @access  Private
const calculateShippingCosts = asyncHandler(async (req, res) => {
  const { address, items } = req.body;
  
  if (!address || !address.zipCode || !items || !items.length) {
    return res.status(400).json({
      success: false,
      message: 'Address and items are required'
    });
  }
  
  const shipping = calculateShipping(address, items);
  
  res.json({
    success: true,
    data: {
      shipping,
      options: [
        {
          id: 'pac',
          name: 'PAC',
          cost: shipping.cost,
          estimatedDays: shipping.estimatedDays,
          description: 'Entrega econômica'
        },
        {
          id: 'sedex',
          name: 'SEDEX',
          cost: shipping.cost * 1.8,
          estimatedDays: address.state === 'SP' ? '1-2' : '2-4',
          description: 'Entrega expressa'
        }
      ]
    }
  });
});

// @desc    Validate checkout data
// @route   POST /api/checkout/validate
// @access  Private
const validateCheckout = asyncHandler(async (req, res) => {
  const { items, address, payment } = req.body;
  const errors = [];
  
  // Validar itens
  if (!items || !items.length) {
    errors.push('Cart is empty');
  }
  
  // Validar endereço
  if (!address) {
    errors.push('Shipping address is required');
  } else {
    const requiredFields = ['name', 'street', 'number', 'city', 'state', 'zipCode'];
    requiredFields.forEach(field => {
      if (!address[field]) {
        errors.push(`Address ${field} is required`);
      }
    });
  }
  
  // Validar forma de pagamento
  if (!payment || !payment.method) {
    errors.push('Payment method is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  res.json({
    success: true,
    message: 'Checkout data is valid'
  });
});

// @desc    Process checkout and create order
// @route   POST /api/checkout/process
// @access  Private
const processCheckout = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { items, address, payment, shipping } = req.body;
  
  // Calcular totais
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCost = shipping?.cost || 0;
  const tax = subtotal * 0.1; // 10% de imposto simulado
  const total = subtotal + shippingCost + tax;
  
  // Simular processamento do pagamento
  const paymentResult = simulatePayment({
    amount: total,
    method: payment.method,
    details: payment.details
  });
  
  if (!paymentResult.success) {
    return res.status(400).json({
      success: false,
      message: 'Payment processing failed',
      error: paymentResult.message
    });
  }
  
  // Criar pedido
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  
  const order = {
    id: orderId,
    userId,
    status: 'confirmed',
    items: items.map(item => ({
      productId: item.productId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      variants: item.selectedVariants || []
    })),
    totals: {
      subtotal: Math.round(subtotal * 100) / 100,
      shipping: Math.round(shippingCost * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      total: Math.round(total * 100) / 100
    },
    shippingAddress: address,
    payment: {
      method: payment.method,
      transactionId: paymentResult.transactionId,
      status: paymentResult.status,
      processedAt: paymentResult.processedAt
    },
    shipping: {
      method: shipping?.method || 'pac',
      cost: shippingCost,
      estimatedDelivery: shipping?.estimatedDays || '5-7 dias'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // Salvar pedido (mock - em produção salvar no banco)
  // Aqui você salvaria no banco de dados
  
  // Simular envio de email de confirmação
  const emailData = {
    to: req.user.email || address.email,
    subject: `Pedido confirmado - ${orderId}`,
    template: 'order-confirmation',
    data: order
  };
  
  // Log do "envio" de email
  console.log('📧 Email de confirmação enviado:', emailData.to);
  
  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: {
      order,
      redirectUrl: `/order-confirmation/${orderId}`,
      emailSent: true
    }
  });
});

// @desc    Get available payment methods
// @route   GET /api/checkout/payment-methods
// @access  Private
const getPaymentMethods = asyncHandler(async (req, res) => {
  const methods = [
    {
      id: 'credit_card',
      name: 'Cartão de Crédito',
      description: 'Visa, Mastercard, Elo',
      icon: 'credit-card',
      installments: {
        min: 1,
        max: 12,
        interestFree: 3
      }
    },
    {
      id: 'debit_card',
      name: 'Cartão de Débito',
      description: 'Débito à vista',
      icon: 'debit-card',
      installments: {
        min: 1,
        max: 1
      }
    },
    {
      id: 'pix',
      name: 'PIX',
      description: 'Pagamento instantâneo',
      icon: 'pix',
      discount: 0.05, // 5% de desconto
      installments: {
        min: 1,
        max: 1
      }
    },
    {
      id: 'bank_slip',
      name: 'Boleto Bancário',
      description: 'Vencimento em 3 dias úteis',
      icon: 'bank-slip',
      discount: 0.03, // 3% de desconto
      installments: {
        min: 1,
        max: 1
      }
    }
  ];
  
  res.json({
    success: true,
    data: methods
  });
});

// Routes
router.post('/shipping', authenticateToken, calculateShippingCosts);
router.post('/validate', authenticateToken, validateCheckout);
router.post('/process', authenticateToken, processCheckout);
router.get('/payment-methods', authenticateToken, getPaymentMethods);

module.exports = router;
