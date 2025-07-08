# Documentação da API

## Base URL
```
Development: http://localhost:4000
Production: https://your-domain.com/api
```

## Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Inclua o token no header:

```
Authorization: Bearer <jwt-token>
```

## Endpoints

### 🔐 Autenticação

#### POST /auth/register
Registra um novo usuário.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "password123",
  "phone": "11999999999"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999999999",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /auth/login
Autentica um usuário.

**Request Body:**
```json
{
  "email": "joao@email.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999999999"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET /auth/me
Retorna dados do usuário autenticado.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999999999",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

### 🛍️ Produtos

#### GET /products
Lista todos os produtos com paginação.

**Query Parameters:**
- `page` (opcional): Página (default: 1)
- `limit` (opcional): Limite por página (default: 10)
- `category` (opcional): Filtrar por categoria
- `search` (opcional): Buscar por nome

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "id": 1,
      "name": "Produto Exemplo",
      "description": "Descrição do produto",
      "price": 99.99,
      "category_id": 1,
      "category_name": "Eletrônicos",
      "image_url": "https://example.com/image.jpg",
      "stock": 50,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

#### GET /products/:id
Retorna detalhes de um produto específico.

**Response:**
```json
{
  "success": true,
  "product": {
    "id": 1,
    "name": "Produto Exemplo",
    "description": "Descrição detalhada do produto",
    "price": 99.99,
    "category_id": 1,
    "category_name": "Eletrônicos",
    "image_url": "https://example.com/image.jpg",
    "stock": 50,
    "created_at": "2024-01-01T00:00:00.000Z",
    "reviews": [
      {
        "id": 1,
        "user_name": "Cliente",
        "rating": 5,
        "comment": "Excelente produto!",
        "created_at": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### 🛒 Carrinho

#### GET /cart
Retorna itens do carrinho do usuário.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "cart": [
    {
      "id": 1,
      "product_id": 1,
      "product_name": "Produto Exemplo",
      "product_price": 99.99,
      "product_image": "https://example.com/image.jpg",
      "quantity": 2,
      "subtotal": 199.98
    }
  ],
  "total": 199.98
}
```

#### POST /cart/add
Adiciona produto ao carrinho.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "product_id": 1,
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Produto adicionado ao carrinho"
}
```

#### PUT /cart/update
Atualiza quantidade de produto no carrinho.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "product_id": 1,
  "quantity": 3
}
```

**Response:**
```json
{
  "success": true,
  "message": "Carrinho atualizado"
}
```

#### DELETE /cart/remove/:productId
Remove produto do carrinho.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Produto removido do carrinho"
}
```

### 📦 Pedidos

#### GET /orders
Lista pedidos do usuário.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "id": 1,
      "status": "pending",
      "total": 199.98,
      "created_at": "2024-01-01T00:00:00.000Z",
      "items": [
        {
          "product_name": "Produto Exemplo",
          "quantity": 2,
          "price": 99.99,
          "subtotal": 199.98
        }
      ]
    }
  ]
}
```

#### GET /orders/:id
Retorna detalhes de um pedido específico.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": 1,
    "status": "pending",
    "total": 199.98,
    "shipping_address": "Endereço de entrega",
    "created_at": "2024-01-01T00:00:00.000Z",
    "items": [
      {
        "product_name": "Produto Exemplo",
        "quantity": 2,
        "price": 99.99,
        "subtotal": 199.98
      }
    ]
  }
}
```

#### POST /orders
Cria um novo pedido.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "shipping_address": "Rua Exemplo, 123",
  "payment_method": "credit_card",
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "price": 99.99
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pedido criado com sucesso",
  "order_id": 1
}
```

## Códigos de Status HTTP

- `200` - Sucesso
- `201` - Criado
- `400` - Requisição inválida
- `401` - Não autorizado
- `403` - Proibido
- `404` - Não encontrado
- `500` - Erro interno do servidor

## Tratamento de Erros

Todas as respostas de erro seguem o formato:

```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Detalhes técnicos do erro"
}
```

## Rate Limiting

A API implementa rate limiting:
- 100 requisições por IP a cada 15 minutos
- Headers de resposta incluem informações sobre o limite

## Versionamento

A API segue versionamento semântico:
- Versão atual: v1
- Mudanças breaking serão versionadas
