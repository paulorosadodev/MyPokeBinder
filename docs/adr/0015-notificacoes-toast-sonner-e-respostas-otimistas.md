# ADR 0015: Notificações Toast com Sonner e Respostas a Ações Otimistas

## Status

Aceito

## Contexto

A aplicação MyPokeBinder possui diversos estados de design otimista e interações de criação/edição em tempo real:

1. **Vinculação e Desvinculação do Binder**: Ao escolher uma carta no seletor ou removê-la, o binder reflete a alteração de forma imediata antes mesmo do retorno do backend via SWR.
2. **Alteração de Atributos Físicos na Edição**: O slider de idioma físico reage instantaneamente ao toque/clique do usuário (`optimisticLang`), além de alternâncias de variante Full Art e gerenciamento de cópias.
3. **Adição e Exclusão no Catálogo e Coleção**: A adição de novas cartas pelo catálogo e a exclusão definitiva de exemplares precisavam de respostas visuais confiáveis e expressivas para confirmar a conclusão com sucesso no servidor ou alertar e desfazer alterações em caso de erro na rede ou no banco de dados.

Anteriormente, não havia um sistema centralizado de notificações toast: erros de mutações otimistas eram silenciosos ou mantinham apenas mensagens em estado local temporário, sem confirmação tátil explícita para o usuário quando o backend concluía as alterações com sucesso.

## Decisão

1. **Adoção da Biblioteca Sonner**:
    - Integrada a biblioteca `sonner` via Bun (`bun add sonner`).
    - Criado o componente encapsulado `src/components/ui/AppToaster.tsx` montado no `RootLayout` (`src/app/layout.tsx`).

2. **Harmonização com o Design System**:
    - Estilização customizada em `src/app/globals.css` utilizando o tema escuro (`#12151d`, borda sutil translúcida, `backdrop-blur-md` e sombras suaves).
    - Semântica de cores refinada: verde esmeralda translúcido (`rgba(16, 185, 129, 0.35)`) para confirmações de sucesso, vermelho vibrante (`#ef4444`) para erros e ações destrutivas, e azul para informativos.
    - Ícones integrados do Lucide React (`CheckCircle2`, `AlertCircle`, `Info`).

3. **Garantia de Maior Z-Index e Responsividade Mobile**:
    - O container e os toasts foram configurados com `z-index: 99999 !important`, assegurando sobreposição irrestrita sobre qualquer elemento da interface (incluindo modais `z-50`, header `z-40` e bottom nav `z-40`).
    - No mobile, o posicionamento foi fixado no topo (`top-center` / margens seguras de 12px e largura total proporcional `calc(100vw - 24px)`), impedindo qualquer interferência com a navegação inferior fixa (`BottomNav`).

4. **Cobertura Integral de Criação, Edição e Desfazimento Otimista (Rollback)**:
    - **Vincular carta ao Binder** (`/`): toast de sucesso ao persistir; em caso de falha, reverte o cache SWR, restaura o card anterior no modal e exibe toast de erro.
    - **Remover carta do Binder** (`/`): toast de sucesso ao persistir; em caso de falha, desfaz a remoção e alerta o usuário.
    - **Adicionar carta no Catálogo** (`CardSearchModal`): toast de sucesso com nome da carta e edição; toast de erro em caso de duplicidade ou falha na API.
    - **Página de Edição (`/cards/[id]`)**:
        - _Full Art_: confirmação de alteração e toast de erro em falha.
        - _Idioma Físico_: resposta de confirmação; desfazimento transparente do slider otimista (`setOptimisticLang(null)`) com toast de erro caso a requisição falhe.
        - _Exibição no Binder_: confirmação de inclusão/remoção.
        - _Controle de Cópias (+/-)_: toast de confirmação para adição e remoção de cópias.
        - _Exclusão_: toast de confirmação ao remover todas as cópias da coleção.

## Consequências

- Sensação de resposta ágil e confiabilidade reforçada para o usuário em todas as operações de mutação de dados.
- Feedback visual padronizado, de alta estética e sem inconsistências de tema.
- Garantia de que nenhuma ação falha silenciosamente sem alertar o usuário e sem corromper a consistência do estado da interface.
