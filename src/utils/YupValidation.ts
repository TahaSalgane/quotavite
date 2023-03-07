import { ObjectSchema } from 'yup';
const yup = require('yup');
const yupValidation = async (schema: ObjectSchema<object>, obj: object) => {
    try {
        await schema.validate(obj);
        return { ok: true };
    } catch (error: any) {
        return { ok: false, error };
    }
};
const authSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
const quoteSchema = yup.object({
    content: yup.string().required(),
    author: yup.string().required(),
    tags: yup.array().of(yup.string()).required(),
});
const categorieSchema = yup.object({
    name: yup.string().required(),
});
export default yupValidation;
export { authSchema, quoteSchema, categorieSchema, yupValidation };
