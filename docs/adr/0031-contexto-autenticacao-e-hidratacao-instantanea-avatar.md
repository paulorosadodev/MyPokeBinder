# ADR 0031: Contexto Global de Autenticação e Hidratação Instantânea do Usuário (Zero Flicker)

## Status
Aceito

## Contexto
Anteriormente, cada página autenticada da aplicação (`/configuracoes`, `/collection`, `/dashboard`, `/cards/[id]`, e o próprio componente de navegação `Header`) mantinha seu próprio estado local isolado (`useState(null)`) e invocava assincronamente `supabase.auth.getUser()` em seu respectivo `useEffect`.

Isso acarretava dois efeitos visuais indesejados (flicker e layout shifts):
1. **Ausência e Piscar do Nome/Foto na Barra Superior (`Header`)**:
   Em qualquer navegação ou entrada inicial, o estado local iniciava como `null`. A página passava `undefined` para o `Header`, fazendo com que o elemento de perfil não fosse renderizado. Centenas de milissegundos após a carga da página, a requisição do Supabase era concluída e o link de perfil surgia abruptamente ("piscava do nada").
2. **Exibição Temporária da Letra "U" na Página de Configurações**:
   Na página `/configuracoes`, enquanto o estado local de `user` era `null`, a lógica de exibição do avatar caía no fallback hardcoded `(user?.name?.[0] || user?.email?.[0] || "U")`, exibindo uma caixa com a letra "U" e os textos genéricos "Treinador Pokémon" antes de carregar a foto de perfil real.

## Decisão
1. **Criação do `AuthContext` (`src/lib/context/AuthContext.tsx`)**:
   - Centralização dos dados do perfil autenticado (`id`, `email`, `name`, `avatarUrl`) e do estado `isLoading`.
   - **Hidratação Instantânea no Cliente**: Leitura síncrona do cache em `localStorage` (`mypokebinder_user_profile`) no momento da montagem, garantindo renderização instantânea sem frames em branco.
   - **Hidratação SSR**: Suporte a `initialUser` obtido no servidor pelo `RootLayout`, garantindo que o primeiro HTML entregue ao navegador já contenha as informações corretas do usuário.
   - **Sincronização em Segundo Plano**: Escuta ativa de eventos de autenticação via `supabase.auth.onAuthStateChange` e revalidação assíncrona com `supabase.auth.getUser()`.
   - **Encerramento de Sessão**: Método `signOut` unificado que limpa cookies, cache em `localStorage` e redireciona com segurança para `/login`.

2. **Injeção de `initialUser` no `RootLayout` (`src/app/layout.tsx`)**:
   - `RootLayout` resolve o usuário autenticado no servidor via `@supabase/ssr` e envolve a aplicação com `<AuthProvider initialUser={initialUser}>`.

3. **Refatoração do `Header` e Páginas da Aplicação**:
   - `Header` consome diretamente o `useAuth()`. O `<Image>` do avatar passa a usar `priority` para pré-carregamento imediato e container com `bg-white/10`. Em carregamentos a frio sem cache, exibe um skeleton proporcional prevenindo mudanças de layout.
   - A página `/configuracoes` utiliza `useAuth()`. Caso o usuário não esteja em cache durante o carregamento inicial, exibe um skeleton pulsante e nunca mais a letra "U".
   - Páginas `/collection`, `/dashboard`, `/cards/[id]` e `BinderClientPage` tiveram seus estados e efeitos locais duplicados removidos, instanciando `<Header />` de forma limpa.

## Consequências
- Eliminação total do piscar de nome e foto na barra superior entre páginas e no carregamento inicial.
- Eliminação da letra "U" temporária na página de configurações; a foto do usuário é apresentada imediatamente.
- Redução drástica de chamadas assíncronas redundantes ao Supabase Auth, melhorando performance e reduzindo latência da aplicação.
