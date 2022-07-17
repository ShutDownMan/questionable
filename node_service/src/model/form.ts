import { assert, object, string, array, optional, number, partial, Infer, union } from 'superstruct'

export const FormPostValidationModel = object({
    store_id: number(),
    coupon_promotion_id: string(),
    questions: array(object({
        inquiry: string(),
    })),
});

export type Form = Infer<typeof FormPostValidationModel> & {
    id?: string;
};

export const FormResponsePostValidationModel = object({
    form_id: number(),
    promotion_id: string(),
    user_id: string(),
    answers: array(object({
        question_id: number(),
        answer: string(),
    })),
});

export type FormResponse = Infer<typeof FormResponsePostValidationModel> & {
    id?: string;
};