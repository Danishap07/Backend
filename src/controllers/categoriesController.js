import categories from "../models/categories";

const addCategory = async (req, res) => {
    const { category_name, sub_category } = req.body;

    const duplicate = await categories.findOne({ name: category_name }).exec();
    if(duplicate) return res.status(400).json({ message: "This category already exist in our list."});

    try {
        const result = await categories.create({
            "name": category_name,
            "sub_category_name": sub_category
        })
        if(result) {
            return res.status(200).json({ message: "category created successfully."})
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
        
    
}

export default addCategory