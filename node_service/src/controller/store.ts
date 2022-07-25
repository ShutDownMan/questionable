import PrismaGlobal from "../prisma";
import { Store } from "../model/store";
import { hash, genSalt } from "bcryptjs";
import { FormReport, question_report } from "../model/form";

export async function insertStore(store: Store): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    /// generate salt
    let salt = await genSalt(10);

    /// hash password
    let password_hash = await hash(store.password, salt);

    try {
        /// create store
        const newStore = await prisma.store.create({
            data: {
                // id: randomUUID(),
                name: store.name,
                email: store.email,
                password_hash: password_hash,
                salt: salt,
                // address: store.address,
            },
            select: {
                id: true,
                name: true,
                // address: true,
            },
        });

        /// return newly created store
        return newStore;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getFormsFromStore(storeId: number): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get forms
        const forms = await prisma.form.findMany({
            where: {
                id_store: storeId,
            },
            select: {
                id: true,
                coupon_promotion: true,
                form_question: true,
                store: true,
            },
        });

        /// return forms
        return forms;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/// function to get all stores
export async function getAllStores(): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get stores
        const stores = await prisma.store.findMany({
            select: {
                id: true,
                name: true,
                // address: true,
            },
        });

        /// return stores
        return stores;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/// route to generate a report of all forms from a store
export async function getFormsReportFromStore(storeId: number): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get forms
        const forms = await prisma.form.findMany({
            where: {
                id_store: storeId,
            },
            select: {
                id: true,
                coupon_promotion: true,
                form_question: {
                    select: {
                        id: true,
                        inquiry: true,
                        options: true,
                        user_form_question: true,
                    },
                },
                store: true,
            },
        });

        /// generate report
        let form_reports: FormReport[] = [];

        /// loop through forms
        for (let form of forms) {
            /// loop through form questions
            for (let form_question of form.form_question) {
                /// if no options, skip
                if (!form_question.options) continue;

                /// get answers
                let answers = form_question.user_form_question;

                /// initialize question report
                let question_reports: question_report[] = [];

                let options: string[] = form_question.options as string[];

                /// loop through options
                for (let option of options) {
                    question_reports.push({
                        answer_label: option,
                        count: 0,
                        percentage: 0,
                    });
                }

                /// loop through answers
                for (let answer of answers) {
                    // console.log(answer);
                    /// get answer index
                    let answer_index = parseInt(answer.answer);

                    /// if answer is not a number or index not in range, skip
                    // TODO: generate a different report based on the question type
                    if (isNaN(answer_index) || !question_reports[answer_index]) continue;

                    /// increment count
                    question_reports[answer_index].count++;
                }

                /// calculate percentages
                for (let question_report_item of question_reports) {
                    /// check if answer count is 0
                    if (answers.length === 0) {
                        question_report_item.percentage = 0;
                    } else {
                        question_report_item.percentage =
                            question_report_item.count / answers.length;
                    }
                }

                /// add question report to form report
                form_reports.push({
                    form_id: form.id,
                    questions: [
                        {
                            inquiry: form_question.inquiry,
                            options: options,
                            answers: question_reports,
                        },
                    ],
                });
            }

        }

        /// return forms
        return { reports: form_reports };

    } catch (error) {
        console.log(error);
        return null;
    }
}