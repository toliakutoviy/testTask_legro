import * as Hapi from "hapi";
import TodoController from "../controllers/Todo";
import * as TodoValidator from "../libs/todoValidator";
import { IDatabase } from "../models/database";
import { IServerConfigurations } from "../config";
import {jwtValidator} from "../libs/userValidator";

export default function(
    server: Hapi.Server,
    serverConfigs: IServerConfigurations,
    database: IDatabase
) {
    const controller = new TodoController(serverConfigs, database);
    server.bind(controller);

    server.route({
        method: "POST",
        path: "/todoItem/create",
        options: {
            handler: controller.createTodoItem,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Get task by id.",
            validate: {
                payload: TodoValidator.createTodo,
                headers: jwtValidator
            },
        }
    });
    server.route({
        method: "POST",
        path: "/todoItem/update",
        options: {
            handler: controller.editTodoItem,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Get task by id.",
            validate: {
                payload: TodoValidator.updateTodo,
                headers: jwtValidator
            },
        }
    });

    server.route({
        method: "POST",
        path: "/todoItem/finish/{id}",
        options: {
            handler: controller.finishTodoItem,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Get task by id.",
            validate: {
                params: TodoValidator.checkTodoId,
                headers: jwtValidator
            },
        }
    });
    server.route({
        method: "DELETE",
        path: "/todoItem/delete/{id}",
        options: {
            handler: controller.deleteTodoItem,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Get task by id.",
            validate: {
                params: TodoValidator.checkTodoId,
                headers: jwtValidator
            },
        }
    });
    server.route({
        method: "GET",
        path: "/todoItem/listTodoItems",
        options: {
            handler: controller.listTodoItems,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Get task by id.",
            validate: {
                headers: jwtValidator
            },
        }
    });
}
