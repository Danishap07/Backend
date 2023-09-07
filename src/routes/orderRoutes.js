import express from 'express';
import { createAddress } from '../controllers/orderControllers';
const router = express.Router();

router.route('/create-address').post(createAddress);

export default router