export const isInRange = (value: number, min: number, max: number): boolean => {
    if (min >= max) {
        throw new Error(`\`min\` should be smaller than \`max\`; ${min} >= ${max}`);
    }
    return (value >= min) && (value <= max);
}

export const normalizeStatusCode = (statusCode: number): number => {
    statusCode = Math.abs(Math.round(statusCode));
    if (!isInRange(statusCode, 100, 600)) {
        return 500;
    }
    return statusCode;
}

export const normalizeData = (data: any): any[] | null => {
    if (!data) {
        return null;
    }
    if (!Array.isArray(data)) {
        return [data];
    }
    return data;
}

export const getPrintableId = (id: number): string => {
    if (isNaN(id)) {
        return "#0";
    }
    return `#${id}`;
}