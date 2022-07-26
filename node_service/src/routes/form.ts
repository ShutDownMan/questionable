import { Request, Response } from "express";
import { assert } from 'superstruct'
import { deleteFormResponse, getForms, insertForm, processFormResponse } from "../controller/form";
import { FormPostValidationModel, FormResponsePostValidationModel } from "../model/form";

export async function formPostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Form POST request');

    /// validate req.body
    let reqBody = req.body;
    console.debug('reqBody:', reqBody);
    try {
        assert(reqBody, FormPostValidationModel);
    } catch (error: any) {
        res.status(400).send(error);
        return;
    }

    console.debug('validated reqBody', reqBody);

    /// call controller function
    let newForm = await insertForm({
        id: undefined,
        ...reqBody,
    });

    /// check if newForm is null
    if (newForm === null) {
        res.status(500).send('Error creating new form');
        return;
    }

    /// send response
    res.status(202).send(newForm);
}

export async function formResponsePostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Form Response POST request');

    /// validate req.body
    let reqBody = req.body;
    console.debug('reqBody:', reqBody);
    try {
        assert(reqBody, FormResponsePostValidationModel);
    } catch (error: any) {
        res.status(400).send(error);
        return;
    }

    console.debug('validated reqBody', reqBody);

    /// call controller function
    let newForm = await processFormResponse(reqBody);

    /// check if newForm is null
    if (newForm === null) {
        res.status(500).send('Error processing form response');
        return;
    }

    /// send response
    res.status(202).send(newForm);
}

/// route to get all forms
export async function formsGetHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Form GET request');

    /// call controller function
    let forms = await getForms();

    /// check if forms is null
    if (forms === null) {
        res.status(500).send('Error getting forms');
        return;
    }

    /// send response
    res.status(200).send(forms);
}

/// route to delete a form response
export async function formResponseDeleteHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Form Response DELETE request');

    /// check if userId is in req.params
    if (!req.params.userId) {
        res.status(400).send('Missing userId in request');
        return;
    }

    /// get user id from req.params
    let userId = req.params.userId;
    console.debug('userId:', userId);

    /// call controller function
    let formResponse = await deleteFormResponse(userId);

    /// check if formResponse is null
    if (formResponse === null) {
        res.status(500).send('Error deleting form response');
        return;
    }

    /// send response
    res.status(200);
}