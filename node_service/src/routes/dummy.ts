import { Request, Response } from "express";
import { assert } from 'superstruct'
import { insertDummyCoupon, insertDummyCouponPromotion, insertDummyFormResponse, insertDummyStore, insertDummyUser } from "../controller/dummy";
import { processFormResponse } from "../controller/form";

/// route to create a dummy user, no validation
export async function dummyUserPostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Dummy User POST request');

    /// call controller function
    let newUser = await insertDummyUser();

    /// check if newUser is null
    if (newUser === null) {
        res.status(500).send('Error creating new user');
        return;
    }

    /// send response
    res.status(202).send(newUser);
}

/// route to create a dummy coupon, no validation
export async function dummyCouponPostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Dummy Coupon POST request');

    /// call controller function
    let newCoupon = await insertDummyCoupon();

    /// check if newCoupon is null
    if (newCoupon === null) {
        res.status(500).send('Error creating new coupon');
        return;
    }

    /// send response
    res.status(202).send(newCoupon);
}

/// route to create a dummy coupon promotion, no validation
export async function dummyCouponPromotionPostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Dummy Coupon Promotion POST request');

    /// call controller function
    let newCouponPromotion = await insertDummyCouponPromotion();

    /// check if newCouponPromotion is null
    if (newCouponPromotion === null) {
        res.status(500).send('Error creating new coupon promotion');
        return;
    }

    /// send response
    res.status(202).send(newCouponPromotion);
}

/// route to create a dummy store, no validation
export async function dummyStorePostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Dummy Store POST request');

    /// call controller function
    let newStore = await insertDummyStore();

    /// check if newStore is null
    if (newStore === null) {
        res.status(500).send('Error creating new store');
        return;
    }

    /// send response
    res.status(202).send(newStore);
}

/// route to create a dummy form response
export async function dummyFormResponsePostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling Dummy Form Response POST request');

    /// call controller function
    let newCoupon = await insertDummyFormResponse();

    /// check if newCoupon is null
    if (newCoupon === null) {
        res.status(500).send('Error processing form response');
        return;
    }

    /// send response
    res.status(202).send(newCoupon);
}
