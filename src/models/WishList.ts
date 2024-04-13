import mongoose, { Schema } from "mongoose";
import { CartType, WishListType } from "../types/types";

const WishlistSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [{
        product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    }],
})

const WishList = mongoose.model<WishListType>('WishList', WishlistSchema)

export default WishList