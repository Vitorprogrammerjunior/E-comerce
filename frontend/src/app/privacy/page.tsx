export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Informações que Coletamos</h2>
            <p className="mb-4">
              Coletamos informações que você nos fornece diretamente, como quando você:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cria uma conta em nosso site</li>
              <li>Faz uma compra</li>
              <li>Entra em contato conosco</li>
              <li>Se inscreve em nossa newsletter</li>
              <li>Participa de promoções ou pesquisas</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Como Usamos Suas Informações</h2>
            <p className="mb-4">
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Processar e entregar seus pedidos</li>
              <li>Fornecer atendimento ao cliente</li>
              <li>Enviar comunicações sobre produtos e serviços</li>
              <li>Melhorar nossos produtos e serviços</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Compartilhamento de Informações</h2>
            <p className="mb-4">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
              exceto nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Com prestadores de serviços que nos ajudam a operar nosso negócio</li>
              <li>Quando exigido por lei</li>
              <li>Para proteger nossos direitos ou propriedade</li>
              <li>Com seu consentimento explícito</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Segurança dos Dados</h2>
            <p className="mb-4">
              Implementamos medidas de segurança técnicas e organizacionais adequadas para 
              proteger suas informações pessoais contra acesso não autorizado, alteração, 
              divulgação ou destruição.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Seus Direitos</h2>
            <p className="mb-4">
              De acordo com a LGPD, você tem o direito de:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a exclusão de dados desnecessários</li>
              <li>Revogar seu consentimento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="mb-4">
              Utilizamos cookies para melhorar sua experiência em nosso site. 
              Você pode configurar seu navegador para recusar cookies, mas isso 
              pode afetar algumas funcionalidades do site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Alterações nesta Política</h2>
            <p className="mb-4">
              Podemos atualizar esta política de privacidade periodicamente. 
              Notificaremos sobre mudanças significativas através de nosso site 
              ou por email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contato</h2>
            <p className="mb-4">
              Se você tiver dúvidas sobre esta política de privacidade ou sobre 
              como tratamos seus dados pessoais, entre em contato conosco:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Email:</strong> privacidade@ecommerce.com</p>
              <p><strong>Telefone:</strong> (11) 1234-5678</p>
              <p><strong>Endereço:</strong> Rua das Flores, 123 - São Paulo, SP</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
