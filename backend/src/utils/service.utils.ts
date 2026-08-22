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

export const normalizePetsAndUsers = (pets: any[]) => {
    try {
        if (!Array.isArray(pets)) {
            throw new Error("invalid array given to normalizer");
        }
        const newPets = pets.map((pet) => {
            try {
                if (pet.owner) {
                    delete pet?.owner?.password;
                    return pet;
                }
            } catch (error) {
                console.error(error);
                return null;
            }
        }).filter((pet) => {
            return pet !== null;
        });
        return newPets;
    } catch (error) {
        console.error(error);
        return [];
    }
}