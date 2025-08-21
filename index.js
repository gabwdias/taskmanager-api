import express, { json } from "express";
import dotenv from "dotenv";
import connectToDatabase from "./src/database/mongoose.database.js";

import TaskModel from "./src/models/task.model.js";

//Dotenv Config
dotenv.config();
//Mongo DB Config
connectToDatabase();

//NodeJS Config
const PORT = process.env.PORT || 8000;
const app = express();
app.use(json());

//Routes
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error);
    }
});

//Server Config
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
