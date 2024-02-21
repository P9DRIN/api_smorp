import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productLDescription: {
        type: String,
        required: false
    },
    productSDescription: {
        type: String,
        required: false
    },
    productPostDate: {
        type: String,
        required: true,
    },
    productExpiresAt: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Product", productSchema)