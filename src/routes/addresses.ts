import express, { NextFunction, Request, Response } from 'express'
import Address from '../models/Address'
const router = express.Router()

//CREATE
router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    const newAddress = new Address(req.body)
    try {
        const savedAddress = await newAddress.save()
        res.status(201).json(savedAddress)
    }
    catch (error) {
        next(error)
    }
})

//UPDATE
router.put("/update/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedAddress)

    }
    catch (error) {
        next(error)
    }
})

//DELETE
router.delete("/delete/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Address.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Address has been deleted!" })
    }
    catch (error) {
        next(error)
    }
})

//GET USER ADDRESSES
router.get("/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const addresses = await Address.find({ user: req.params.userId })
        res.status(200).json(addresses)
    }
    catch (error) {
        next(error)
    }
})


export default router