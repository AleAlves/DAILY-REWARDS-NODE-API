import { AuthRoutes } from "./auth/AuthRoutes"
import { NPSRoutes } from "./nps/NPSRoutes";
import { UserRoutes } from "./user/UserRoutes";
import { TaskRoutes } from "./task/TaskRoutes";

const API_ROOT = "/api/"

export class Router {

    public routes(app): void {
        new AuthRoutes(app, API_ROOT)
        new NPSRoutes(app, API_ROOT)
        new UserRoutes(app, API_ROOT)
        new TaskRoutes(app, API_ROOT)
    }
}