export const isInRange = (value: number, min: number, max: number): boolean => {
    if (min >= max) {
        throw new Error(`\`min\` should be smaller than \`max\`; ${min} >= ${max}`);
    }
    return (value >= min) && (value <= max);
}