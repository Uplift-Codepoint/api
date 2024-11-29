import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { notfound, errorHandler } from './middleware/errorMiddleware.js';
// import connectDb from "./connectDb.js";
// import pdfRoutes from './pdf/routes.js';
import userRoutes from './user/routes.js';
import whatsappRoutes from './whatsapp/routes.js';
import tokenRoute from "./token.js";
import jobsRoutes from "./jobs/routes.js"

dotenv.config();


const port = 7000;
// connectDb();

// connectMongoDb();

const app = express(); 

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cookieParser());

// app.use('/pdf', pdfRoutes);
app.use('/user', userRoutes);
app.use('/whatsapp', whatsappRoutes)
app.use('/token', tokenRoute)
app.use('/jobs', jobsRoutes)

app.get('/', (req, res) => res.send('Server is running nice and smooth.'));

app.use(notfound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));