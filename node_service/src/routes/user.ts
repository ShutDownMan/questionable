import { Request, Response } from "express";
import { assert } from 'superstruct'
import { getUsers, insertUser } from "../controller/user";
import { UserPostValidationModel } from "../model/user";

export async function userPostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling User POST request');

    /// validate req.body
    let reqBody = req.body;
    console.debug('reqBody:', reqBody);
    try {
        assert(reqBody, UserPostValidationModel);
    } catch (error: any) {
        res.status(400).send(error);
        return;
    }

    console.debug('validated reqBody', reqBody);

    /// call controller function
    let newUser = await insertUser({
        ...reqBody,
    });

    /// check if newUser is null
    if (newUser === null) {
        res.status(500).send('Error creating new user');
        return;
    }

    /// send response
    res.status(202).send(newUser);
}

/// route to get all users
export async function usersGetHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling User GET request');

    /// call controller function
    let users = await getUsers();

    /// check if users is null
    if (users === null) {
        res.status(500).send('Error getting users');
        return;
    }

    /// send response
    res.status(200).send(users);
}