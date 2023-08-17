import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name: {
        type: String
    },
    sub_category_name: [
        {
            name: String
        }
    ]
})

export default mongoose.model("categorieSchema", categoriesSchema)