export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Informações de Entrega</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Áreas de Entrega</h2>
            <p className="mb-4">
              Entregamos em todo o território nacional brasileiro através de nossos 
              parceiros logísticos confiáveis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prazos de Entrega</h2>
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Região Sudeste</h3>
                  <ul className="space-y-1">
                    <li>Capitais: 1-2 dias úteis</li>
                    <li>Interior: 2-4 dias úteis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Região Sul</h3>
                  <ul className="space-y-1">
                    <li>Capitais: 2-3 dias úteis</li>
                    <li>Interior: 3-5 dias úteis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Região Nordeste</h3>
                  <ul className="space-y-1">
                    <li>Capitais: 3-4 dias úteis</li>
                    <li>Interior: 4-7 dias úteis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Região Norte/Centro-Oeste</h3>
                  <ul className="space-y-1">
                    <li>Capitais: 4-5 dias úteis</li>
                    <li>Interior: 5-10 dias úteis</li>
                  </ul>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              * Os prazos começam a contar a partir da confirmação do pagamento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Custos de Entrega</h2>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Frete Grátis</h3>
              <p className="text-green-700">
                Aproveite frete grátis em compras acima de R$ 199,00 para todo o Brasil!
              </p>
            </div>
            <p className="mb-4">
              Para compras abaixo do valor mínimo, o frete é calculado automaticamente 
              no checkout baseado no CEP de destino e peso dos produtos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Preparação do Pedido</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Confirmação do Pagamento</h3>
                  <p className="text-gray-600">
                    Após a confirmação do pagamento, seu pedido entra na fila de preparação.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Separação dos Produtos</h3>
                  <p className="text-gray-600">
                    Nossa equipe separa cuidadosamente todos os itens do seu pedido.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Embalagem Segura</h3>
                  <p className="text-gray-600">
                    Produtos são embalados com cuidado para chegarem perfeitos até você.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold">Envio</h3>
                  <p className="text-gray-600">
                    Seu pedido é enviado e você recebe o código de rastreamento.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Rastreamento</h2>
            <p className="mb-4">
              Após o envio, você receberá por email o código de rastreamento para 
              acompanhar a entrega do seu pedido em tempo real.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                <strong>Dica:</strong> Você também pode acompanhar seus pedidos 
                na área &ldquo;Meus Pedidos&rdquo; da sua conta.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Entrega</h2>
            <p className="mb-4">
              A entrega é feita no endereço informado durante a compra. Certifique-se de:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Informar um endereço completo e correto</li>
              <li>Ter alguém disponível para receber o pedido</li>
              <li>Verificar o conteúdo na presença do entregador</li>
              <li>Guardar a nota fiscal</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Problemas na Entrega</h2>
            <p className="mb-4">
              Se você não estiver em casa no momento da entrega:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>O transportador tentará a entrega por até 3 vezes</li>
              <li>Você pode reagendar a entrega diretamente com a transportadora</li>
              <li>Após 7 dias, o produto retorna para nosso centro de distribuição</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Produtos Danificados</h2>
            <p className="mb-4">
              Se o produto chegar danificado:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Não aceite a entrega se a embalagem estiver visivelmente danificada</li>
              <li>Entre em contato conosco em até 48 horas</li>
              <li>Providenciaremos a troca ou reembolso imediatamente</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contato</h2>
            <p className="mb-4">
              Dúvidas sobre entrega? Entre em contato:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> entrega@ecommerce.com</p>
              <p><strong>Telefone:</strong> (11) 1234-5678</p>
              <p><strong>WhatsApp:</strong> (11) 99999-9999</p>
              <p><strong>Horário:</strong> Segunda a sexta, 8h às 18h</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
