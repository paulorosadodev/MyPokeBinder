((exports.id = 9916),
    (exports.ids = [9916]),
    (exports.modules = {
        4290: (a, b, c) => {
            "use strict";
            c.d(b, { A: () => h });
            var d = c(74515);
            let e = (...a) =>
                a
                    .filter((a, b, c) => !!a && "" !== a.trim() && c.indexOf(a) === b)
                    .join(" ")
                    .trim();
            var f = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
            let g = (0, d.forwardRef)(({ color: a = "currentColor", size: b = 24, strokeWidth: c = 2, absoluteStrokeWidth: g, className: h = "", children: i, iconNode: j, ...k }, l) => (0, d.createElement)("svg", { ref: l, ...f, width: b, height: b, stroke: a, strokeWidth: g ? (24 * Number(c)) / Number(b) : c, className: e("lucide", h), ...k }, [...j.map(([a, b]) => (0, d.createElement)(a, b)), ...(Array.isArray(i) ? i : [i])])),
                h = (a, b) => {
                    let c = (0, d.forwardRef)(({ className: c, ...f }, h) => (0, d.createElement)(g, { ref: h, iconNode: b, className: e(`lucide-${a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()}`, c), ...f }));
                    return ((c.displayName = `${a}`), c);
                };
        },
        46376: (a, b, c) => {
            "use strict";
            (c.r(b), c.d(b, { default: () => g, metadata: () => f }));
            var d = c(75338),
                e = c(63167);
            let f = { title: "Pol\xedtica de Privacidade | MyPokeBinder", description: "Conhe\xe7a a Pol\xedtica de Privacidade do MyPokeBinder. Transpar\xeancia total sobre escopo de dados do Google OAuth, armazenamento seguro e direitos do usu\xe1rio." };
            function g() {
                return (0, d.jsxs)(e.N9, {
                    title: "Pol\xedtica de Privacidade",
                    updatedAt: "\xdaltima atualiza\xe7\xe3o: 21 de setembro de 2026",
                    children: [
                        (0, d.jsxs)(e.v3, {
                            title: "1. Introdu\xe7\xe3o e Vis\xe3o Geral",
                            children: [
                                (0, d.jsxs)("p", { children: ['A presente Pol\xedtica de Privacidade tem por objetivo fornecer total transpar\xeancia a voc\xea ("Usu\xe1rio" ou "Colecionador") a respeito de quais dados s\xe3o coletados, como s\xe3o utilizados, armazenados e protegidos ao utilizar a aplica\xe7\xe3o web ', (0, d.jsx)("strong", { className: "text-white", children: "MyPokeBinder" }), "."] }),
                                (0, d.jsx)("p", { children: "O MyPokeBinder \xe9 uma aplica\xe7\xe3o web criada para fins de organiza\xe7\xe3o pessoal de cole\xe7\xf5es de cartas f\xedsicas de Pok\xe9mon Trading Card Game (TCG). Nosso compromisso \xe9 respeitar a privacidade dos usu\xe1rios e tratar apenas o volume m\xednimo de dados estritamente necess\xe1rio para o funcionamento dos recursos de sincroniza\xe7\xe3o e gerenciamento do binder." }),
                            ],
                        }),
                        (0, d.jsxs)(e.v3, {
                            id: "google-scope",
                            title: "2. Autentica\xe7\xe3o e Dados Recebidos do Google",
                            children: [
                                (0, d.jsxs)("p", { children: ["Para simplificar o cadastro e evitar a necessidade de criar senhas adicionais, o MyPokeBinder utiliza exclusivamente a autentica\xe7\xe3o federada via ", (0, d.jsx)("strong", { className: "text-white", children: "Google OAuth 2.0" }), "."] }),
                                (0, d.jsx)("p", { className: "font-medium text-white", children: "Escopos do Google solicitados" }),
                                (0, d.jsxs)("ul", {
                                    className: "list-disc space-y-1.5 pl-5 text-slate-300",
                                    children: [
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("code", { className: "text-[#ef4444]", children: "openid" }), ": Identificador \xfanico de autentica\xe7\xe3o para associar sua conta."] }),
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("code", { className: "text-[#ef4444]", children: "email" }), ": Seu endere\xe7o de e-mail prim\xe1rio fornecido pelo Google."] }),
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("code", { className: "text-[#ef4444]", children: "profile" }), ": Seu nome p\xfablico e URL da foto de perfil da sua conta Google."] }),
                                    ],
                                }),
                                (0, d.jsx)("p", { children: "O MyPokeBinder N\xc3O solicita, n\xe3o tem acesso e n\xe3o armazena sua senha do Google, contatos pessoais, e-mails do Gmail, arquivos do Google Drive, hist\xf3rico de navega\xe7\xe3o ou dados de pagamento." }),
                                (0, d.jsx)(e.so, {
                                    title: "Conformidade com Uso Limitado (Limited Use) do Google",
                                    children: (0, d.jsxs)("p", {
                                        children: [
                                            "O uso pelo MyPokeBinder de informa\xe7\xf5es recebidas das APIs do Google est\xe1 em estrita conformidade com a",
                                            " ",
                                            (0, d.jsx)("a", { href: "https://developers.google.com/terms/api-services-user-data-policy", target: "_blank", rel: "noreferrer", className: "font-semibold text-white underline hover:text-[#ef4444]", children: "Google API Services User Data Policy" }),
                                            ", incluindo seus requisitos de Uso Limitado (Limited Use). Os dados obtidos n\xe3o s\xe3o transferidos a terceiros nem utilizados para veicula\xe7\xe3o de an\xfancios, telemarketing, an\xe1lise comportamental ou para treinar modelos de intelig\xeancia artificial.",
                                        ],
                                    }),
                                }),
                            ],
                        }),
                        (0, d.jsxs)(e.v3, {
                            title: "3. Dados Gerados na Aplica\xe7\xe3o",
                            children: [
                                (0, d.jsx)("p", { children: "Ao interagir com o MyPokeBinder, s\xe3o armazenadas exclusivamente as informa\xe7\xf5es relacionadas \xe0 sua experi\xeancia com o binder de cartas:" }),
                                (0, d.jsxs)("ul", {
                                    className: "list-disc space-y-1.5 pl-5 text-slate-300",
                                    children: [
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("strong", { className: "text-white", children: "Cartas cadastradas na cole\xe7\xe3o" }), ": Identificador da carta na API p\xfablica TCGdex, n\xfamero da Pok\xe9dex (1 a 151), nome do Pok\xe9mon, URL da ilustra\xe7\xe3o da carta, idioma f\xedsico selecionado (PT-BR, EN, JA) e quantidade de exemplares possu\xeddos."] }),
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("strong", { className: "text-white", children: "V\xednculo no Binder" }), ": Marca\xe7\xe3o de qual carta est\xe1 ativa em cada um dos 151 slots fixos do binder."] }),
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("strong", { className: "text-white", children: "Prefer\xeancias de configura\xe7\xe3o" }), ": Prefer\xeancia de cor do tema visual da interface e ativa\xe7\xe3o/desativa\xe7\xe3o de efeitos sonoros procedurais."] }),
                                    ],
                                }),
                            ],
                        }),
                        (0, d.jsxs)(e.v3, {
                            title: "4. Armazenamento e Seguran\xe7a da Informa\xe7\xe3o",
                            children: [
                                (0, d.jsx)("p", { children: "A seguran\xe7a dos seus dados \xe9 prioridade. Adotamos as seguintes medidas de prote\xe7\xe3o t\xe9cnica e organizacional:" }),
                                (0, d.jsxs)("ul", {
                                    className: "list-disc space-y-1.5 pl-5 text-slate-300",
                                    children: [
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("strong", { className: "text-white", children: "Row Level Security (RLS)" }), ": Banco de dados PostgreSQL com pol\xedticas at\xf4micas de RLS. Nenhum usu\xe1rio tem acesso \xe0s cartas ou configura\xe7\xf5es de outro usu\xe1rio."] }),
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("strong", { className: "text-white", children: "Criptografia em tr\xe2nsito" }), ": Todo o tr\xe1fego entre seu navegador e nossos servidores \xe9 criptografado utilizando protocolos modernos HTTPS e TLS."] }),
                                    ],
                                }),
                            ],
                        }),
                        (0, d.jsxs)(e.v3, {
                            title: "5. Cookies e Armazenamento Local",
                            children: [
                                (0, d.jsx)("p", { children: "O MyPokeBinder utiliza apenas os seguintes mecanismos no navegador do usu\xe1rio:" }),
                                (0, d.jsxs)("ul", {
                                    className: "list-disc space-y-1.5 pl-5 text-slate-300",
                                    children: [
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("strong", { className: "text-white", children: "Cookies de sess\xe3o" }), ": Cookies estritamente necess\xe1rios gerados pelo provedor de autentica\xe7\xe3o (Supabase Auth) para manter sua sess\xe3o conectada com seguran\xe7a e prevenir ataques CSRF."] }),
                                        (0, d.jsxs)("li", { children: [(0, d.jsx)("strong", { className: "text-white", children: "LocalStorage" }), ": Utilizado localmente para armazenar sua prefer\xeancia de cor de tema, garantindo que a p\xe1gina abra na sua cor favorita sem piscar."] }),
                                    ],
                                }),
                                (0, d.jsx)("p", { className: "text-xs text-slate-500", children: "N\xe3o utilizamos cookies de terceiros para fins de publicidade, remarketing ou rastreamento entre sites." }),
                            ],
                        }),
                        (0, d.jsxs)(e.v3, {
                            title: "6. Seus Direitos e Exclus\xe3o de Dados (LGPD)",
                            children: [
                                (0, d.jsx)("p", { children: "Em conformidade com a Lei Geral de Prote\xe7\xe3o de Dados (LGPD - Lei Federal n\xba 13.709/2018), voc\xea possui o direito a:" }),
                                (0, d.jsxs)("ul", {
                                    className: "list-disc space-y-1.5 pl-5 text-slate-300",
                                    children: [
                                        (0, d.jsx)("li", { children: "Confirmar a exist\xeancia do tratamento de dados pessoais e acessar suas informa\xe7\xf5es a qualquer momento." }),
                                        (0, d.jsx)("li", { children: "Excluir cartas individuais ou desvincular itens diretamente pela interface de gerenciamento da Cole\xe7\xe3o." }),
                                        (0, d.jsxs)("li", { children: ["Revogar as permiss\xf5es concedidas ao MyPokeBinder a qualquer instante atrav\xe9s da sua p\xe1gina de", " ", (0, d.jsx)("a", { href: "https://myaccount.google.com/permissions", target: "_blank", rel: "noreferrer", className: "text-white underline hover:text-[#ef4444]", children: "Seguran\xe7a da Conta Google" }), "."] }),
                                        (0, d.jsx)("li", { children: "Excluir definitivamente a sua conta e todos os registros associados (perfil, cole\xe7\xe3o e prefer\xeancias) pela p\xe1gina de Configura\xe7\xf5es. A exclus\xe3o \xe9 irrevers\xedvel e remove tamb\xe9m a identidade de login vinculada ao Google neste aplicativo." }),
                                    ],
                                }),
                            ],
                        }),
                        (0, d.jsxs)(e.v3, { title: "7. Canal de Contato e D\xfavidas de Privacidade", children: [(0, d.jsx)("p", { children: "Se voc\xea tiver d\xfavidas, solicita\xe7\xf5es de esclarecimento ou desejar exercer outros direitos previstos pela LGPD, entre em contato diretamente com o respons\xe1vel pelo projeto atrav\xe9s do e-mail:" }), (0, d.jsx)("p", { className: "font-mono text-[#ef4444]", children: "paulorosadodev@gmail.com" })] }),
                    ],
                });
            }
        },
        63167: (a, b, c) => {
            "use strict";
            c.d(b, { so: () => o, N9: () => m, v3: () => n });
            var d = c(75338),
                e = c(65169),
                f = c.n(e),
                g = c(93247),
                h = c(4290);
            let i = (0, h.A)("LogIn", [
                ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
                ["polyline", { points: "10 17 15 12 10 7", key: "1ail0h" }],
                ["line", { x1: "15", x2: "3", y1: "12", y2: "12", key: "v6grx8" }],
            ]);
            function j() {
                return (0, d.jsx)("header", {
                    className: "sticky top-0 z-50 border-b border-white/10 bg-[#0a0c10]/90 backdrop-blur-md",
                    children: (0, d.jsxs)("div", {
                        className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6",
                        children: [
                            (0, d.jsxs)(f(), { href: "/", className: "flex shrink-0 items-center gap-2.5 no-underline", children: [(0, d.jsx)(g.PokeballLogo, { size: "sm", animated: !0, glow: "subtle", color: "#ef4444" }), (0, d.jsx)("span", { className: "bg-gradient-to-r from-white to-slate-400 bg-clip-text text-base font-extrabold tracking-tight text-transparent sm:text-lg", children: "MyPokeBinder" })] }),
                            (0, d.jsxs)(f(), { href: "/login", className: "flex items-center gap-2 rounded-xl bg-[#ef4444] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#dc2626] active:scale-[0.98] sm:text-sm", children: [(0, d.jsx)(i, { size: 15 }), (0, d.jsx)("span", { children: "Entrar" })] }),
                        ],
                    }),
                });
            }
            function k() {
                return (0, d.jsx)("footer", {
                    className: "relative z-20 border-t border-white/10 bg-[#07090e] py-12 text-slate-400",
                    children: (0, d.jsxs)("div", {
                        className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                        children: [
                            (0, d.jsxs)("div", {
                                className: "grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12",
                                children: [
                                    (0, d.jsxs)("div", {
                                        className: "md:col-span-1",
                                        children: [
                                            (0, d.jsxs)("div", { className: "flex items-center gap-3", children: [(0, d.jsx)(g.PokeballLogo, { size: "md", glow: "subtle", color: "#ef4444" }), (0, d.jsx)("span", { className: "text-xl font-bold tracking-tight text-white", children: "MyPokeBinder" })] }),
                                            (0, d.jsx)("p", { className: "mt-4 max-w-sm text-sm leading-relaxed text-slate-400", children: "Binder digital 3\xd73 dos 151 Pok\xe9mon de Kanto. Registre suas cartas f\xedsicas e folheie o binder." }),
                                        ],
                                    }),
                                    (0, d.jsxs)("div", {
                                        children: [
                                            (0, d.jsx)("h4", { className: "text-sm font-semibold text-white", children: "Navega\xe7\xe3o" }),
                                            (0, d.jsxs)("ul", {
                                                className: "mt-4 space-y-2.5 text-sm",
                                                children: [
                                                    (0, d.jsx)("li", { children: (0, d.jsx)(f(), { href: "/inicio", className: "transition-colors hover:text-white", children: "P\xe1gina Inicial" }) }),
                                                    (0, d.jsx)("li", { children: (0, d.jsx)(f(), { href: "/", className: "transition-colors hover:text-white", children: "Meu Binder" }) }),
                                                    (0, d.jsx)("li", { children: (0, d.jsx)(f(), { href: "/collection", className: "transition-colors hover:text-white", children: "Cole\xe7\xe3o" }) }),
                                                    (0, d.jsx)("li", { children: (0, d.jsx)(f(), { href: "/login", className: "transition-colors hover:text-white", children: "Entrar" }) }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, d.jsxs)("div", {
                                        children: [
                                            (0, d.jsx)("h4", { className: "text-sm font-semibold text-white", children: "Legal" }),
                                            (0, d.jsxs)("ul", { className: "mt-4 space-y-2.5 text-sm", children: [(0, d.jsx)("li", { children: (0, d.jsx)(f(), { href: "/privacidade", className: "transition-colors hover:text-white", children: "Pol\xedtica de Privacidade" }) }), (0, d.jsx)("li", { children: (0, d.jsx)(f(), { href: "/termos", className: "transition-colors hover:text-white", children: "Termos de Servi\xe7o" }) })] }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, d.jsxs)("div", {
                                className: "mt-12 border-t border-white/10 pt-8",
                                children: [
                                    (0, d.jsx)("p", {
                                        className: "text-xs leading-relaxed text-slate-500",
                                        children:
                                            "Pok\xe9mon, Pok\xe9mon TCG, nomes de personagens, ins\xedgnias e ilustra\xe7\xf5es s\xe3o marcas registradas e propriedade intelectual de Nintendo, Creatures Inc. e Game Freak / The Pok\xe9mon Company. MyPokeBinder \xe9 uma aplica\xe7\xe3o independente criada por f\xe3s, sem fins comerciais, e n\xe3o \xe9 afiliada, endossada ou patrocinada por The Pok\xe9mon Company ou Nintendo. Imagens e dados de cartas v\xeam da API p\xfablica TCGdex, sob uso justo.",
                                    }),
                                    (0, d.jsxs)("p", { className: "mt-4 text-xs text-slate-500", children: ["\xa9 ", new Date().getFullYear(), " MyPokeBinder"] }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            let l = (0, h.A)("ArrowLeft", [
                ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
                ["path", { d: "M19 12H5", key: "x3x0zl" }],
            ]);
            function m({ title: a, updatedAt: b, children: c }) {
                return (0, d.jsxs)("div", {
                    className: "min-h-screen bg-[#07090e] text-slate-200",
                    children: [
                        (0, d.jsx)(j, {}),
                        (0, d.jsxs)("main", {
                            className: "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8",
                            children: [
                                (0, d.jsxs)(f(), { href: "/", className: "inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white", children: [(0, d.jsx)(l, { size: 14 }), (0, d.jsx)("span", { children: "Voltar" })] }),
                                (0, d.jsxs)("header", { className: "mt-8 border-b border-white/10 pb-8", children: [(0, d.jsx)("h1", { className: "text-3xl font-bold tracking-tight text-white sm:text-4xl", children: a }), (0, d.jsx)("p", { className: "mt-2 text-sm text-slate-500", children: b })] }),
                                (0, d.jsx)("div", { className: "profile-enter divide-y divide-white/10 text-sm leading-relaxed text-slate-300 sm:text-[15px]", children: c }),
                            ],
                        }),
                        (0, d.jsx)(k, {}),
                    ],
                });
            }
            function n({ id: a, title: b, children: c }) {
                return (0, d.jsxs)("section", { id: a, className: "py-8 first:pt-8 last:pb-0", children: [(0, d.jsx)("h2", { className: "text-lg font-semibold text-white", children: b }), (0, d.jsx)("div", { className: "mt-4 space-y-3", children: c })] });
            }
            function o({ title: a, children: b }) {
                return (0, d.jsxs)("aside", { className: "rounded-2xl border border-[#ef4444]/25 bg-[#ef4444]/5 p-5 sm:p-6", children: [(0, d.jsx)("h3", { className: "text-base font-semibold text-white", children: a }), (0, d.jsx)("div", { className: "mt-3 space-y-3 text-slate-300", children: b })] });
            }
        },
        65169: (a, b, c) => {
            let { createProxy: d } = c(39893);
            a.exports = d("/home/paulo_rosado/MyPokeBinder/node_modules/next/dist/client/app-dir/link.js");
        },
        66883: (a, b, c) => {
            (Promise.resolve().then(c.t.bind(c, 65169, 23)), Promise.resolve().then(c.bind(c, 93247)));
        },
        80955: (a, b, c) => {
            (Promise.resolve().then(c.t.bind(c, 3991, 23)), Promise.resolve().then(c.bind(c, 26769)));
        },
        93247: (a, b, c) => {
            "use strict";
            (c.r(b), c.d(b, { PokeballLogo: () => d }));
            let d = (0, c(97954).registerClientReference)(
                function () {
                    throw Error("Attempted to call PokeballLogo() from the server but PokeballLogo is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                },
                "/home/paulo_rosado/MyPokeBinder/src/components/ui/PokeballLogo.tsx",
                "PokeballLogo",
            );
        },
    }));
