export const normalizeHeaderValue = (
    value: string | number | string[],
): string => {
    if (typeof value === 'string') return value.trim();
    if (Array.isArray(value)) return value.join(', ');
    return value.toString();
};

export const normalizeCspValue = (value: string | string[]): string => {
    if (typeof value === 'string') return value.trim();
    if (Array.isArray(value)) return value.join(' ');
    return value;
};
