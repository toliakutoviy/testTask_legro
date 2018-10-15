import * as Hapi from "hapi";
import UserController from "../controllers/User";
import * as UserValidator from "../libs/userValidator";
import { IServerConfigurations } from "../config";

export default function(
    server: Hapi.Server,
    serverConfigs: IServerConfigurations,
) {
    const userController = new UserController(serverConfigs);
    server.bind(userController);

    server.route({
        method: "POST",
        path: "/users/signup",
        options: {
            handler: userController.createUser,
            auth: false,
            tags: ["api", "users"],
            description: "Create a user.",
            validate: {
                payload: UserValidator.createUserModel
            }
        }
    });
    server.route({
        method: "GET",
        path: "/users",
        options: {
            handler: () => 'hi world',
            auth: false,
            tags: ["api", "users"],
            description: "Create a user.",
        }
    });

    server.route({
        method: "POST",
        path: "/users/signin",
        options: {
            handler: userController.loginUser,
            auth: false,
            tags: ["api", "users"],
            description: "Login a user.",
            validate: {
                payload: UserValidator.loginUserModel
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "User logged in."
                        }
                    }
                }
            }
        }
    });
}
