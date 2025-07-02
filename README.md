# E-commerce Completo - Next.js + Express

Um projeto completo de e-commerce desenvolvido com Next.js (frontend) e Express (backend), incluindo autenticação JWT, carrinho de compras, checkout, sistema de pedidos e muito mais.

## 🚀 Tecnologias Utilizadas

### Frontend (Next.js)
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Framework CSS utilitário
- **Zustand** - Gerenciamento de estado
- **Axios** - Cliente HTTP
- **Heroicons** - Ícones
- **Next/Image** - Otimização de imagens

### Backend (Express)
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL** - Banco de dados relacional
- **mysql2** - Driver MySQL para Node.js
- **JWT** - Autenticação
- **bcryptjs** - Hash de senhas
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Segurança HTTP
- **Rate Limiting** - Limitação de taxa
- **Dotenv** - Variáveis de ambiente

## 📁 Estrutura do Projeto

```
E-commerce/
├── frontend/                 # Aplicação Next.js
│   ├── src/
│   │   ├── app/             # Pages e layouts (App Router)
│   │   │   ├── cart/        # Página do carrinho
│   │   │   ├── checkout/    # Página de checkout
│   │   │   ├── help/        # Central de ajuda
│   │   │   ├── login/       # Página de login
│   │   │   ├── privacy/     # Política de privacidade
│   │   │   ├── products/    # Listagem de produtos
│   │   │   ├── product/     # Detalhes do produto
│   │   │   ├── profile/     # Perfil do usuário
│   │   │   ├── register/    # Página de registro
│   │   │   ├── returns/     # Trocas e devoluções
│   │   │   ├── shipping/    # Informações de entrega
│   │   │   ├── terms/       # Termos de uso
│   │   │   └── order-confirmation/ # Confirmação de pedido
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── cart/        # Componentes do carrinho
│   │   │   ├── layout/      # Header, Footer
│   │   │   ├── product/     # Componentes de produto
│   │   │   └── ui/          # Componentes de interface
│   │   ├── hooks/           # Hooks customizados
│   │   ├── lib/             # Utilitários e configurações
│   │   ├── store/           # Stores Zustand
│   │   └── types/           # Tipos TypeScript
│   ├── public/              # Arquivos estáticos
│   └── ...
├── backend/                 # API Express
│   ├── routes/              # Rotas da API
│   ├── controllers/         # Controladores
│   ├── middleware/          # Middlewares
│   ├── config/              # Configurações
│   └── ...
└── README.md
```

## 🔧 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- MySQL 8.0+

### 1. Clone o repositório
```bash
git clone <repository-url>
cd E-commerce
```

### 2. Configuração do Backend
```bash
cd backend
npm install
```

Crie o arquivo `.env` baseado no `.env.example`:
```env
PORT=4000
FRONTEND_URL=http://localhost:3000
JWT_SECRET=seu_jwt_secret_aqui
NODE_ENV=development

# Database Configuration - MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=ecommerce
```

### 3. Configuração do Banco de Dados
Crie o banco de dados MySQL:
```sql
CREATE DATABASE ecommerce;
```

Execute os scripts SQL:
```bash
# Executar o schema
mysql -u root -p ecommerce < database/schema.sql

# Executar os dados de teste (opcional)
mysql -u root -p ecommerce < database/seed-data.sql
```

### 4. Configuração do Frontend
```bash
cd ../frontend
npm install
```

Crie o arquivo `.env.local` baseado no `.env.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## 🚀 Executando o Projeto

### Iniciar o Backend
```bash
cd backend
npm run dev
```
O servidor estará rodando em `http://localhost:4000`

### Iniciar o Frontend
```bash
cd frontend
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`

## 📊 Funcionalidades Implementadas

### ✅ Autenticação e Usuários
- [x] Registro de usuários
- [x] Login/Logout
- [x] Autenticação JWT
- [x] Perfil do usuário
- [x] Proteção de rotas

