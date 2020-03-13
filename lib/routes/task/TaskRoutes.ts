
import { BaseRouter } from "../base/BaseRouter"
import { TaskController } from "../../controllers/task/TaskController"

export class TaskRoutes extends BaseRouter {

    private app: any
    private root: String
    private taskController: TaskController = new TaskController()

    constructor(app: any, root: String) {
        super()
        this.app = app
        this.root = root
        this.add()
        this.get()
        this.update()
        this.delete()
    }

    private add() {
        this.app.route(this.root + "v1" + '/task').post(super.sessionControl(), this.taskController.create)
    }

    private get() {
        this.app.route(this.root + "v1" + '/task').get(super.sessionControl(), this.taskController.get)
    }

    private update() {
        this.app.route(this.root + "v1" + '/task/?taskID=').put(super.sessionControl(), this.taskController.update)
    }

    private delete() {
        this.app.route(this.root + "v1" + '/task/:taskID').delete(super.sessionControl(), this.taskController.delete)
    }
}