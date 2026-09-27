# Abertura e folheamento para todo destino de URL

Status: Aceito

Todo acesso ao Binder com uma Página solicitada por `?page=` ou `?spread=` começa na Capa Frontal, conclui a abertura na Página 1 e então folheia até o destino. A Página inicial do motor e a Página solicitada são estados distintos para impedir que um deep link faça o binder surgir já aberto. A entrada visual usa uma transição contínua de 420 ms, sem deslocamento negativo, rotação, overshoot ou rebote; preferências de redução ou desativação de movimento continuam substituindo a animação por navegação direta.
