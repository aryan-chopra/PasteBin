import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbURI = process.env.MONGO_URI

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to database successfully")
    } catch(error) {
        console.error("Error connecting to the database: ", error)
    }
}

export default connectToDatabase