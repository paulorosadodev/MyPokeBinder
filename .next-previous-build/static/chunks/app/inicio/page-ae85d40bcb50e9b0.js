(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3608],
    {
        1847: (e, t, r) => {
            "use strict";
            r.d(t, { A: () => i });
            var a = r(2115);
            let l = function () {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                return t
                    .filter((e, t, r) => !!e && "" !== e.trim() && r.indexOf(e) === t)
                    .join(" ")
                    .trim();
            };
            var s = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
            let h = (0, a.forwardRef)((e, t) => {
                    let { color: r = "currentColor", size: h = 24, strokeWidth: i = 2, absoluteStrokeWidth: n, className: o = "", children: c, iconNode: d, ...u } = e;
                    return (0, a.createElement)("svg", { ref: t, ...s, width: h, height: h, stroke: r, strokeWidth: n ? (24 * Number(i)) / Number(h) : i, className: l("lucide", o), ...u }, [
                        ...d.map((e) => {
                            let [t, r] = e;
                            return (0, a.createElement)(t, r);
                        }),
                        ...(Array.isArray(c) ? c : [c]),
                    ]);
                }),
                i = (e, t) => {
                    let r = (0, a.forwardRef)((r, s) => {
                        let { className: i, ...n } = r;
                        return (0, a.createElement)(h, { ref: s, iconNode: t, className: l("lucide-".concat(e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()), i), ...n });
                    });
                    return ((r.displayName = "".concat(e)), r);
                };
        },
        3139: (e, t, r) => {
            Promise.resolve().then(r.bind(r, 1588));
        },
        5740: (e, t, r) => {
            "use strict";
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("Sparkles", [
                ["path", { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", key: "4pj2yx" }],
                ["path", { d: "M20 3v4", key: "1olli1" }],
                ["path", { d: "M22 5h-4", key: "1gvqau" }],
                ["path", { d: "M4 17v2", key: "vumght" }],
                ["path", { d: "M5 18H3", key: "zchphs" }],
            ]);
        },
        6651: (e, t, r) => {
            "use strict";
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("Search", [
                ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
                ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
            ]);
        },
        7937: (e, t, r) => {
            "use strict";
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("BookOpen", [
                ["path", { d: "M12 7v14", key: "1akyts" }],
                ["path", { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z", key: "ruj8y" }],
            ]);
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 2619, 5239, 8720, 1013, 6937, 148, 1588, 8441, 1255, 7358], () => e((e.s = 3139))), (_N_E = e.O()));
    },
]);
