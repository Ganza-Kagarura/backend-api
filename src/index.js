import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import allRoutes from './routes/all.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import response from './utils/response.util.js';
import swaggerUi from 'swagger-ui-express';
import docs from './documentation/index.js'
import multer from 'multer';
import {MongoClient} from "mongodb"

const app = express();
const corsOpts = {
    origin: '*',
    
    methods: [
    'GET',
    'POST',
    'DELETE',
    'PATCH',
    'PUT'
    ],
    
    allowedHeaders: [
    'Content-Type',
    'Authorization',
    ],
    };
app.use(cors(corsOpts));
dotenv.config();
app.use(cookieParser())
app.use(bodyParser.json())


app.get('/',(req, res) => response.success(res, 200,"welcome to the back-end of my project use /api-docs to get the swagger documentation "));
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(docs));
app.use(allRoutes);
mongoose.set('strictQuery', true);
const client = await new  MongoClient("mongodb+srv://isaacganza22:Pedegree22@cluster0.icejzoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
// const client =  mongoose.connect("mongodb+srv://isaacganza22:Pedegree22@cluster0.icejzoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });
async function run(){
    try {
        await client.connect();
        // const db = client.db("QuizApp");
        // const collection = db.collection("");
        // const documents = await collection.find({}).toArray();
        // console.log(documents)
        console.log("db connected")
    } catch (error) {
        console.log(error)
    }
}
run();
const port = process.env.PORT;
//  mongoose.connect(`${process.env.MONGODBURL}`, { useNewUrlParser: true, useUnifiedTopology: true });
 app.listen(4000);
 console.log(`the server is listening at http://localhost:${4000}`);
