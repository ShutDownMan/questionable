import { Request, Response } from "express";
import { assert } from 'superstruct'
import { deleteCoupon, getAllCoupons, getCouponsByUserID, insertCoupon } from "../controller/coupon";
import { CouponPostValidationModel } from "../model/coupon";

export async function cuponPostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling coupon POST request');

    /// validate req.body
    let reqBody = req.body;
    console.debug('reqBody:', reqBody);
    try {
        assert(reqBody, CouponPostValidationModel);
    } catch (error: any) {
        res.status(400).send(error);
        return;
    }

    console.debug('validated reqBody', reqBody);

    /// call controller function
    let newCupon = await insertCoupon({
        id: undefined,
        ...reqBody,
    });

    /// check if newCupon is null
    if (newCupon === null) {
        res.status(500).send('Error creating new coupon');
        return;
    }

    /// send response
    res.status(202).send(newCupon);
}

export async function cuponGetHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling coupon GET request');

    /// check if userID is in req.query
    if (!req.params.userID) {
        res.status(400).send('Missing userID in request');
        return;
    }

    /// get user id from req.params
    let userID = String(req.params.userID);
    console.debug('userID:', userID);

    /// call controller function
    let coupons = await getCouponsByUserID(userID);

    /// check if coupons is null
    if (coupons === null) {
        res.status(500).send('Error getting coupons');
        return;
    }

    /// send response
    res.status(200).send(coupons);
}

/// route to get all coupons
export async function allCouponsGetHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling coupon GET request');

    /// call controller function
    let coupons = await getAllCoupons();

    /// check if coupons is null
    if (coupons === null) {
        res.status(500).send('Error getting coupons');
        return;
    }

    /// send response
    res.status(200).send(coupons);
}

/// route to delete coupon
export async function couponDeleteHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling coupon DELETE request');

    /// check if couponID is in req.params
    if (!req.params.couponID) {
        res.status(400).send('Missing couponID in request');
        return;
    }

    /// get coupon id from req.params
    let couponID = req.params.couponID;
    console.debug('couponID:', couponID);

    /// call controller function
    let deletedCoupon = await deleteCoupon(couponID);

    /// check if deletedCoupon was deleted
    if (deletedCoupon) {
        res.status(500).send('Error deleting coupon');
        return;
    }

    /// send response
    res.status(200);
}