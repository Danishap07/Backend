import address from "../models/address";    

const createAddress = async (req,res) => {
    const {  address, city, state, pincode } = req.body;

    if(!address || !city || !state, !pincode) {
        return res.status(200).json({ status: false, message: "All fields are required."})
    }

    try {
        const result = await address.create({
            address: address,
            city: city,
            state: state,
            pincode: pincode
        })
        res.status(200).json({ status: true, message: "Address added successfully."})
    } catch (error) {
        res.status(400).json({ status: false, message: error})
    }
}

export { createAddress }