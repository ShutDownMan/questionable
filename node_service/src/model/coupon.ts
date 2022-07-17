import { assert, object, string, array, optional, number, partial, Infer, union } from 'superstruct'

export const CouponPostValidationModel = object({
    code: string(),
    user_id: string(),
    coupon_promotion_id: string(),
});

export type Coupon = Infer<typeof CouponPostValidationModel> & {
    id?: string;
};
