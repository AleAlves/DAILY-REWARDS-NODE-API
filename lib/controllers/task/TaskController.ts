import * as mongoose from 'mongoose';
import { Request, Response } from "express";
import { HTTPStatus } from '../../models/http/HTTPStatus';

import { TaskSchema } from '../../models/task/Task';

import { CryptoTools } from "../../security/CryptoTools";
import { JWTSession } from "../../security/JWT/model/JWTSession";
import { Logger } from '../../tools/Logger'

import { BaseController } from "../BaseController"

import { AddTaskUseCase } from "../../usecase/task/AddTaskUseCase"
import { GetTasksUseCase } from "../../usecase/task/GetTasksUseCase"
import { GetTasksLimitUseCase } from "../../usecase/task/GetTasksLimitUseCase"
import { UpdateTaskUseCase } from "../../usecase/task/UpdateTaskUseCase"
import { DeleteTaskUseCase } from "../../usecase/task/DeleteTaskUseCase"

const Task = mongoose.model('Task', TaskSchema);

export class TaskController extends BaseController {

    public create(req: Request, res: Response) {

        let addUseCase = new AddTaskUseCase()
        let limitUseCase = new GetTasksLimitUseCase()

        const token = new JWTSession(req.params.session);

        limitUseCase.verifyTaskLimit(token.uid, (error) => {

            if (error) {
                super.onError(res, error);
            }
            else {

                let taskModel = Task(JSON.parse(JSON.stringify(req.body.data)))

                Logger.log(taskModel, TaskController.name, "add")

                addUseCase.saveTask(token.uid, taskModel, (error, task) => {

                    if (error) {
                        super.onError(res, new HTTPStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR, error);
                    }
                    else {
                        super.send(res, task, new HTTPStatus.SUCESS.CREATED)
                    }
                })
            }
        })
    }

    public get(req: Request, res: Response) {

        let getTasksUseCase = new GetTasksUseCase()

        getTasksUseCase.get(req.params.uid, (error, tasks) => {
            if (error) {
                super.onError(res, new HTTPStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR, error);
            }
            else {
                super.send(res, tasks);
            }
        })
    }

    public update(req: Request, res: Response) {

        let updateTaskUseCase = new UpdateTaskUseCase()

        updateTaskUseCase.update(req.params.taskID, req.body, (error, task) => {
            if (error) {
                super.onError(res, new HTTPStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR, error);
            }
            else {
                super.send(res, task)
            }
        })
    }

    public delete(req: Request, res: Response) {

        let deleteTaskUseCase = new DeleteTaskUseCase()

        deleteTaskUseCase.delete(req.params.taskID, (error, task) => {
            if (error) {
                super.onError(res, new HTTPStatus.SERVER_ERROR.INTERNAL_SERVER_ERROR, error);
            }
            else {
                super.send(res, task)
            }
        })
    }

}