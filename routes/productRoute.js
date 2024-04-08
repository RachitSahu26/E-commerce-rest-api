import express from "express";


import { requireSignIn } from "../middleware/SignInRequrie.js";
import {   createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryBaseController, productFiltersController, productPhotoController, updateProductController } from "../controllers/productController.js";
// import braintree from "braintree";

import formidable from 'express-formidable';

const router = express.Router();

// .............CreateRoutes..........
router.post(
    "/create-product",
    requireSignIn,
    formidable(),
    createProductController
);



// .............UpdataRoutes..........
router.put(
    "/update-product/:pid",
    requireSignIn,
    updateProductController
);

// .............Get All Product Routes..........
router.get("/get-product", getProductController)
// ................get photo.........
router.get("/product-photo/:pid", productPhotoController)

//single product
router.get("/get-product/:slug", getSingleProductController);


//delete product
router.delete("/delete-product/:pid", deleteProductController);


// ..............filter...........
router.post("/filter-product", productFiltersController);

// .............product category base........
router.get("/category-base-product/:slug", productCategoryBaseController);



// // ..............payment braintree TokenExpiredError........
// router.get("/braintree/token", braintreeTokenController);

// // ....................payment  ................
// router.post("/braintree/payment", requireSignIn, braintreePaymentController);




// // ........................wishlist  ADD ...............
// router.post('/addWishlist',WishListAddController)



// // ........................wishlist  Remove...............
// router.post('/removeWishlist',WishListRemoveController)



// // .......................get wishlist ...............
// router.get('/getWishlist',WishListGetItemController)



export default router;