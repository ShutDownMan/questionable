import PrismaGlobal from "../prisma";
import { faker } from '@faker-js/faker';
import { insertUser } from "./user";
import { insertCoupon } from "./coupon";
import { coupon_promotion, form, store, user } from "@prisma/client";
import { insertCouponPromotion } from "./coupon_promotion";
import moment from "moment";
import { insertStore } from "./store";

/// function to create a dummy user using faker
export async function insertDummyUser(): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// create user
        const newUser = await insertUser({
            id: faker.datatype.uuid(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
        });

        /// return newly created user
        return newUser;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/// function to create a dummy coupon using faker
export async function insertDummyCoupon(): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get random user from database
        let randomUser = await prisma.$queryRaw<user[]>`SELECT * FROM "user" ORDER BY RANDOM() LIMIT 1`;

        let userUUID = randomUser[0].id;

        /// get random coupon promotion from database
        let randomCouponPromotion = await prisma.$queryRaw<coupon_promotion[]>`SELECT * FROM "coupon_promotion" ORDER BY RANDOM() LIMIT 1`;

        let couponPromotionUUID = randomCouponPromotion[0].id;

        /// create coupon
        const newCoupon = await insertCoupon({
            user_id: userUUID,
            coupon_promotion_id: couponPromotionUUID,
            code: `${faker.random.numeric(4)}-${faker.random.numeric(4)}-${faker.random.numeric(4)}`,
        });

        /// return newly created coupon
        return newCoupon;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/// function to create a dummy coupon promotion using faker
export async function insertDummyCouponPromotion(): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get random store from database
        let randomStore = await prisma.$queryRaw<store[]>`SELECT * FROM "store" ORDER BY RANDOM() LIMIT 1`;

        /// create coupon promotion
        const newCouponPromotion = await insertCouponPromotion({
            description: faker.lorem.sentence(),
            discount_value: Number(faker.random.numeric(2, { bannedDigits: ['0'] })),
            discount_type: faker.helpers.arrayElement(['percentage', 'amount']),
            expiry: moment(faker.date.future()).format("YYYY-MM-DD"),
            expiration_date: moment(faker.date.future()).format("YYYY-MM-DD"),
            store_id: randomStore[0].id,
            coupon_valid_time: moment(faker.date.soon(60)).format("YYYY-MM-DD"),
        });

        /// return newly created coupon promotion
        return newCouponPromotion;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/// function to create a dummy store using faker
export async function insertDummyStore(): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// create store
        const newStore = await insertStore({
            name: faker.company.companyName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            // address: faker.address.streetAddress(),
        });

        /// return newly created store
        return newStore;

    } catch (error) {
        console.log(error);
        return null;
    }
}