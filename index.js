import express, { json } from "express";
import dotenv from "dotenv";
import connectToDatabase from "./src/database/mongoose.database.js";
import TaskRouter from "./src/routes/task.routes.js";

//Dotenv Config
dotenv.config();
//Mongo DB Config
connectToDatabase();

//NodeJS Config
const PORT = process.env.PORT || 8000;
const app = express();
app.use(json());

//Routes
app.use("/tasks", TaskRouter);

//Server Config
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
