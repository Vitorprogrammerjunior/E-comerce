import Link from 'next/link';

export default function Footer() {
  const footerSections = [
    {
      title: 'E-Shop',
      links: [
        { name: 'Sobre nós', href: '/about' },
        { name: 'Carreiras', href: '/careers' },
        { name: 'Imprensa', href: '/press' },
        { name: 'Sustentabilidade', href: '/sustainability' },
      ]
    },
    {
      title: 'Atendimento',
      links: [
        { name: 'Central de Ajuda', href: '/help' },
        { name: 'Como Comprar', href: '/help/how-to-buy' },
        { name: 'Entrega', href: '/shipping' },
        { name: 'Devoluções', href: '/returns' },
      ]
    },
    {
      title: 'Minha Conta',
      links: [
        { name: 'Fazer Login', href: '/login' },
        { name: 'Meus Pedidos', href: '/profile/orders' },
        { name: 'Lista de Desejos', href: '/wishlist' },
        { name: 'Endereços', href: '/profile/addresses' },
      ]
    },
    {
      title: 'Categorias',
      links: [
        { name: 'Eletrônicos', href: '/products?category=Eletr%C3%B4nicos' },
        { name: 'Roupas', href: '/products?category=Roupas' },
        { name: 'Casa e Jardim', href: '/products?category=Casa%20e%20Jardim' },
        { name: 'Esportes', href: '/products?category=Esportes' },
      ]
    }
  ];

  const paymentMethods = [
    '💳', '💰', '🏦', '📱', '💎'
  ];

  const socialLinks = [
    { icon: '📘', href: '#', color: 'hover:text-blue-600' },
    { icon: '🐦', href: '#', color: 'hover:text-blue-400' },
    { icon: '📷', href: '#', color: 'hover:text-pink-600' },
    { icon: '📺', href: '#', color: 'hover:text-red-600' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  E
                </div>
                <span className="text-2xl font-bold">E-Shop</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Sua loja online de confiança com os melhores produtos e preços do mercado. 
                Compre com segurança e receba rapidamente.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <span className="text-orange-400">📞</span>
                  <span>(11) 9 9999-9999</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <span className="text-orange-400">📧</span>
                  <span>contato@e-shop.com.br</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <span className="text-orange-400">📍</span>
                  <span>São Paulo, SP - Brasil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-6 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="border-t border-gray-800 mt-12 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="bg-orange-500 rounded-full p-3">
                <span className="text-white text-2xl">🚚</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">Entrega Rápida</h4>
                <p className="text-sm">Receba em até 24h</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="bg-green-500 rounded-full p-3">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">Compra Segura</h4>
                <p className="text-sm">Seus dados protegidos</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="bg-red-500 rounded-full p-3">
                <span className="text-white text-2xl">❤️</span>
              </div>
              <div>
                <h4 className="font-semibold text-white">Garantia Total</h4>
                <p className="text-sm">Devolução grátis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 E-Shop. Todos os direitos reservados.
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Formas de pagamento:</span>
              <div className="flex items-center space-x-2">
                {paymentMethods.map((method, index) => (
                  <span key={index} className="text-2xl">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Siga-nos:</span>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`text-gray-400 ${social.color} transition-colors duration-200 text-2xl hover:scale-110 transform`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 mt-4 pt-4 border-t border-gray-800">
            <Link href="/terms" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Termos de Uso
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Política de Cookies
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">
              Acessibilidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
