import express, { Router } from "express";
import TaskModel from "../models/task.model.js";
import TaskController from "../controllers/task.controller.js";

const router = Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTaskById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).createTask();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).updateTask();
});

export default router;
