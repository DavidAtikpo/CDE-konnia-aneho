import express from "express";
import bodyParser from "body-parser";
import dbConnect from "./dbConfig/config.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js"
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 7000;

dbConnect();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Corrected route definition
app.use('/user', userRouter);
app.use('/admin',adminRouter)

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
