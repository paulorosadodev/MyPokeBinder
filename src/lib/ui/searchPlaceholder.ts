export function truncateSearchPlaceholder(placeholder: string, maxWidth: number, measure: (value: string) => number): string {
    const ellipsis = "…";
    if (maxWidth <= measure(ellipsis)) return ellipsis;
    if (measure(placeholder) <= maxWidth) return placeholder;

    let visible = "";
    for (const word of placeholder.trim().split(/\s+/)) {
        const candidate = visible ? `${visible} ${word}` : word;
        if (measure(`${candidate}${ellipsis}`) > maxWidth) {
            const cleanVisible = visible.replace(/[,:;]+$/, "");
            return cleanVisible ? `${cleanVisible}${ellipsis}` : ellipsis;
        }
        visible = candidate;
    }

    return placeholder;
}
