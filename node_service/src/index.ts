import express from 'express';
import { allCouponsGetHandler, cuponGetHandler, cuponPostHandler } from './routes/coupon';
import { couponPromotionsGetHandler, cuponPromotionPostHandler } from './routes/coupon_promotion';
import { dummyCouponPostHandler, dummyCouponPromotionPostHandler, dummyStorePostHandler, dummyUserPostHandler } from './routes/dummy';
import { formPostHandler, formResponsePostHandler, formsGetHandler } from './routes/form';
import { storeFormsGetHandler, storePostHandler, storesGetHandler } from './routes/store';
import { userPostHandler, usersGetHandler } from './routes/user';

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

/* specified routes */

/// route to create a new user
app.post('/user', userPostHandler);

/// route to get all coupons of a user
// TODO: get user from header
app.get('/coupons/:userID', cuponGetHandler);

/// get all forms of a store
app.get('/store/:storeID/forms', storeFormsGetHandler);

/// post response to a form
// TODO: get user from header
app.post('/form/response', formResponsePostHandler);

/* additional routes */

/// route to create a new store
app.post('/store', storePostHandler);

/// route to create a new coupon promotion
app.post('/coupon_promotion', cuponPromotionPostHandler);

/// route to create a new form
app.post('/form', formPostHandler);

/// route to create a new coupon (kinda pointless)
app.post('/coupon', cuponPostHandler);

/* dummy creation routes */

/// route to create a dummy user
app.post('/dummy/user', dummyUserPostHandler);

/// route to create a dummy coupon
app.post('/dummy/coupon', dummyCouponPostHandler);

/// route to create a dummy coupon promotion
app.post('/dummy/coupon_promotion', dummyCouponPromotionPostHandler);

// /// route to create a dummy store
app.post('/dummy/store', dummyStorePostHandler);

// /// route to create a dummy form
// app.post('/dummy/form', dummyFormPostHandler);

/* admin routes */

/// route to get all users
app.get('/users', usersGetHandler);

/// route to get all stores
app.get('/stores', storesGetHandler);

/// route to get all forms
app.get('/forms', formsGetHandler);

/// route to get all coupon promotions
app.get('/coupon_promotions', couponPromotionsGetHandler);

/// route to get all coupons
app.get('/coupons', allCouponsGetHandler);