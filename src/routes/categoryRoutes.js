import express from 'express';
import {addCategory, getAllCategories} from '../controllers/categoriesController';
const router = express.Router();

router.route('/add-category').post(addCategory);

router.route('/categories').get(getAllCategories);

export default router
