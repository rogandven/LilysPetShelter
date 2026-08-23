import { ObjectSchema } from "joi";

export const validationHelper = (input: any, arr: ObjectSchema<any>[]): string | undefined => {
    let error: string | undefined = undefined;
    for (let i = 0; i < arr.length; i++) {
        if (error = (arr[i].validate(input))?.error?.message) {
            return error;
        }
    }
    return undefined;
}

