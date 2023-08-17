import express from 'express';
const router = express.Router();
import { createProduct, getProduct } from '../controllers/productsControllers'
import verifyJWT from '../middlewere/verifyJWT';

router.use(verifyJWT)

router.route('/create-product').post(createProduct);
router.route('/:product_id').get(getProduct); 


export default router
