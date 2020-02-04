import * as mongoose from 'mongoose';
import { Request, Response } from "express";
import { BaseController } from "../BaseController"
import { HTTPStatus } from '../../models/http/HTTPStatus';
import { TaskSchema } from '../../models/task/Task';

const Task = mongoose.model('Task', TaskSchema);

export class TaskController extends BaseController {

    public add(req: Request, res: Response) {

        let newTask = new Task(req.body);

    }

    public get(req: Request, res: Response) {
        Task.find({}, (err, task) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

    public getByID(req: Request, res: Response) {
        Task.findById(req.params.taskID, (err, task) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

    public update(req: Request, res: Response) {
        Task.findOneAndUpdate({ _id: req.params.taskID }, req.body, { new: true }, (err, task) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

    public delete(req: Request, res: Response) {
        Task.remove({ _id: req.params.taskID }, (err, task) => {
            if (err) {
                super.send(res, undefined, undefined, new HTTPStatus.CLIENT_ERROR.BAD_REQUEST);
            }
            super.send(res, task);
        });
    }

}