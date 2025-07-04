export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Trocas e Devoluções</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Prazo para Trocas e Devoluções</h2>
            <p className="mb-4">
              Você pode solicitar a troca ou devolução de produtos em até <strong>30 dias</strong> 
              após o recebimento, conforme previsto no Código de Defesa do Consumidor.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Condições para Troca/Devolução</h2>
            <p className="mb-4">
              Para que sua solicitação seja aceita, o produto deve atender às seguintes condições:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Estar em perfeitas condições de uso</li>
              <li>Na embalagem original, sem danos</li>
              <li>Com todos os acessórios e manuais incluídos</li>
              <li>Sem sinais de uso (quando aplicável)</li>
              <li>Com etiquetas e lacres intactos</li>
            </ul>
            
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Produtos que NÃO podem ser trocados:</h3>
              <ul className="text-yellow-700 list-disc pl-6">
                <li>Produtos de higiene pessoal</li>
                <li>Roupas íntimas</li>
                <li>Produtos com lacre de segurança rompido</li>
                <li>Produtos personalizados ou sob medida</li>
                <li>Produtos perecíveis</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Como Solicitar Troca ou Devolução</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Acesse sua conta</h3>
                  <p className="text-gray-600">
                    Entre na área &ldquo;Meus Pedidos&rdquo; em sua conta.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Selecione o pedido</h3>
                  <p className="text-gray-600">
                    Encontre o pedido e clique em &ldquo;Solicitar Troca/Devolução&rdquo;.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Preencha o formulário</h3>
                  <p className="text-gray-600">
                    Informe o motivo da troca/devolução e anexe fotos se necessário.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold">Aguarde a análise</h3>
                  <p className="text-gray-600">
                    Nossa equipe analisará sua solicitação em até 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Motivos para Troca/Devolução</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">✅ Responsabilidade nossa</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Produto com defeito</li>
                  <li>• Produto danificado no transporte</li>
                  <li>• Produto diferente do pedido</li>
                  <li>• Erro na descrição do produto</li>
                </ul>
                <p className="text-green-700 text-sm mt-2 font-medium">
                  Frete de devolução grátis + reembolso total
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">📋 Arrependimento</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Não gostou do produto</li>
                  <li>• Tamanho inadequado</li>
                  <li>• Cor diferente do esperado</li>
                  <li>• Mudou de ideia</li>
                </ul>
                <p className="text-blue-700 text-sm mt-2 font-medium">
                  Frete de devolução por sua conta + reembolso
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Processo de Devolução</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Após aprovação da solicitação:</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">🏠 Coleta em Casa</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Para defeitos ou erro nosso (grátis)
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Agendamos coleta em sua casa</li>
                    <li>• Prazo: 2-5 dias úteis</li>
                    <li>• Embalagem não obrigatória</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">📦 Envio pelos Correios</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Para arrependimento (por sua conta)
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Enviaremos etiqueta de postagem</li>
                    <li>• Embale bem o produto</li>
                    <li>• Poste em qualquer agência</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reembolso</h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">💰 Formas de Reembolso</h3>
                <ul className="text-green-700 space-y-1">
                  <li><strong>Cartão de crédito:</strong> Estorno em até 2 faturas</li>
                  <li><strong>Cartão de débito:</strong> Estorno em até 7 dias úteis</li>
                  <li><strong>PIX:</strong> Transferência em até 2 dias úteis</li>
                  <li><strong>Boleto:</strong> Transferência bancária em até 5 dias úteis</li>
                </ul>
              </div>
              
              <p className="text-sm text-gray-600">
                O prazo do reembolso começa a contar após recebermos e conferirmos o produto 
                em nosso centro de distribuição.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Trocas por Outro Produto</h2>
            
            <p className="mb-4">
              Você pode trocar seu produto por outro do nosso catálogo, desde que:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>O novo produto tenha valor igual ou superior</li>
              <li>Esteja disponível em estoque</li>
              <li>A diferença de valor seja paga antes do envio</li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                <strong>Dica:</strong> Para trocas por produtos de menor valor, 
                o saldo fica como crédito em sua conta para próximas compras.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Status da Solicitação</h2>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span><strong>Aguardando análise:</strong> Recebemos sua solicitação</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                <span><strong>Aprovada:</strong> Solicitação aprovada, aguardando produto</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                <span><strong>Produto recebido:</strong> Produto em análise</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span><strong>Finalizada:</strong> Reembolso processado ou nova entrega</span>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Dúvidas Frequentes</h2>
            
            <div className="space-y-4">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span className="font-medium">Posso cancelar a solicitação de troca?</span>
                  <span className="ml-2 transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-gray-700">
                    Sim, você pode cancelar até o momento em que o produto for coletado/postado. 
                    Entre em contato conosco o quanto antes.
                  </p>
                </div>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span className="font-medium">E se o produto chegar danificado na devolução?</span>
                  <span className="ml-2 transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-gray-700">
                    Se o produto for danificado durante o transporte de volta, 
                    faremos uma análise caso a caso. É importante embalar bem o produto.
                  </p>
                </div>
              </details>
              
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                  <span className="font-medium">Produtos em promoção podem ser trocados?</span>
                  <span className="ml-2 transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg">
                  <p className="text-gray-700">
                    Sim, produtos em promoção seguem as mesmas regras de troca e devolução, 
                    exceto quando especificado diferente na promoção.
                  </p>
                </div>
              </details>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Precisa de Ajuda?</h2>
            <p className="mb-4">
              Nossa equipe está pronta para ajudar você com sua troca ou devolução:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> trocas@ecommerce.com</p>
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
