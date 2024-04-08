import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";



// .......................create categorycontroller.........................
 export const createCategoryController = async (req, res) => {
    try {

        const { name } = req.body;
        console.log(req.body)
        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }
        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exisits",
            }); 
        }
        const category = await new categoryModel({
            name,
            slug: slugify(name),
        }).save();
        res.status(201).send({
            success: true,
            message: "new category created",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Errro in Category",
        });
    }
};




// Update Category Controller
export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );

        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Category Updated Successfully",
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating category",
        });
    }
};

// Get All Categories Controller
export const categoryControlller = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Categories List",
            categories,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching categories",
        });
    }
};

// Delete Category Controller
export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await categoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error,
        });
    }
};




