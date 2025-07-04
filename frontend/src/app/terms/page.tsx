export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
            <p className="mb-4">
              Ao acessar e usar este site, você aceita e concorda em cumprir os termos 
              e condições estabelecidos neste documento. Se você não concorda com 
              qualquer parte destes termos, não deve usar nossos serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Uso do Site</h2>
            <p className="mb-4">
              Você pode usar nosso site para:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Navegar e visualizar produtos</li>
              <li>Fazer compras</li>
              <li>Criar e gerenciar sua conta</li>
              <li>Entrar em contato conosco</li>
            </ul>
            <p className="mb-4">
              Você concorda em não usar o site para:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Atividades ilegais ou não autorizadas</li>
              <li>Transmitir vírus ou códigos maliciosos</li>
              <li>Tentar obter acesso não autorizado</li>
              <li>Interferir no funcionamento do site</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Contas de Usuário</h2>
            <p className="mb-4">
              Para fazer compras, você deve criar uma conta fornecendo informações 
              precisas e atualizadas. Você é responsável por:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Manter a confidencialidade de sua senha</li>
              <li>Todas as atividades que ocorrem em sua conta</li>
              <li>Notificar-nos sobre uso não autorizado</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Produtos e Preços</h2>
            <p className="mb-4">
              Todos os produtos estão sujeitos à disponibilidade. Reservamo-nos o 
              direito de:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Limitar quantidades de produtos</li>
              <li>Descontinuar produtos</li>
              <li>Recusar pedidos</li>
              <li>Corrigir erros de preço</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Pagamentos</h2>
            <p className="mb-4">
              Aceitamos os seguintes métodos de pagamento:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cartões de crédito e débito</li>
              <li>PIX</li>
              <li>Boleto bancário</li>
            </ul>
            <p className="mb-4">
              O pagamento deve ser feito no momento da compra. Pedidos não pagos 
              serão cancelados automaticamente.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Entrega</h2>
            <p className="mb-4">
              Faremos todos os esforços para entregar produtos no prazo estimado, 
              mas não garantimos datas específicas de entrega. Não somos responsáveis 
              por atrasos causados por fatores fora de nosso controle.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Devoluções e Reembolsos</h2>
            <p className="mb-4">
              Você pode devolver produtos em até 30 dias após a entrega, desde que:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>O produto esteja em sua embalagem original</li>
              <li>Não tenha sido usado ou danificado</li>
              <li>Tenha todos os acessórios incluídos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Propriedade Intelectual</h2>
            <p className="mb-4">
              Todo o conteúdo deste site, incluindo textos, imagens, logos e design, 
              é protegido por direitos autorais e outras leis de propriedade intelectual. 
              Você não pode usar nosso conteúdo sem autorização expressa.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitação de Responsabilidade</h2>
            <p className="mb-4">
              Nossa responsabilidade é limitada ao valor do produto comprado. 
              Não somos responsáveis por danos indiretos, incidentais ou consequenciais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Alterações nos Termos</h2>
            <p className="mb-4">
              Podemos modificar estes termos a qualquer momento. As alterações 
              entrarão em vigor imediatamente após a publicação no site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Lei Aplicável</h2>
            <p className="mb-4">
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa 
              será resolvida nos tribunais competentes do Brasil.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Contato</h2>
            <p className="mb-4">
              Para dúvidas sobre estes termos, entre em contato:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> legal@ecommerce.com</p>
              <p><strong>Telefone:</strong> (11) 1234-5678</p>
              <p><strong>Endereço:</strong> Rua das Flores, 123 - São Paulo, SP</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
