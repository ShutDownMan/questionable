import { Request, Response } from "express";
import { assert } from 'superstruct'
import { getAllCouponPromotions, insertCouponPromotion } from "../controller/coupon_promotion";
import { CouponPromotionPostValidationModel } from "../model/coupon_promotion";

export async function cuponPromotionPostHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling coupon promotion POST request');

    /// validate req.body
    let reqBody = req.body;
    console.debug('reqBody:', reqBody);
    try {
        assert(reqBody, CouponPromotionPostValidationModel);
    } catch (error: any) {
        res.status(400).send(error);
        return;
    }

    console.debug('validated reqBody', reqBody);

    /// call controller function
    let newCupon = await insertCouponPromotion({
        id: undefined,
        ...reqBody,
    });

    /// check if newCupon is null
    if (newCupon === null) {
        res.status(500).send('Error creating new coupon promotion');
        return;
    }

    /// send response
    res.status(202).send(newCupon);
}

/// route to get all coupon promotions
export async function couponPromotionsGetHandler(req: Request, res: Response, next: Function): Promise<void> {
    console.debug('Handling coupon promotions GET request');

    /// call controller function
    let cupons = await getAllCouponPromotions();

    /// check if cupons is null
    if (cupons === null) {
        res.status(500).send('Error getting coupon promotions');
        return;
    }

    /// send response
    res.status(200).send(cupons);
}