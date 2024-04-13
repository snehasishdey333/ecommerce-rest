import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/connectDB'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth'
import userRoute from './routes/users'
import productRoute from './routes/products'
import addressRoute from './routes/addresses'
import orderRoute from './routes/orders'
import cartRoute from './routes/carts'
import wishlistRoute from './routes/wishlists'
import { errorHandler } from './middlewares/error'
import verifyToken from './middlewares/verifyToken'

const app = express()

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRoute)
app.use("/api/user", verifyToken, userRoute)
app.use("/api/product", productRoute)
app.use("/api/address", verifyToken, addressRoute)
app.use("/api/order", verifyToken, orderRoute)
app.use("/api/cart", verifyToken, cartRoute)
app.use("/api/wishlist", verifyToken, wishlistRoute)


app.use(errorHandler)

app.listen(process.env.PORT, () => {
    connectDB()
    console.log("Server is running!")
})