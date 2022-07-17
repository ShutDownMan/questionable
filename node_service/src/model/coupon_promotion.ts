import { assert, object, string, array, optional, number, partial, Infer, union } from 'superstruct'

export const CouponPromotionPostValidationModel = object({
    expiry: string(),
    coupon_valid_time: string(),
    expiration_date: string(),
    discount_value: number(),
    discount_type: string(),
    description: string(),
    store_id: number(),
});

export type CouponPromotion = Infer<typeof CouponPromotionPostValidationModel> & {
    id?: string;
};
