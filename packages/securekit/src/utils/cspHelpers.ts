export const combineCspHeaders = (
    existingCsp: string | null,
    newCsp: string | null,
): string | null => {
    if (!existingCsp && !newCsp) return null;
    if (!existingCsp) return newCsp;
    if (!newCsp) return existingCsp;

    const parseDirectives = (csp: string) => {
        return new Map(
            csp.split(';').map((d) => {
                const [key, ...values] = d.trim().split(/\s+/);
                return [key, new Set(values.filter((v) => v !== ''))];
            }),
        );
    };

    const existingDirectives = parseDirectives(existingCsp);
    const newDirectives = parseDirectives(newCsp);

    newDirectives.forEach((values, key) => {
        if (existingDirectives.has(key)) {
            values.forEach((value) => existingDirectives.get(key)!.add(value));
        } else {
            existingDirectives.set(key, values);
        }
    });

    const combinedDirectives = Array.from(existingDirectives.entries())
        .filter(([_, values]) => values.size > 0)
        .map(([key, values]) => `${key} ${Array.from(values).join(' ')}`)
        .join('; ');

    return combinedDirectives || null;
};
