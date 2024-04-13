import express, { NextFunction, Request, Response } from 'express'
import WishList from '../models/WishList'
import { CustomError } from '../middlewares/error'
const router = express.Router()

//ADD
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, productId } = req.body
        let wishlist = await WishList.findOne({ user: userId })
        if (!wishlist) {
            wishlist = await WishList.create({ user: userId, products: [] })
        }

        if (wishlist.products.find(item => item.product.toString() === productId)) {
            throw new CustomError(400, "Product already exists in the wishlist!")
        }
        wishlist.products.push({ product: productId })
        await wishlist.save()
        res.status(200).json({ message: "Product added to wishlist successfully!" })

    }
    catch (error) {
        next(error)
    }
})

//REMOVE
router.post("/remove", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, productId } = req.body
        let wishlist = await WishList.findOne({ user: userId })
        if (!wishlist) {
            throw new CustomError(404, "Wishlist not found!")
        }
        wishlist.products = wishlist.products.filter(item => item.product.toString() !== productId)
        await wishlist.save()
        res.status(200).json({ message: "Product removed from wishlist!" })

    }
    catch (error) {
        next(error)
    }
})

//GET USER WISHLIST
router.get("/:userId", async (req: Request, res: Response, next: NextFunction) => {

    try {
        const wishlist = await WishList.findOne({ user: req.params.userId }).populate("products.product")
        if (!wishlist) {
            throw new CustomError(404, "Wishlist not found!")
        }
        res.status(200).json(wishlist)

    }
    catch (error) {
        next(error)
    }
})


export default router