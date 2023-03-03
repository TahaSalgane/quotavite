import { ObjectSchema } from 'yup';

export const yupValidation = async (schema: ObjectSchema<object>, obj: object) => {
    try {
        await schema.validate(obj);
        return { ok: true };
    } catch (error: any) {
        return { ok: false, error };
    }
};
