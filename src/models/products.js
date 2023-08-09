import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_name: { 
        type: String,
        required: true
    },
    actual_price: {
        type: Number,
        required: true
    },
    discounted_price: {
        type: Number,
        required: true
    },
    
})

export default mongoose.model("products", productSchema)