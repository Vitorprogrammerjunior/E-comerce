# Guia de Contribuição

## Bem-vindo!

Obrigado pelo interesse em contribuir com o projeto E-commerce! Este guia ajudará você a entender como contribuir de forma efetiva.

## Código de Conduta

### Nossos Padrões
- Use linguagem acolhedora e inclusiva
- Seja respeitoso com diferentes pontos de vista
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade

## Como Contribuir

### 1. Configuração do Ambiente

```bash
# Fork do repositório
git clone https://github.com/seu-usuario/E-commerce.git
cd E-commerce

# Adicionar upstream
git remote add upstream https://github.com/original/E-commerce.git

# Instalar dependências
npm run install:all
```

### 2. Fluxo de Desenvolvimento

#### Criar uma branch
```bash
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

#### Padrões de nomenclatura
- `feature/`: Novas funcionalidades
- `fix/`: Correções de bugs
- `docs/`: Documentação
- `refactor/`: Refatoração de código
- `test/`: Testes
- `chore/`: Tarefas de manutenção

### 3. Padrões de Código

#### JavaScript/TypeScript
```javascript
// Use camelCase para variáveis e funções
const userName = 'João';
const getUserData = () => {};

// Use PascalCase para classes e componentes
class UserService {}
const UserProfile = () => {};

// Use UPPER_SNAKE_CASE para constantes
const API_BASE_URL = 'http://localhost:4000';
```

#### Estrutura de Arquivos
```
src/
├── components/
│   ├── common/          # Componentes reutilizáveis
│   ├── forms/           # Formulários
│   └── layout/          # Layout components
├── hooks/               # Custom hooks
├── services/            # Serviços de API
├── utils/               # Utilitários
└── types/               # Tipos TypeScript
```

### 4. Mensagens de Commit

Use o padrão Conventional Commits:

```bash
# Formato
<type>(<scope>): <description>

# Exemplos
feat(auth): add login functionality
fix(cart): resolve quantity update issue
docs(api): update authentication endpoints
refactor(components): improve code readability
test(auth): add unit tests for login
```

#### Tipos de commit
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação (sem mudança de lógica)
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas de manutenção

### 5. Testes

#### Executar testes
```bash
# Todos os testes
npm test

# Testes específicos
npm test -- --testNamePattern="Auth"

# Testes com coverage
npm run test:coverage
```

#### Escrever testes
```javascript
// Exemplo de teste unitário
describe('UserService', () => {
  it('should authenticate user with valid credentials', async () => {
    const user = await UserService.login('user@test.com', 'password');
    expect(user).toBeDefined();
    expect(user.email).toBe('user@test.com');
  });

  it('should throw error with invalid credentials', async () => {
    await expect(
      UserService.login('invalid@test.com', 'wrong')
    ).rejects.toThrow('Invalid credentials');
  });
});
```

### 6. Documentação

#### Documentar código
```javascript
/**
 * Autentica um usuário
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<User>} Dados do usuário autenticado
 * @throws {Error} Erro de autenticação
 */
async function authenticateUser(email, password) {
  // implementação
}
```

#### Atualizar documentação
- Atualize o README.md se necessário
- Adicione exemplos de uso
- Documente mudanças na API

## Processo de Review

### 1. Criar Pull Request

#### Checklist antes de criar PR
- [ ] Código testado localmente
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Seguindo padrões do projeto
- [ ] Sem conflitos com main

#### Template de PR
```markdown
## Descrição
Breve descrição das mudanças

## Tipo de mudança
- [ ] Bug fix
- [ ] Nova funcionalidade
- [ ] Breaking change
- [ ] Documentação

## Como testar
1. Passo 1
2. Passo 2
3. Verificar resultado esperado

## Checklist
- [ ] Testes passando
- [ ] Documentação atualizada
- [ ] Código revisado
```

### 2. Processo de Review

#### Para revisores
- Verifique funcionalidade
- Teste localmente
- Revise qualidade do código
- Confirme documentação
- Aprove ou solicite mudanças

#### Para autores
- Responda aos comentários
- Implemente mudanças solicitadas
- Resolva conflitos
- Notifique quando pronto

## Estrutura do Projeto

### Backend (Express.js)
```
backend/
├── controllers/         # Lógica de negócio
├── middleware/         # Middlewares
├── routes/             # Definição de rotas
├── services/           # Serviços
├── utils/              # Utilitários
├── config/             # Configurações
└── tests/              # Testes
```

### Frontend (Next.js)
```
frontend/src/
├── app/                # Pages (App Router)
├── components/         # Componentes React
├── hooks/              # Custom hooks
├── services/           # Serviços de API
├── stores/             # Estado global
├── utils/              # Utilitários
├── types/              # Tipos TypeScript
└── __tests__/          # Testes
```

## Ferramentas de Desenvolvimento

### ESLint
```bash
# Verificar código
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

### Prettier
```bash
# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

### TypeScript
```bash
# Verificar tipos
npm run type-check

# Build
npm run build
```

## Debugging

### Backend
```javascript
// Usar debugger
const debug = require('debug')('app:auth');
debug('User authenticated:', user.id);

// Logs estruturados
console.log('[AUTH]', 'User login attempt:', { email, timestamp: new Date() });
```

### Frontend
```javascript
// React DevTools
// Browser DevTools
// Next.js debugging
const debug = process.env.NODE_ENV === 'development';
if (debug) console.log('Debug info:', data);
```

## Deployment

### Staging
```bash
# Criar branch de staging
git checkout -b staging/v1.0.0

# Deploy para staging
npm run deploy:staging
```

### Production
```bash
# Criar release
git checkout main
git tag v1.0.0
npm run deploy:production
```

## Recursos Úteis

### Documentação
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

### Ferramentas
- [VS Code Extensions](./vscode-extensions.md)
- [Postman Collection](./postman-collection.json)
- [Database Schema](./database-schema.md)

## Ajuda e Suporte

### Canais de Comunicação
- Issues do GitHub
- Discussions
- Email: suporte@projeto.com

### Dúvidas Frequentes
- Como configurar o ambiente de desenvolvimento?
- Como executar testes?
- Como fazer deploy?

## Reconhecimento

Todos os contribuidores são reconhecidos no arquivo [CONTRIBUTORS.md](./CONTRIBUTORS.md).

---

Obrigado por contribuir! 🎉
