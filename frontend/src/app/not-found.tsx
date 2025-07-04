import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ExclamationTriangleIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <ExclamationTriangleIcon className="mx-auto h-24 w-24 text-yellow-400" />
          <h1 className="mt-6 text-6xl font-bold text-gray-900">404</h1>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Página não encontrada
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Oops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex flex-col space-y-3">
            <Link href="/">
              <Button className="w-full flex items-center justify-center">
                <HomeIcon className="h-5 w-5 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
            
            <Link href="/products">
              <Button variant="outline" className="w-full flex items-center justify-center">
                <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
                Explorar Produtos
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Se você acredita que isso é um erro, entre em contato conosco.
          </p>
          <Link href="/help" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
            Central de Ajuda
          </Link>
        </div>
      </div>
    </div>
  );
}
