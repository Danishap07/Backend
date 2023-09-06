import express from 'express';
const router = express.Router();
import { createProduct, getCategoryProducts, getProduct, searchProducts } from '../controllers/productsControllers'
import verifyJWT from '../middlewere/verifyJWT';

// router.use(verifyJWT)

router.route('/create-product').post(verifyJWT, createProduct);

router.route('/search').get(searchProducts)

router.route('/:product_id').get(getProduct); 

router.route('/category/:category_id').get(getCategoryProducts)

export default router
