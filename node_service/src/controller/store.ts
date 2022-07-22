import PrismaGlobal from "../prisma";
import { Store } from "../model/store";
import { hash, genSalt } from "bcryptjs";

export async function insertStore(store: Store): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    /// generate salt
    let salt = await genSalt(10);

    /// hash password
    let password_hash= await hash(store.password, salt);

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