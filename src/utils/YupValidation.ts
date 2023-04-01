import { ObjectSchema } from 'yup';
import * as yup from 'yup';
const yupValidation = async (schema: ObjectSchema<object>, obj: object) => {
    try {
        await schema.validate(obj);
        return { ok: true };
    } catch (error: any) {
        return { ok: false, error };
    }
};
const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
const registerSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
});
const quoteSchema = yup.object({
    content: yup.string().required(),
    author: yup.string().required(),
    tags: yup.array().of(yup.string()).required(),
});
const resetPassword = yup.object().shape({
    password: yup.string().min(5, 'Must be 5 characters or more').required('required'),
});
const validateEmail = yup.object().shape({
    email: yup.string().email().required(),
});
const createCommentSchema = yup.object({
    quoteId: yup.string().required(),
    text: yup.string().required(),
});
const updateCommmentSchema = yup.object({
    text: yup.string().required(),
});
const tagSchema = yup.object({
    name: yup.string().required(),
});
export default yupValidation;
export {
    registerSchema,
    loginSchema,
    quoteSchema,
    tagSchema,
    yupValidation,
    createCommentSchema,
    updateCommmentSchema,
    resetPassword,
    validateEmail,
};
