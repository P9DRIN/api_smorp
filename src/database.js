import mongoose from "mongoose";
import * as dotenv from 'dotenv'

dotenv.config({ path: './.env.local'})

const connect = async () => {
    try {
        mongoose.set("strictQuery", true);
        mongoose.connect(process.env.MONGODB_URI);
        console.log("Banco conectado com sucesso!");
    } catch (error) {
        console.log("Error: ", error.message);
    }
}

export default {connect};