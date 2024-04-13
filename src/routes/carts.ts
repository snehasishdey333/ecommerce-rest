import express, { NextFunction, Request, Response } from 'express'
import Cart from '../models/Cart'
import { CustomError } from '../middlewares/error'
const router = express.Router()

//ADD TO CART
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, productId, quantity } = req.body
        let cart = await Cart.findOne({ user: userId })
        if (!cart) {
            cart = await Cart.create({ user: userId, products: [] })
        }

        const existingProductIndex = cart.products.findIndex(item => item.product.toString() === productId)
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity
        } else {
            cart.products.push({ product: productId, quantity })
        }

        await cart.save()
        res.status(201).json({ message: "Item added to cart successfully!" })

    }
    catch (error) {
        next(error)
    }
})

//REMOVE
router.post("/remove", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, productId } = req.body
        const cart = await Cart.findOne({ user: userId })
        if (!cart) {
            throw new CustomError(404, "Cart not found!")
        }

        const productIndex = cart.products.findIndex(item => item.product.toString() === productId)
        if (productIndex !== -1) {
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity -= 1
            } else {
                cart.products.splice(productIndex, 1)
            }

            await cart.save()
            res.status(200).json({ message: "Item removed from cart!" })
        }
        else {
            throw new CustomError(404, "Product not found in cart!")
        }

    }
    catch (error) {
        next(error)
    }
})

//GET USER CART
router.get("/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params
        const cart = await Cart.findOne({ user: userId }).populate("products.product")
        if (!cart) {
            throw new CustomError(404, "Cart not found!")
        }
        res.status(200).json(cart)
    }
    catch (error) {
        next(error)
    }
})

export default router