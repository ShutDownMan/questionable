import { assert, object, string, array, optional, number, partial, Infer, union } from 'superstruct'

export const FormPostValidationModel = object({
    store_id: number(),
    coupon_promotion_id: string(),
    questions: array(object({
        inquiry: string(),
        options: array(string()),
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
        answer: union([string(), number()]),
    })),
});

export type FormResponse = Infer<typeof FormResponsePostValidationModel> & {
    id?: string;
};

export interface question_report {
    answer_label: string;
    count: number;
    percentage: number
};

export interface FormReport {
    form_id: number;
    questions: [
        {
            inquiry: string;
            options: string[];
            answers: question_report[];
        }
    ]
}