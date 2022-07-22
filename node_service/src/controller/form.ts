import PrismaGlobal from "../prisma";
import { Form, FormResponse } from "../model/form";
import moment from "moment";
import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";

export async function insertForm(form: Form): Promise<any> {
    let prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// create form
        let newForm = await prisma.form.create({
            data: {
                store: {
                    connect: {
                        id: form.store_id,
                    },
                },
                coupon_promotion: {
                    connect: {
                        id: form.coupon_promotion_id,
                    },
                },
                form_question: {
                    /// create form_question for each question
                    create: form.questions.map(question => {
                        return {
                            inquiry: question.inquiry,
                            options: question.options,
                        };
                    }),
                }
            },
            select: {
                id: true,
                store: true,
                coupon_promotion: true,
                form_question: true,
            },
        });

        return newForm;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function processFormResponse(formResponse: FormResponse): Promise<any> {
    let prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// create user_form_response for each answer
        let newFormResponse = await prisma.user_form_question.createMany({
            data: formResponse.answers.map(answer => {
                return {
                    id_user: formResponse.user_id,
                    id_form_question: answer.question_id,
                    answer: String(answer.answer),
                }
            }),
        });

        /// get the form promotion
        let coupon_promotion = await prisma.coupon_promotion.findFirstOrThrow({
            where: {
                id: formResponse.promotion_id,
            },
        });

        /// create code
        let code = `${formResponse.user_id}-${formResponse.promotion_id}-${moment().format("YYYYMMDDHH")}`;

        /// check if code already exists in database
        let coupon_code = await prisma.coupon.findFirst({
            where: {
                code,
            },
        });

        if(coupon_code) {
            /// code already exists
            return null;
        }

        // create coupon for user
        const newCoupon = await prisma.coupon.create({
            data: {
                id: randomUUID(),
                code: code,
                ...(coupon_promotion.coupon_valid_time && {
                    expiry: moment().add(coupon_promotion.coupon_valid_time.getDate()).toDate()
                }),
                user: {
                    connect: {
                        id: formResponse.user_id,
                    },
                },
                coupon_promotion: {
                    connect: {
                        id: coupon_promotion.id,
                    },
                },
            },
            select: {
                id: true,
                expiry: true,
                code: true,
                user: true,
                coupon_promotion: true,
            },
        });

        /// return newly created user_form_responses
        return newCoupon;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/// function to get all forms
export async function getForms(): Promise<any> {
    let prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get all forms
        let forms = await prisma.form.findMany({
            select: {
                id: true,
                store: true,
                coupon_promotion: true,
                form_question: true,
            },
        });

        /// return all forms
        return forms;
    } catch (error) {
        console.log(error);
        return null;
    }
}