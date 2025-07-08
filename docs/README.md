# E-commerce System Documentation

## Visão Geral
Sistema completo de e-commerce desenvolvido com Next.js 15 (frontend) e Express.js (backend), utilizando MySQL como banco de dados.

## Arquitetura do Sistema

### Frontend (Next.js 15)
- **Framework**: Next.js 15 com App Router
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Estado**: Zustand
- **HTTP Client**: Axios
- **Componentes**: Modular e reutilizável

### Backend (Express.js)
- **Framework**: Express.js
- **Linguagem**: JavaScript (Node.js)
- **Banco de Dados**: MySQL 8.0+
- **Autenticação**: JWT
- **Segurança**: Helmet, CORS, Rate Limiting
- **Arquitetura**: MVC Pattern

### Banco de Dados
- **SGBD**: MySQL 8.0+
- **Estrutura**: Relacional normalizada
- **Backup**: Scripts SQL automatizados

## Funcionalidades Principais

### 🛍️ Catálogo de Produtos
- Listagem com paginação
- Busca e filtros
- Detalhes do produto
- Avaliações e comentários
- Imagens otimizadas

### 👤 Autenticação
- Registro de usuários
- Login/Logout
- Autenticação JWT
- Perfil do usuário
- Recuperação de senha

### 🛒 Carrinho de Compras
- Adicionar/remover produtos
- Atualizar quantidades
- Persistência no localStorage
- Cálculo automático de totais

### 💳 Checkout
- Dados de entrega
- Métodos de pagamento
- Confirmação do pedido
- Histórico de pedidos

### 👨‍💼 Admin
- Gerenciamento de produtos
- Gerenciamento de usuários
- Relatórios de vendas
- Configurações do sistema

## Segurança

### Implementações de Segurança
- **JWT**: Autenticação stateless
- **bcrypt**: Hash de senhas
- **Helmet**: Headers de segurança
- **CORS**: Controle de origem
- **Rate Limiting**: Proteção contra DDoS
- **SQL Injection**: Queries parametrizadas
- **XSS**: Sanitização de dados

## Performance

### Otimizações Frontend
- **Next.js Image**: Otimização automática de imagens
- **Code Splitting**: Carregamento sob demanda
- **Caching**: Cache de API e estático
- **Lazy Loading**: Componentes carregados sob demanda

### Otimizações Backend
- **Connection Pooling**: Pool de conexões MySQL
- **Query Optimization**: Queries otimizadas
- **Response Caching**: Cache de respostas
- **Compression**: Compressão gzip

## Estrutura de Pastas

```
E-commerce/
├── docs/                    # Documentação completa
├── backend/                 # API Express.js
│   ├── config/             # Configurações
│   ├── controllers/        # Controladores
│   ├── middleware/         # Middlewares
│   ├── routes/             # Rotas da API
│   └── utils/              # Utilitários
├── frontend/               # Aplicação Next.js
│   ├── src/
│   │   ├── app/           # Pages (App Router)
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── hooks/         # Custom hooks
│   │   ├── lib/           # Utilitários
│   │   ├── store/         # Estado global (Zustand)
│   │   └── types/         # Tipos TypeScript
│   └── public/            # Arquivos estáticos
├── database/              # Scripts SQL
└── scripts/               # Scripts de automação
```

## Instalação e Configuração

Ver [INSTALLATION.md](./INSTALLATION.md) para instruções detalhadas.

## Deployment

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instruções de deployment.

## Contribuição

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para guia de contribuição.

## Licença

MIT License
