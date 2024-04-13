import mongoose from "mongoose";

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log("database is connected successfully!")

    }
    catch (error) {
        console.log(error)
    }
}

export default connectDB