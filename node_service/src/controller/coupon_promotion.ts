import PrismaGlobal from "../prisma";
import { CouponPromotion } from "../model/coupon_promotion";
import { randomUUID } from "crypto";
import moment from "moment";

export async function insertCouponPromotion(coupon: CouponPromotion): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// create coupon
        const newCouponPromotion = await prisma.coupon_promotion.create({
            data: {
                id: randomUUID(),
                expiry: moment(coupon.expiry).toDate(),
                coupon_valid_time: moment(coupon.expiration_date).toDate(),
                ...discountTypeToPrisma(coupon.discount_type, coupon.discount_value),
                description: coupon.description,
                store: {
                    connect: {
                        id: coupon.store_id,
                    },
                }
            },
        });

        /// return newly created coupon promotion
        return newCouponPromotion;

    } catch (error) {
        console.log(error);
        return null;
    }
}

function discountTypeToPrisma(discountType: string, discountValue: number): any {
    if (discountType === "percentage") {
        return {
            percent_discount: discountValue,
        };
    } else if (discountType === "amount") {
        return {
            abs_discount: discountValue,
        };
    }

    throw new Error("Invalid discount type");
}

/// function to get all coupon promotions
export async function getAllCouponPromotions(): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get all coupon promotions
        let couponPromotions = await prisma.coupon_promotion.findMany({
            select: {
                id: true,
                expiry: true,
                coupon_valid_time: true,
                percent_discount: true,
                abs_discount: true,
                description: true,
                store: true,
            },
        });

        /// return all coupon promotions
        return couponPromotions;
    } catch (error) {
        console.log(error);
        return null;
    }
}