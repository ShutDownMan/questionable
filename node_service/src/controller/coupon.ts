import PrismaGlobal from "../prisma";
import { Coupon } from "../model/coupon";
import { randomUUID } from "crypto";
import moment from "moment";

/**
 * this function is used to create a new coupon
 * @param coupon Coupon object
 * @returns Newly created coupon object
 */
export async function insertCoupon(coupon: Coupon): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// create coupon
        const newCoupon = await prisma.coupon.create({
            data: {
                id: randomUUID(),
                user: {
                    connect: {
                        id: coupon.user_id,
                    },
                },
                coupon_promotion: {
                    connect: {
                        id: coupon.coupon_promotion_id,
                    },
                },
            },
            select: {
                id: true,
                expiry: true,
                code: true,
                coupon_promotion: {
                    include: {
                        store: {
                            select: {
                                id: true,
                                name: true,
                            },
                        }
                    }
                },
                user: true,
            },
        });

        /// return newly created coupon
        return newCoupon;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getCouponsByUserID(userId: string): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get coupons
        const coupons = await prisma.coupon.findMany({
            where: {
                id_user: userId,
            },
            include: {
                coupon_promotion: {
                    include: {
                        store: true,
                    },
                },
            },
        });

        /// return coupons
        return coupons;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/// function to get all coupons
export async function getAllCoupons(): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get coupons
        const coupons = await prisma.coupon.findMany({
            include: {
                coupon_promotion: true,
                user: true,
            },
        });

        /// return coupons
        return coupons;

    } catch (error) {
        console.log(error);
        return null;
    }
}