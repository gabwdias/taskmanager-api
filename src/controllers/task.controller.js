import mongoose, { mongo } from "mongoose";
import { invalidIDError, notFoundError } from "../errors/database.errors.js";
import { notEditableFieldError } from "../errors/general.errors.js";
import TaskModel from "../models/task.model.js";

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);
            if (!task) {
                return notFoundError(this.res);
            }
            this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return invalidIDError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async create() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async delete() {
        try {
            const taskId = this.req.params.id;
            const taskToDelete = await TaskModel.findById(taskId);
            if (!taskToDelete) {
                return notFoundError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return invalidIDError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async update() {
        try {
            const taskId = this.req.params.id;
            const taskToUpdate = await TaskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowedFields = ["isCompleted"];
            const requestedUpdates = Object.keys(this.req.body);

            for (const update of requestedUpdates) {
                if (allowedFields.includes(update)) {
                    taskToUpdate[update] = this.req.body[update];
                } else {
                    console.log("ERROR");
                    return notEditableFieldError(this.res, allowedFields);
                }
            }

            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return invalidIDError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }
}

export default TaskController;
