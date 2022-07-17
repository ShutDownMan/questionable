import { Request, Response } from "express";
import { assert } from 'superstruct'
import { getAllStores, getFormsFromStore, insertStore } from "../controller/store";
import { StorePostValidationModel } from "../model/store";

export async function storePostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Store POST request');

    /// validate req.body
    let reqBody = req.body;
    console.debug('reqBody:', reqBody);
    try {
        assert(reqBody, StorePostValidationModel);
    } catch (error: any) {
        res.status(400).send(error);
        return;
    }

    console.debug('validated reqBody', reqBody);

    /// call controller function
    let newStore = await insertStore({
        id: undefined,
        ...reqBody,
    });

    /// check if newStore is null
    if (newStore === null) {
        res.status(500).send('Error creating new store');
        return;
    }

    /// send response
    res.status(202).send(newStore);
}

export async function storeFormsGetHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Store GET request');

    /// check if storeID is in req.query
    if (!req.params.storeID) {
        res.status(400).send('Missing storeID in request');
        return;
    }

    /// get user id from req.params
    let storeID = Number(req.params.storeID);
    console.debug('storeID:', storeID);

    /// call controller function
    let stores = await getFormsFromStore(storeID);

    /// check if stores is null
    if (stores === null) {
        res.status(500).send('Error getting forms from store');
        return;
    }

    /// send response
    res.status(200).send(stores);
}

/// route to get all stores
export async function storesGetHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Store GET request');

    /// call controller function
    let stores = await getAllStores();

    /// check if stores is null
    if (stores === null) {
        res.status(500).send('Error getting stores');
        return;
    }

    /// send response
    res.status(200).send(stores);
}