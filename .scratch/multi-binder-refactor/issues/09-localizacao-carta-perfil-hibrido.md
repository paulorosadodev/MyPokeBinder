# 09: Localização na Página da Carta (/cards/[id]) e Perfil Público Híbrido

**What to build:** A página de detalhes da carta física (`/cards/[id]`) passa a exibir em qual binder e página/slot o exemplar está alocado (ou se está guardada na coleção), oferecendo controles para alocar, desalocar ou transferir a carta com facilidade. O perfil público do treinador (`/perfil/[username]`) adota a arquitetura híbrida: no topo, exibe os KPIs e as Estatísticas do binder marcado como destaque pelo dono (`is_featured`), e logo abaixo exibe a vitrine com os demais binders públicos do usuário.

**Blocked by:** 06: Três Tipos de Slots e Interação de Alocação, 07: Painel Retrátil de Estatísticas do Binder

**Status:** ready-for-agent

- [ ] A página `/cards/[id]` exibe o status de localização do exemplar físico: se estiver alocada, exibe "No binder: [Nome] (Página P, Slot S)" com botão para remover do binder ou abrir o fichário; se estiver guardada, exibe o botão para alocar em um binder.
- [ ] A ação de alocar pela página da carta exibe um seletor com os binders do usuário e seus slots compatíveis disponíveis.
- [ ] O perfil público do treinador (`/perfil/[username]`) identifica o binder marcado como destaque (`is_featured`) e renderiza suas Estatísticas e progresso no topo da página.
- [ ] Visitantes podem visualizar o mapa de slots e progresso do binder em destaque em modo somente leitura.
- [ ] Abaixo do binder em destaque, o perfil exibe a vitrine dos demais binders marcados como públicos pelo treinador (`is_public = true`), ocultando binders privados para visitantes.
- [ ] O dono do perfil tem controles diretos para definir qual binder é o principal em destaque e gerenciar a visibilidade pública de seus fichários.
