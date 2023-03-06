import { ObjectSchema } from 'yup';
const yup = require('yup');
export const yupValidation = async (schema: ObjectSchema<object>, obj: object) => {
    try {
        await schema.validate(obj);
        return { ok: true };
    } catch (error: any) {
        return { ok: false, error };
    }
};
export const authSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
export const quoteSchema = yup.object({
    content: yup.string().required(),
    author: yup.string().required(),
    
});
