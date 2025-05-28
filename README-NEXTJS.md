# Migration steps from React to Next.js 

## Environment Setup

```bash
# get repository
git clone https://github.com/Kotaro-coder/nextjs-readme.git
cd <repo>

# create-next-app in frontend-next
npx create-next-app@latest

# interactive selection(record your selections)
|   Questions                                       |  Answer |
|---------------------------------------------------|---------|
| What is your project named?                      | frontend-next |
| Would you like to use TypeScript?                | Yes     |
| Would you like to use ESLint?                    | Yes     |
| Would you like to use Tailwind CSS?              | Yes     |
| Would you like to use src/directory?             | Yes     |
| Would you like to use App Router?                | Yes     |
| Would you like to customize the import alias?    | No      |

cp -R frontend/src/components frontend-next/src/components
cp -R frontend/src/hooks       frontend-next/src/hooks
cp -R frontend/src/{queries,mutations,types,assets} frontend-next/src/

# UI & CSS-in-JS
npm install @mui/material @emotion/react @emotion/server @emotion/cache
# GraphQL client
npm install @apollo/client graphql
# Apollo integration for Next.js（App Router support）
npm install @apollo/client-integration-nextjs

npm install -D \
  @graphql-codegen/cli \
  @graphql-codegen/typescript \
  @graphql-codegen/typescript-operations \
  @graphql-codegen/typescript-react-apollo\
  @graphql-codegen/client-preset \

## Environment Variables

# frontend-next/.env.local
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3000/graphql

## GraphQL Code Generator

npx graphql-codegen init
# interactive selection(record your selections)
| Question                                             | Answer                                      |
|------------------------------------------------------|---------------------------------------------|
| What type of application are you building?           | React                                       |
| Where is your schema?                                | http://localhost:3000/graphql               |
| Where are your operations and fragments?             | src/**/*.gql                                |
| Where to write the output                            | src/__generated__/                          |
| Do you want to generate an introspection file?       | No                                          |
| How to name the config file?                         | codegen.ts                                  |
| What script in package.json?                         | codegen                                     |
```

## setting Apollo Client 

```bash
# create lib directory
mkdir -p frontend-next/src/lib
```
## frontend-next/src/lib/apolloClient.ts
```ts

import { ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/client-integration-nextjs';
import { setContext } from '@apollo/client/link/context';

export function makeApolloClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    fetchOptions: { cache: 'no-store' },
  });

  const authLink = setContext((_, { headers }) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return new NextSSRApolloClient({
    cache: typeof window === 'undefined' ? new NextSSRInMemoryCache() : new InMemoryCache(),
    link: ApolloLink.from([
      typeof window === 'undefined' ? new SSRMultipartLink({ stripDefer: true }) : ApolloLink.empty(),
      authLink.concat(httpLink),
    ]),
  });
}
```
## frontend-next/src/app/layout.tsx
```ts
'use client';
import { ApolloProvider } from "@apollo/client";
import { makeApolloClient } from "@/lib/apolloClient";
import './globals.css';

const client = makeApolloClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
```



##  Technology Stacks

### Frontend
- **Next.js 14(App Router)**
- **TypeScript**
- **MUI (Material UI) + Emotion**
- **TailWind CSS**

### GraphQL Client
- **Apollo Client**

### Backend
- **NestJS** (v10.x)
- **GraphQL (code-first)**：API Design

### Auth
- **Passport.js**：JWT Certification

### Database / ORM
- **PostgreSQL** (v15)：Relational Database Management System
- **Prisma** (v6)：DB Schema Management & Migration

### Infrastructure
- **Docker / Docker Compose**：For DB Startup