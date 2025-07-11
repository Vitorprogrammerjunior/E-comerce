import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">E-Store</h3>
              <p className="text-gray-300 mb-4 max-w-md">
                Sua loja online de confiança com os melhores produtos e preços.
                Entrega rápida e segura em todo o Brasil.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Links */}
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.789L3.684 8.047h2.924l1.072 5.454 2.845-5.454h2.943L8.449 16.988z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-300 hover:text-white transition-colors">
                    Categorias
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                    Sobre Nós
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">
                    Entrega e Frete
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-gray-300 hover:text-white transition-colors">
                    Trocas e Devoluções
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 E-Store. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <span className="text-gray-300 text-sm">Aceitamos:</span>
              <div className="flex space-x-2">
                <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                  VISA
                </div>
                <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                  MASTER
                </div>
                <div className="bg-white text-gray-900 px-2 py-1 rounded text-xs font-semibold">
                  PIX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
