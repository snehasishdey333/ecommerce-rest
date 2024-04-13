import express, { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt';
import User from '../models/User';
import { CustomError } from '../middlewares/error';
const router = express.Router()

//UPDATE
router.put("/update/:userId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) {
            throw new CustomError(404, "User not found!")
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hashSync(req.body.password, salt)
            req.body.password = hashedPassword
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedUser)

    }
    catch (error) {
        next(error)
    }
})

//GET
router.get("/:userId", async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params
    try {

        const user = await User.findById(userId)
        if (!user) {
            throw new CustomError(404, "User not found!")
        }
        res.status(200).json(user)

    }
    catch (error) {
        next(error)
    }
})

//DELETE
router.delete("/delete/:userId", async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params
    try {
        const userToDelete = await User.findById(userId)
        if (!userToDelete) {
            throw new CustomError(404, "User not found!")
        }
        await userToDelete.deleteOne()
        res.status(200).json({ message: "User deleted successfully!" })

    }
    catch (error) {
        next(error)
    }
})




export default router