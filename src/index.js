require('dotenv').config();

//#region REQUIRES
const express = require('express');
const cors = require('./middlewares/cors');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
//#endregion

//#region DB REQUIRE & CONNECTION
const connectDB = require('./database/config');
connectDB();
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

//#region ROUTES REQUIRE & IMPLEMENTATION
const authRouter = require('./routes/authRouter');
const listingRouter = require('./routes/listingRouter');

app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
//#endregion

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`SERVER RUNNING`));