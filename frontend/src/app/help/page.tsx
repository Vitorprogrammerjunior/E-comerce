'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { 
  QuestionMarkCircleIcon, 
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('faq');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const faqs = [
    {
      category: 'Pedidos',
      questions: [
        {
          q: 'Como faço para cancelar meu pedido?',
          a: 'Você pode cancelar seu pedido na área "Meus Pedidos" enquanto ele estiver com status "Pendente" ou "Processando". Após o envio, não é possível cancelar.'
        },
        {
          q: 'Como posso alterar o endereço de entrega?',
          a: 'Se o pedido ainda não foi enviado, entre em contato conosco imediatamente. Pedidos já enviados não podem ter o endereço alterado.'
        },
        {
          q: 'Posso parcelar minha compra?',
          a: 'Sim! Aceitamos parcelamento em até 12x sem juros no cartão de crédito para compras acima de R$ 100,00.'
        }
      ]
    },
    {
      category: 'Entrega',
      questions: [
        {
          q: 'Qual o prazo de entrega?',
          a: 'O prazo varia conforme sua região: Sudeste (1-4 dias), Sul (2-5 dias), Nordeste (3-7 dias), Norte/Centro-Oeste (4-10 dias úteis).'
        },
        {
          q: 'Como acompanho meu pedido?',
          a: 'Após o envio, você receberá um código de rastreamento por email. Também pode acompanhar na área "Meus Pedidos".'
        },
        {
          q: 'O que fazer se não estiver em casa na entrega?',
          a: 'A transportadora tentará entregar por até 3 vezes. Você pode reagendar diretamente com eles ou retirar em um ponto de coleta.'
        }
      ]
    },
    {
      category: 'Trocas e Devoluções',
      questions: [
        {
          q: 'Qual o prazo para trocas?',
          a: 'Você tem até 30 dias após o recebimento para solicitar troca ou devolução, desde que o produto esteja em perfeitas condições.'
        },
        {
          q: 'Como faço para trocar um produto?',
          a: 'Acesse "Meus Pedidos", selecione o item e clique em "Solicitar Troca". Nossa equipe entrará em contato em até 24 horas.'
        },
        {
          q: 'Quem paga o frete da troca?',
          a: 'Se o produto veio com defeito, nós pagamos. Se é por arrependimento, o frete fica por sua conta.'
        }
      ]
    },
    {
      category: 'Pagamento',
      questions: [
        {
          q: 'Quais formas de pagamento vocês aceitam?',
          a: 'Aceitamos cartão de crédito, débito, PIX e boleto bancário. Todas as transações são seguras e criptografadas.'
        },
        {
          q: 'Meu pagamento foi rejeitado, o que fazer?',
          a: 'Verifique os dados do cartão, limite disponível e tente novamente. Se persistir, entre em contato com seu banco.'
        },
        {
          q: 'Quando o pagamento é cobrado?',
          a: 'Para cartão e PIX, é imediato. Para boleto, após a confirmação bancária (até 3 dias úteis).'
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Central de Ajuda</h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Estamos aqui para ajudar você! Encontre respostas ou entre em contato conosco.
        </p>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chat Online</h3>
            <p className="text-gray-600 mb-4">Atendimento imediato</p>
            <Button className="w-full">Iniciar Chat</Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <PhoneIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Telefone</h3>
            <p className="text-gray-600 mb-2">(11) 1234-5678</p>
            <p className="text-sm text-gray-500 mb-4">Seg-Sex: 8h-18h</p>
            <Button variant="outline" className="w-full">Ligar Agora</Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <EnvelopeIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Resposta em até 24h</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setActiveTab('contact')}
            >
              Enviar Email
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('faq')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'faq' 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <QuestionMarkCircleIcon className="h-5 w-5 inline mr-2" />
                Perguntas Frequentes
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'contact' 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <EnvelopeIcon className="h-5 w-5 inline mr-2" />
                Fale Conosco
              </button>
              <button
                onClick={() => setActiveTab('hours')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'hours' 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <ClockIcon className="h-5 w-5 inline mr-2" />
                Horários
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'faq' && (
              <div className="space-y-8">
                {faqs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <h2 className="text-2xl font-semibold mb-4 text-blue-600">
                      {category.category}
                    </h2>
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <details key={faqIndex} className="group">
                          <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                            <span className="font-medium">{faq.q}</span>
                            <span className="ml-2 transform group-open:rotate-180 transition-transform">
                              ▼
                            </span>
                          </summary>
                          <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg">
                            <p className="text-gray-700">{faq.a}</p>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="max-w-2xl mx-auto">
                {submitted ? (
                  <div className="text-center py-8">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-green-600 mb-2">
                      Mensagem Enviada!
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Recebemos sua mensagem e responderemos em até 24 horas.
                    </p>
                    <Button onClick={() => setSubmitted(false)}>
                      Enviar Nova Mensagem
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Nome *"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Email *"
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Assunto *
                      </label>
                      <select
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="pedido">Dúvida sobre pedido</option>
                        <option value="entrega">Problema com entrega</option>
                        <option value="produto">Dúvida sobre produto</option>
                        <option value="troca">Troca ou devolução</option>
                        <option value="pagamento">Problema com pagamento</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mensagem *
                      </label>
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descreva sua dúvida ou problema..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                    </Button>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'hours' && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Horários de Atendimento</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">
                      Chat Online & Telefone
                    </h3>
                    <p className="text-blue-700">
                      Segunda a sexta-feira: 8h às 18h<br />
                      Sábados: 9h às 15h<br />
                      Domingos e feriados: Fechado
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Email
                    </h3>
                    <p className="text-green-700">
                      Disponível 24/7<br />
                      Resposta em até 24 horas úteis
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      WhatsApp
                    </h3>
                    <p className="text-yellow-700">
                      (11) 99999-9999<br />
                      Segunda a sexta-feira: 8h às 18h
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Emergências</h3>
                  <p className="text-gray-700">
                    Para problemas urgentes com pedidos já enviados, 
                    use nosso chat online ou telefone durante o horário comercial.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
