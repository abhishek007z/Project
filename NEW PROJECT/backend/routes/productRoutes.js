import express from "express";
import { createProduct, getAllProduct,updateProduct,deleteProduct,getProduct } from "../controllers/productControlers.js";

const router = express.Router();

router.get("/",getAllProduct); //Get all product
router.get("/:id",getProduct);
router.post("/",createProduct); //Create a new product
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);



export default router;