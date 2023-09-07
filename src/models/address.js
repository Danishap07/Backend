import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    address: {type: String, required},
    city: {type: String, required},
    state: {type: String, required},
    pincode: {type: String, required}
})

export default mongoose.model("addressSchema", addressSchema)
