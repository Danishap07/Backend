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
        type: Number
    },
    stock_quantity: {
        type: Number,
        required: true
    },
    category_id: {
        type: mongoose.ObjectId,
        ref: "Categories",
        required: true,
    },
    sub_category_id: {
        type: mongoose.ObjectId,
        ref: "Categories.sub_category_id",
        required: true,
    },
    color: [
        {
            _id: String,
            images: [
                { 
                    image_uri: String,
                    image_name: String
                }
            ]
        }
    ],
    product_description: {
        type: String,
        required:true
    },
    size: [{
        type: String,
        required: true
    }]
})

export default mongoose.model("products", productSchema)