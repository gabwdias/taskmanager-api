import express, { Router } from "express";
import TaskModel from "../models/task.model.js";
import TaskController from "../controllers/task.controller.js";

const router = Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getAll();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).create();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).delete();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).update();
});

export default router;
