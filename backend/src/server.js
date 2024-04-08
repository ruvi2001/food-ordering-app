import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js';

import { dbconnect } from './config/database.config.js';
dbconnect();

const app = express();
app.use(express.json());
app.use(
    cors({
   credentials:true,
   origin : ['http://localhost:3000'],

})
);

app.use('/api/foods', foodRouter);




const PORT= 5000;
app.listen(PORT, () => {
   console.log('Listening on port ' + PORT);

});



