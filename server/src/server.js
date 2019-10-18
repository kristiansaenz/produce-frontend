import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
const app = express();
import farmers from './routes/farmers'
const PORT = 4000;


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/farmers', farmers);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
  require('./utils/db')
  }
);

//to run server 'nodemon start.js'