import { Express } from "express"
import tasksRoutes from "../../app/features/tasks/tasks.routes";
import usersRoutes from "../../app/features/users/users.routes";

export default (app: Express) => {
    app.get("/", (request, response) => response.status(200).send("API RODANDO"));

    app.use("/user", usersRoutes());

    app.use("/user", tasksRoutes());
}