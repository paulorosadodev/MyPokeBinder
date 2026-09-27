# Abertura do Binder antes do destaque vindo do Mini-Grid

Status: Aceito

Entradas no Binder originadas pelo Mini-Grid com `?dexId=` começam na Capa Frontal, concluem a abertura física na Página 1, navegam até a Página do Pokémon e somente depois iniciam o destaque. A prontidão desse fluxo significa que a capa terminou de assentar e o motor está ocioso, não apenas que o PageFlip foi inicializado; essa ordem evita a disputa entre abertura, salto e glow. Links explícitos `?page=` também preservam a apresentação física conforme a ADR 0050, enquanto retornos da edição com `openSelect=true` continuam abrindo diretamente no destino para preservar o contexto do Seletor de Carta.
