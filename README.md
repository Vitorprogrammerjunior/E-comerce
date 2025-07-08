# 🛍️ E-commerce System

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8+-orange.svg)](https://www.mysql.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Sistema completo de e-commerce moderno desenvolvido com Next.js 15 e Express.js, incluindo autenticação JWT, carrinho de compras, checkout, sistema de pedidos e painel administrativo.

## ✨ Funcionalidades

- 🛒 **Carrinho de Compras** - Adicionar, remover e atualizar produtos
- 🔐 **Autenticação JWT** - Sistema seguro de login/registro
- 💳 **Checkout Completo** - Processo de compra integrado
- � **Painel Admin** - Gerenciamento de produtos e pedidos
- 🔍 **Busca e Filtros** - Encontre produtos facilmente
- 📱 **Responsivo** - Interface adaptável para todos os dispositivos
- ⚡ **Performance** - Otimizado para velocidade e SEO
- 🔒 **Segurança** - Proteção contra ataques comuns

## 🚀 Stack Tecnológica

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utilitário
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado
- **[Axios](https://axios-http.com/)** - Cliente HTTP
- **[Framer Motion](https://www.framer.com/motion/)** - Animações

### Backend
- **[Express.js](https://expressjs.com/)** - Framework web para Node.js
- **[MySQL](https://www.mysql.com/)** - Banco de dados relacional
- **[JWT](https://jwt.io/)** - Autenticação stateless
- **[bcryptjs](https://www.npmjs.com/package/bcryptjs)** - Hash de senhas
- **[Helmet](https://helmetjs.github.io/)** - Segurança HTTP
- **[CORS](https://www.npmjs.com/package/cors)** - Cross-Origin Resource Sharing

## 📁 Estrutura do Projeto

```
E-commerce/
├── 📁 docs/                  # Documentação completa
│   ├── README.md            # Documentação principal
│   ├── API.md               # Documentação da API
│   ├── INSTALLATION.md      # Guia de instalação
│   ├── DEPLOYMENT.md        # Guia de deployment
│   └── CONTRIBUTING.md      # Guia de contribuição
├── 📁 frontend/             # Aplicação Next.js
│   ├── 📁 src/
│   │   ├── 📁 app/         # Pages e layouts (App Router)
│   │   │   ├── cart/       # Página do carrinho
│   │   │   ├── checkout/   # Página de checkout
│   │   │   ├── products/   # Listagem de produtos
│   │   │   ├── profile/    # Perfil do usuário
│   │   │   └── ...         # Outras páginas
│   │   ├── 📁 components/  # Componentes reutilizáveis
│   │   │   ├── cart/       # Componentes do carrinho
│   │   │   ├── layout/     # Header, Footer, etc.
│   │   │   ├── product/    # Componentes de produto
│   │   │   └── ui/         # Componentes de interface
│   │   ├── 📁 hooks/       # Custom hooks
│   │   ├── 📁 lib/         # Utilitários e configurações
│   │   ├── 📁 store/       # Estado global (Zustand)
│   │   └── 📁 types/       # Tipos TypeScript
│   └── 📁 public/          # Arquivos estáticos
├── 📁 backend/              # API Express.js
│   ├── 📁 config/          # Configurações
│   ├── 📁 controllers/     # Controladores
│   ├── 📁 middleware/      # Middlewares
│   ├── 📁 routes/          # Rotas da API
│   └── 📁 utils/           # Utilitários
├── 📁 database/            # Scripts SQL
│   ├── 01-schema.sql       # Estrutura do banco
│   ├── 02-seed-data.sql    # Dados de exemplo
│   └── ...                 # Outros scripts
├── 📁 scripts/             # Scripts de automação
│   ├── setup.js            # Configuração inicial
│   ├── dev.js              # Ambiente de desenvolvimento
│   ├── build.js            # Build de produção
│   └── ...                 # Outros scripts
└── 📄 package.json         # Configuração do projeto
## ⚡ Início Rápido

### 1. Configuração Inicial
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/ecommerce-system.git
cd ecommerce-system

# Configuração automática
npm run setup
```

### 2. Desenvolvimento
```bash
# Iniciar em modo de desenvolvimento
npm run dev

# Ou iniciar separadamente
npm run dev:backend  # Backend na porta 4000
npm run dev:frontend # Frontend na porta 3000
```

### 3. Produção
```bash
# Build de produção
npm run build

# Iniciar em produção
npm start
```

### 4. Acessar a Aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Documentação**: http://localhost:3000/docs

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run setup` | Configuração inicial do projeto |
| `npm run dev` | Inicia desenvolvimento (backend + frontend) |
| `npm run build` | Build de produção |
| `npm run test` | Executa todos os testes |
| `npm run clean` | Limpa arquivos temporários |
| `npm run lint` | Executa linting |
| `npm run format` | Formata código com Prettier |
| `npm run type-check` | Verifica tipos TypeScript |

## 🔧 Configuração

### Variáveis de Ambiente

#### Backend (.env)
```env
# Server
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=ecommerce

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro
JWT_EXPIRES_IN=7d
```

#### Frontend (.env.local)
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:4000

# App
NEXT_PUBLIC_APP_NAME=E-commerce
NEXT_PUBLIC_APP_VERSION=1.0.0
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

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes do backend
npm run test:backend

# Testes do frontend
npm run test:frontend

# Testes end-to-end
npm run test:e2e

# Coverage
npm run test:coverage
```

## 🐳 Docker

```bash
# Build das imagens
npm run docker:build

# Iniciar containers
npm run docker:up

# Parar containers
npm run docker:down

# Ver logs
npm run docker:logs
```

## 📚 Documentação

- **[Documentação Completa](./docs/README.md)** - Visão geral do sistema
- **[API Reference](./docs/API.md)** - Documentação da API REST
- **[Guia de Instalação](./docs/INSTALLATION.md)** - Instruções detalhadas
- **[Guia de Deploy](./docs/DEPLOYMENT.md)** - Deploy para produção
- **[Guia de Contribuição](./docs/CONTRIBUTING.md)** - Como contribuir

## 🚀 Deploy

### Vercel (Recomendado para Frontend)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Railway (Recomendado para Backend)
```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Deploy
railway deploy
```

### Docker
```bash
# Build e deploy com Docker
docker-compose up --build -d
```

## 🔒 Segurança

- ✅ **Autenticação JWT** com refresh tokens
- ✅ **Bcrypt** para hash de senhas
- ✅ **Helmet** para headers de segurança
- ✅ **Rate Limiting** contra DDoS
- ✅ **CORS** configurado adequadamente
- ✅ **SQL Injection** prevenido com queries parametrizadas
- ✅ **XSS** prevenido com sanitização
- ✅ **CSRF** tokens implementados

## 📊 Monitoramento

- **Logs estruturados** com Winston
- **Health checks** automatizados
- **Métricas de performance** com PM2
- **Error tracking** com Sentry (opcional)
- **Uptime monitoring** com Uptimerobot (opcional)

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Veja o [Guia de Contribuição](./docs/CONTRIBUTING.md) para mais detalhes.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Vitor Vagmaker** - *Desenvolvimento inicial* - [@vitorvagmaker](https://github.com/vitorvagmaker)

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) pela excelente documentação
- [Express.js](https://expressjs.com/) pela simplicidade
- [TailwindCSS](https://tailwindcss.com/) pelo design system
- [Vercel](https://vercel.com/) pela plataforma de deploy
- Comunidade open source em geral

## 📞 Suporte

Se você tiver alguma dúvida ou problema, sinta-se à vontade para:

- Abrir uma [Issue](https://github.com/seu-usuario/ecommerce-system/issues)
- Entrar em contato via [email](mailto:contato@seusite.com)
- Consultar a [documentação](./docs/README.md)

---

<div align="center">
  <p>Feito com ❤️ por <a href="https://github.com/vitorvagmaker">Vitor Vagmaker</a></p>
  <p>⭐ Não se esqueça de dar uma star no projeto!</p>
</div>
