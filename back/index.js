import express from 'express';
import router from './app/router/index.js';
import errorHandler from './app/middlewares/errorHandler.js';
import cors from 'cors';

const app = express();

app.use(cors('*'));

app.use(express.static('front/assets'))

app.use(express.json());

app.use(router)

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Le serveur est en marche, sur http://localhost:${PORT}`)
});