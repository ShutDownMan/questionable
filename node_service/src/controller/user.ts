import PrismaGlobal from "../prisma";
import { User } from "../model/user";
import { hash, genSalt } from "bcryptjs";

/**
 * this function is used to create a new user
 * @param user User object
 * @returns Newly created user object
 */
export async function insertUser(user: User): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    /// generate salt
    let u_salt = await genSalt(10);
    /// hash password
    let u_hash = await hash(user.password, u_salt);

    try {
        /// create user
        const newUser = await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                salt: u_salt,
                password_hash: u_hash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        /// return newly created user
        return newUser;

    } catch (error) {
        console.log(error);
        return null;
    }
}

/// function to get all users
export async function getUsers(): Promise<any> {
    const prisma = PrismaGlobal.getInstance().prisma;

    try {
        /// get all users
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        /// return all users
        return users;

    } catch (error) {
        console.log(error);
        return null;
    }
}