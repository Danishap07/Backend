require('dotenv').config()
import express from 'express';
// import DatabaseConnection from './middlewere/dbConnection'
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes'
import { logger } from './middlewere/logger'
import corsOptions from './config/corsOptions';
import errorHandler from './middlewere/errorHandler';
import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'
import productRoutes from './routes/productRoutes'
import categoryRoutes from './routes/categoryRoutes'

import mongoose from 'mongoose'
import connectDB from './config/dbConnection';

const app = express();

connectDB();

const port = process.env.PORT||8000;

app.use(logger)

app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api', routes)

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    }
    else if(req.accepts('json')) {
        res.json({ message: "404 Not Found."})
    }
    else {
        res.type('txt').send("404 Not Found.")
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
  console.log("connected to mongoDB.")
  app.listen(port, () => console.log("Server is listening at port: "+ port));
})

