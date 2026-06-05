# Attus Front-end - Desafio Técnico

Sistema de gerenciamento de pedidos e clientes com interface moderna e responsiva.

**Stack:** Next.js 16 · React 19 · TypeScript · PrimeReact · React Query · Zod · React Hook Form

---

## 📋 Pré-requisitos

- **Node.js** v18+
- **npm** v9+ (instalado com Node.js)
- **Git**

---

## 🚀 Instruções de Execução

### BackEnd disponível em
[Attus BackEnd](https://github.com/wesleygomesc6/attus-back-end)

### 1. Clonar o Repositório

```bash
git clone https://github.com/wesleygomesc6/attus-front-end
cd attus-front-end
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Criar arquivo `.env` na raiz do projeto com base em `.env.example`:

```bash
cp .env.example .env
```

Editar `.env` com as configurações do seu ambiente:

```env
NEXT_PUBLIC_API_URL="http://localhost:8080"
```

### 4. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em [http://localhost:3000](http://localhost:3000)

---

## 📁 Estrutura do Projeto

```
.
├── app/                    # App Router do Next.js (page.tsx, layout.tsx, etc)
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── AppLayout.tsx
│   │   ├── AppTopbar.tsx
│   │   ├── AppSidebar.tsx
│   │   ├── DashboardCard.tsx
│   │   └── StatusPedido.tsx
│   ├── pedidos/           # Página de pedidos
│   ├── vender/            # Página de vendas
│   └── page.tsx           # Dashboard principal
├── api/                    # Clientes HTTP para APIs externas
│   ├── clientes/          # Endpoints de clientes
│   └── pedidos/           # Endpoints de pedidos (CRUD)
├── context/               # Context API do React
├── lib/                   # Funções utilitárias e helpers
├── styles/                # Estilos globais
├── types/                 # Tipos TypeScript compartilhados
├── public/                # Arquivos estáticos (imagens, fonts, etc)
├── .env.example           # Template de variáveis de ambiente
├── next.config.ts         # Configuração do Next.js
├── tsconfig.json          # Configuração do TypeScript
├── eslint.config.mjs      # Regras de linting
└── package.json           # Dependências e scripts
```

---

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento em [http://localhost:3000](http://localhost:3000) |
| `npm run build` | Compila o projeto para produção |
| `npm start` | Inicia servidor em modo produção (requer `npm run build` primeiro) |
| `npm run lint` | Executa ESLint para verificar qualidade do código |

---
