import products from "../models/products";

const createProduct = async (req, res) => {
    const { product_name, actual_price, discounted_price, stock_quantity, category_id, sub_category_id, color, product_description, size } = req.body;
    const { images } = req.files
    // var isValid = true;
    if(!product_name) {
       return res.status(400).json({ error: "Bad Request", message: "Product name is required." })
    }
    else if(!actual_price) {
        return res.status(400).json({ error: "Bad Request", message: "Actual Price is required." })
     }
    else if(!discounted_price) {
        return res.status(400).json({ error: "Bad Request", message: "Discounted Price is required." })
     }
    else if(!stock_quantity) {
        return res.status(400).json({ error: "Bad Request", message: "Stock Quantity is required." })
     }
    else if(!category_id) {
        return res.status(400).json({ error: "Bad Request", message: "Category ID is required." })
     }
    else if(!sub_category_id) {
        return res.status(400).json({ error: "Bad Request", message: "subCategory ID is required." })
     }
    else if(!color) {
        return res.status(400).json({ error: "Bad Request", message: "Color of product is required." })
     }
    else if(!product_description) {
        return res.status(400).json({ error: "Bad Request", message: "Product_description is required." })
     }
    else if(!size) {
        return res.status(400).json({ error: "Bad Request", message: "Size is required." })
     }
    try{
     const result = await products.create({
        "product_name": product_name,
        "actual_price": actual_price,
        "discounted_price": discounted_price,
        "stock_quantity": stock_quantity,
        "category_id": category_id,
        "sub_category_id": sub_category_id,
        "color": [
            {
                "_id": color,
                "images": images
            }
        ],
        "product_description": product_description,
        "size": size
     })
     console.log(result);
     return res.status(200).json({ message: `New Product ${product_name} created successfully.` })
    } 
    catch (error) {
        return res.status(500).json({ message: error.message})
    }
}

 const getProduct = async (req, res) => {
    const { product_id } = req.param;

    try {
        const result = await products.findById({ _id: product_id}).exec();
        if(result) {
            return res.status(201).json({ status: true, message: result });
        }
        else {
            return res.status(401).json({ message: "Their is no product with specified product_id."})
        }
    }
    catch (err) {
        return res.status(400).json({ error: err.messsage })
    }
}

export {
    createProduct,
    getProduct
}