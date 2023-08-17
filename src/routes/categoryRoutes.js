import express from 'express';
import addCategory from '../controllers/categoriesController';
const router = express.Router();

router.route('/add-category').post(addCategory);

export default router