import express from "express";
import { isAdmin, requireSignIn } from "../middleware/SignInRequrie.js";
import { createProductController } from "../controllers/productController.js";
import { categoryControlller, createCategoryController, deleteCategoryController, updateCategoryController } from "../controllers/createCategoryController.js";
// import createCategoryController, { categoryControlller, deleteCategoryController, updateCategoryController } from "../controllers/createCategoryController.js";


const router = express.Router()




//routes
// create category
router.post(
    "/create-category",
    requireSignIn,
    createCategoryController,
);






// update category
router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
);


//getALl category
router.get("/get-category", categoryControlller);



//delete category
router.delete("/delete-category/:id",
    requireSignIn,
    isAdmin,
    deleteCategoryController
)



export default router;