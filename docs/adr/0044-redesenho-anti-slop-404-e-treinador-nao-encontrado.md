# ADR 0044: Redesenho Anti-Slop da Página 404 e Páginas Temáticas de Treinador e Coleção Não Encontrados

Data: 2026-09-25

## Status

Aceito

## Contexto

A página 404 anterior apresentava traços recorrentes de interfaces geradas por IA ("AI slop") e elementos supérfluos, como botão sonoro de confusão do Psyduck e badges redundantes de erro no cabeçalho, além de animação pulsante na pílula de rota.
Adicionalmente, as rotas públicas de perfil e coleção inexistentes compartilhavam o mesmo Pokémon (Abra) com badge descritiva, sofriam com constantes recarregamentos e piscares de loading causados pela revalidação padrão do SWR ao alternar abas (`Alt+Tab`) ou clicar na janela, e não possuíam o cabeçalho e rodapé padronizados da página 404.

## Decisão

1. **Página de Erro 404 (`src/app/not-found.tsx`)**:
   - Removido o recurso e botão de áudio procedural do Psyduck ("Ouvir o Psyduck"), mantendo a ilustração do Psyduck (#054) com escala suave no hover.
   - Removida a badge redundante "Erro 404" do cabeçalho, mantendo apenas a identidade visual com o logo e link para a home.
   - Substituída a bola pulsante na badge "Rota 404 · Não Encontrada" pelo ícone estático e fixo `Compass`.
   - Botão de ação primário estilizado na cor âmbar correspondente ao Psyduck, independente do tema do usuário.

2. **Páginas de Treinador e Coleção Não Encontrados (`src/components/profile/TrainerNotFound.tsx`)**:
   - Utilização de Pokémon distintos e canônicos para cada contexto:
     - **Perfil de Treinador**: Pokémon Abra (#063) com a lore clássica de teleporte ("Este treinador parece ter usado Teleporte"), badge âmbar, realce do `@username` e botão principal em tom dourado/âmbar correspondente (`bg-amber-500 hover:bg-amber-400 text-slate-950`).
     - **Coleção Pública**: Pokémon Snorlax (#143) com a lore temática de bloqueio ("Um Snorlax adormeceu sobre esta coleção"), dialogando com a Poké Flauta do rodapé, com badge, `@username` e botão principal em tom azul-petróleo/teal correspondente (`bg-teal-600 hover:bg-teal-500 text-white`).
   - Removida a badge inferior solta "Nº 063 · Abra usou Teleporte".
   - Adoção estrita da estrutura de layout, cabeçalho e rodapé da página 404 em ambas as telas de erro, garantindo identidade visual homogênea.
   - **Estabilidade contra Flickers de Loading**: Desativação de `revalidateOnFocus`, `revalidateOnReconnect` e `shouldRetryOnError` nas consultas do SWR (`TrainerProfileView` e `PublicCollectionView`), além de priorização da checagem de erros antes do estado de loading, impedindo que a troca de janelas ou cliques disparem spinners de carregamento desnecessários.

## Consequências

- Eliminação de ruídos sonoros e elementos visuais redundantes na página 404.
- Diferenciação temática clara e charmosa entre treinador não localizado e coleção não localizada.
- Eliminação definitiva de flickering e carregamentos espúrios ao navegar ou alternar foco entre abas.
- Cabeçalho e rodapé unificados entre todas as rotas de recurso não encontrado.
- Suíte de testes atualizada e validada com 100% de sucesso no Bun.
