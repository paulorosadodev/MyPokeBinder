# 0008. Identidade Visual Padronizada: Pokébola na Logo e no Favicon

Data: 2026-09-20

## Status

Aceito

## Contexto

Anteriormente, o sistema utilizava representações visuais divergentes para a Pokébola:

1. Um elemento CSS simples com gradiente linear no Header e na tela de Login (`/login`), com bordas arredondadas e divisória simplificada.
2. Um componente detalhado em SVG (`PokeballLoader`) com proporções fidedignas da Pokébola (metade superior vermelha `#ef4444`, metade inferior branca `#f8fafc`, contorno `#0f172a`, anel central e núcleo ciano `#38bdf8` com efeito de brilho `drop-shadow`).
3. Ausência de favicon customizado na aplicação, gerando o ícone padrão ou ausência de identidade na aba do navegador.

O usuário manifestou grande apreço pelo design do loader e solicitou que o mesmo visual fosse adotado na logo da aplicação e configurado como favicon do site.

## Decisão

1. **Criação do Componente Reutilizável `PokeballLogo`**:
    - Implementado em `src/components/ui/PokeballLogo.tsx` em SVG vetorial puro.
    - Utilização de caminhos (`path` com comandos de arco `A`) para os semicírculos superior e inferior, eliminando dependência de `clipPath` com IDs globais que poderiam sofrer colisão ou falhar em contextos isolados.
    - Suporte a tamanhos parametrizados (`xs`, `sm`, `md`, `lg`, `xl`), animação opcional do núcleo pulsante e efeito de glow em `drop-shadow`.

2. **Unificação da Logo no Header e Tela de Login**:
    - No `Header`, a logo textual agora acompanha `<PokeballLogo size="sm" animated />` com transição suave de escala no hover.
    - Na tela de login (`/login`), o card central destaca `<PokeballLogo size="lg" animated />` acima do título "MyPokeBinder".

3. **Favicon SVG e Compatibilidade Universal**:
    - Criado `src/app/icon.svg` reconhecido nativamente pelo Next.js App Router para servir automaticamente o favicon vetorial via `<link rel="icon">`.
    - Adicionado `public/favicon.svg` e `public/favicon.ico` para atendimento direto de requisições estáticas feitas por navegadores e crawlers.
    - Configurados os metadados de `icons` no `RootLayout` (`src/app/layout.tsx`) contemplando `icon`, `shortcut` e `apple-touch-icon`.

## Consequências

- **Positivas**:
    - Identidade visual 100% harmônica e coesa entre o cabeçalho, a tela de autenticação, os estados de carregamento e a aba do navegador.
    - Favicon em SVG vetorial de alta definição e nitidez perfeita em displays de qualquer densidade de pixels (Retina, 4K, mobile).
    - Componentização limpa, sem duplicação de marcação SVG e livre de dependências externas.
- **Negativas / Mitigações**:
    - Nenhuma contrapartida técnica negativa relevante.
