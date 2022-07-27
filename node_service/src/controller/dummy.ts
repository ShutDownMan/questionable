import PrismaGlobal from "../prisma";
import { faker } from '@faker-js/faker';
import { insertUser } from "./user";
import { insertCoupon } from "./coupon";
import { coupon_promotion, form, form_question, store, user } from "@prisma/client";
import { insertCouponPromotion } from "./coupon_promotion";
import moment from "moment";
import { insertStore } from "./store";
import { processFormResponse } from "./form";

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

/// function to create a dummy form response using faker
export async function insertDummyFormResponse(): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// select users that have not responded to any form
        let users = await prisma.$queryRaw<user[]>`SELECT * FROM "user" WHERE "id" NOT IN (SELECT "id_user" FROM "user_form_question")`;

        if (users.length === 0) {
            return null;
        }

        /// get random user from those
        let randomUser = users[Math.floor(Math.random() * users.length)];

        /// get random promotion from database
        let randomPromotion = await prisma.$queryRaw<coupon_promotion[]>`SELECT * FROM "coupon_promotion" ORDER BY RANDOM() LIMIT 1`
            .then(res => res[0]);

        console.log("randomPromotion.id:", randomPromotion.id);

        /// get random form by promotion id from database
        let randomForm = await prisma.$queryRaw<form[]>`SELECT * FROM "form" WHERE "id_coupon_promotion"::TEXT = ${randomPromotion.id} ORDER BY RANDOM() LIMIT 1`
            .then(res => res[0]);

        console.log("randomForm.id:", randomForm.id);

        /// get form questions by form id from database
        let formQuestions = await prisma.$queryRaw<form_question[]>`SELECT * FROM "form_question" WHERE "id_form" = ${randomForm.id}`;

        let randomAnswers: {
            question_id: number;
            answer: string | number;
        }[] = [];

        /// loop through each question and select a random answer from the list of options
        for (let question of formQuestions) {
            randomAnswers.push({
                question_id: question.id,
                answer: Math.floor(Math.random() * (question.options as string[]).length),
            });
        }

        /// create form response
        const newFormResponse = await processFormResponse({
            user_id: randomUser.id,
            form_id: randomForm.id,
            promotion_id: randomPromotion.id,
            answers: randomAnswers,
        });

        /// return newly created form response
        return newFormResponse;

    } catch (error) {
        console.log(error);
        return null;
    }
}