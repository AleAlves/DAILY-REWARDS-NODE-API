
import { BaseRouter } from "../base/BaseRouter"
import { GroupController } from "../../controllers/group/GroupController"

export class GroupRouter extends BaseRouter {


    private app: any
    private root: String
    private groupController: GroupController = new GroupController()

    constructor(app: any, root: String) {
        super()
        this.app = app
        this.root = root
        this.get()
        this.create()
        this.update()
        this.delete()
    }

    private create() {
        this.app.route(this.root + "v1" + '/group').post(super.sessionControl(), this.groupController.create)
    }

    private get() {
        this.app.route(this.root + "v1" + '/group').get(super.sessionControl(), this.groupController.get)
    }

    private update() {
        this.app.route(this.root + "v1" + '/group/:groupID').post(super.sessionControl(), this.groupController.update)
    }

    private delete() {
        this.app.route(this.root + "v1" + '/group/:groupID').delete(super.sessionControl(), this.groupController.delete)
    }
}