require('dotenv').config();

//#region REQUIRES
const express = require('express');
const cors = require('./middlewares/cors');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
//#endregion

const app = express();

//#region MIDDLEWARES
app.use(limiter);
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(errorHandler);
//#endregion

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`SERVER RUNNING`));