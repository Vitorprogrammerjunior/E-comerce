# Instruções para o GitHub Copilot

## Visão Geral do Projeto

Este é um projeto completo de e-commerce desenvolvido com:
- **Frontend**: Next.js 15 + TypeScript + TailwindCSS
- **Backend**: Express + Node.js + JWT

## Estrutura de Pastas

```
E-commerce/
├── frontend/           # Next.js App Router
│   ├── src/app/       # Páginas (App Router)
│   ├── src/components/ # Componentes reutilizáveis
│   ├── src/store/     # Zustand stores
│   ├── src/lib/       # Utilitários
│   └── src/types/     # Tipos TypeScript
└── backend/           # Express API
    ├── routes/        # Rotas da API
    ├── controllers/   # Controladores
    ├── middleware/    # Middlewares
    └── config/        # Configurações
```

## Padrões de Código

### Frontend
- Use App Router do Next.js 15
- Componentes em TypeScript com interface tipada
- Classes TailwindCSS para estilização
- Zustand para gerenciamento de estado
- Axios para requisições HTTP

### Backend
- Rotas RESTful com Express
- Controladores separados da lógica de rota
- Middleware de autenticação JWT
- Tratamento de erros consistente
- Validação de entrada

## Convenções de Nomenclatura

### Arquivos
- Componentes: `PascalCase.tsx` (ex: `ProductCard.tsx`)
- Páginas: `page.tsx` (App Router)
- Stores: `camelCaseStore.ts` (ex: `cartStore.ts`)
- Tipos: `index.ts` ou `types.ts`

### Variáveis e Funções
- `camelCase` para variáveis e funções
- `PascalCase` para componentes e interfaces
- `UPPER_CASE` para constantes

## Estrutura de Componentes

```tsx
interface ComponentProps {
  // Props tipadas
}

export default function Component({ prop }: ComponentProps) {
  // Hooks no topo
  // Estados
  // Funções
  // JSX
}
```

## Stores Zustand

```typescript
interface StoreState {
  // Estado
  // Ações
}

export const useStore = create<StoreState>((set, get) => ({
  // Implementação
}));
```

## Rotas da API

### Padrão de Resposta
```json
{
  "success": true,
  "data": {},
  "message": "Mensagem opcional"
}
```

### Estrutura de Controlador
```javascript
exports.controllerFunction = async (req, res) => {
  try {
    // Lógica
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

## Bibliotecas Principais

### Frontend
- `next` - Framework React
- `react` - Biblioteca de UI
- `typescript` - Tipagem
- `tailwindcss` - CSS utilitário
- `zustand` - Estado global
- `axios` - Cliente HTTP
- `@heroicons/react` - Ícones

### Backend
- `express` - Framework web
- `jsonwebtoken` - JWT
- `bcryptjs` - Hash de senhas
- `cors` - CORS
- `helmet` - Segurança
- `dotenv` - Variáveis de ambiente

## Comandos Úteis

### Desenvolvimento
```bash
# Iniciar backend
cd backend && npm run dev

# Iniciar frontend  
cd frontend && npm run dev

# Ambos (usar VS Code tasks)
Ctrl+Shift+P → Tasks: Run Task → "Start Both"
```

### Build
```bash
# Build frontend
cd frontend && npm run build

# Lint
cd frontend && npm run lint
```

## Funcionalidades Implementadas

- [x] Autenticação JWT
- [x] CRUD de produtos
- [x] Carrinho de compras
- [x] Checkout
- [x] Sistema de pedidos
- [x] Perfil do usuário
- [x] Páginas institucionais
- [x] Design responsivo

## Mock Data

O projeto usa dados mocados em:
- `backend/controllers/` - Dados dos controladores
- Mock de produtos, usuários, carrinho e pedidos

## Próximos Passos

1. **Banco de Dados**: Integrar PostgreSQL/MongoDB
2. **Pagamentos**: Stripe/PagSeguro
3. **Admin**: Painel administrativo
4. **Features**: Avaliações, wishlist, cupons

## Sugestões para o Copilot

Quando sugerir código:
1. Siga os padrões estabelecidos
2. Use TypeScript com tipagem adequada
3. Mantenha consistência com componentes existentes
4. Considere responsividade mobile
5. Implemente tratamento de erros
6. Use as bibliotecas já configuradas

## Contexto de Negócio

- E-commerce B2C
- Produtos físicos
- Entrega nacional (Brasil)
- Múltiplas formas de pagamento
- Sistema de avaliações (futuro)
- Programa de fidelidade (futuro)