### ✅ Produtos
- [x] Listagem de produtos
- [x] Detalhes do produto
- [x] Busca e filtros
- [x] Categorias
- [x] Produtos em destaque
- [x] Paginação

### ✅ Carrinho de Compras
- [x] Adicionar/remover produtos
- [x] Alterar quantidades
- [x] Persistência local
- [x] Cálculo de totais

### ✅ Checkout e Pedidos
- [x] Formulário de checkout
- [x] Informações de entrega
- [x] Métodos de pagamento
- [x] Criação de pedidos
- [x] Confirmação de pedido
- [x] Histórico de pedidos

### ✅ Páginas Institucionais
- [x] Central de ajuda/FAQ
- [x] Política de privacidade
- [x] Termos de uso
- [x] Informações de entrega
- [x] Trocas e devoluções
- [x] Página 404 personalizada

### ✅ Interface e UX
- [x] Design responsivo
- [x] Componentes reutilizáveis
- [x] Loading states
- [x] Tratamento de erros
- [x] Notificações
- [x] SEO básico

## 🔗 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Dados do usuário logado

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Detalhes do produto
- `GET /api/products/featured` - Produtos em destaque

### Carrinho
- `GET /api/cart` - Obter carrinho
- `POST /api/cart/add` - Adicionar item
- `PUT /api/cart/update` - Atualizar item
- `DELETE /api/cart/remove` - Remover item
- `DELETE /api/cart/clear` - Limpar carrinho

### Pedidos
- `GET /api/orders` - Listar pedidos do usuário
- `POST /api/orders` - Criar pedido
- `GET /api/orders/:id` - Detalhes do pedido

### Usuários
- `GET /api/users/profile` - Perfil do usuário
- `PUT /api/users/profile` - Atualizar perfil

## 🛡️ Segurança

- **CORS** configurado para o frontend
- **Helmet** para headers de segurança
- **Rate Limiting** para prevenção de ataques
- **JWT** para autenticação segura
- **bcryptjs** para hash de senhas
- **Validação** de entrada em todas as rotas

## 📱 Responsividade

O projeto é totalmente responsivo e funciona em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🎨 Componentes Principais

### Layout
- **Header** - Navegação, logo, carrinho, perfil
- **Footer** - Links úteis, redes sociais, informações

### Produto
- **ProductCard** - Card de produto na listagem
- **ProductDetail** - Página de detalhes do produto

### Carrinho
- **CartItem** - Item individual do carrinho
- **CartSummary** - Resumo do carrinho

### UI
- **Button** - Botão reutilizável com variantes
- **Input** - Campo de input reutilizável
- **Loading** - Estados de carregamento

## 🔄 Estado da Aplicação

### Stores Zustand
- **authStore** - Estado de autenticação
- **cartStore** - Estado do carrinho

### Hooks Customizados
- **useFetch** - Hook para requisições HTTP

## 🚀 Deploy

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway/Heroku)
```bash
cd backend
# Configurar variáveis de ambiente
# Fazer deploy
```

## 🔮 Próximos Passos

### Banco de Dados
- [x] Integração com MySQL
- [x] Schema e relacionamentos
- [x] Dados de exemplo (seed)

### Pagamentos
- [ ] Integração com Stripe
- [ ] Integração com PagSeguro/Mercado Pago
- [ ] Processamento de pagamentos reais

### Funcionalidades Avançadas
- [ ] Sistema de avaliações
- [ ] Wishlist
- [ ] Cupons de desconto
- [ ] Sistema de notificações
- [ ] Chat de suporte

### Admin Dashboard
- [ ] Painel administrativo
- [ ] Gestão de produtos
- [ ] Relatórios e analytics

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Se você tiver dúvidas ou sugestões sobre o projeto, entre em contato!

---

**Desenvolvido com ❤️ usando Next.js e Express**
