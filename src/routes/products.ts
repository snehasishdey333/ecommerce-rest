import express, { NextFunction, Request, Response } from 'express'
import Product from '../models/Product'
const router = express.Router()

//CREATE (ONLY FOR ADMIN)
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    }
    catch (error) {
        next(error)
    }
})

//SEARCH
router.get("/search/:query", async (req: Request, res: Response, next: NextFunction) => {
    const query = req.params.query
    try {

        const products = await Product.find({
            $or: [
                { name: { $regex: new RegExp(query, 'i') } },
                { category: { $regex: new RegExp(query, 'i') } }
            ]
        })
        res.status(200).json(products)

    }
    catch (error) {
        next(error)
    }
})

//GET ALL
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)

    }
    catch (error) {
        next(error)
    }
})

//GET PRODUCTS BASED ON CATEGORY
router.get("/:category", async (req: Request, res: Response, next: NextFunction) => {
    const category = req.params.category
    try {
        const products = await Product.find({ category })
        res.status(200).json(products)

    }
    catch (error) {
        next(error)
    }
})

//GET
router.get("/get/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        res.status(200).json(product)

    }
    catch (error) {
        next(error)
    }
})


export default router