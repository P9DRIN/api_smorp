import mongoose from 'mongoose'


const AccountSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    }, 
    address: {
        type: Array,
        required: true,
    },
    orders: {
        type: Array,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    }
})

export default mongoose.model("Account", AccountSchema)