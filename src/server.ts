import * as Hapi from "hapi";
import { IServerConfigurations } from "./config";
import User from "./routes/User";
import Todo from "./routes/Todo";
import * as JWT from "./libs/jwt";
import { IDatabase } from "./models/database";

export async function init(
    configs: IServerConfigurations,
    database: IDatabase
): Promise<Hapi.Server> {
    try {
        const port = process.env.PORT || configs.port;
        const server = new Hapi.Server({
            debug: { request: ['error'] },
            port: port,
            routes: {
                cors: {
                    origin: ["*"]
                }
            }
        });

        if (configs.routePrefix) {
            server.realm.modifiers.route.prefix = configs.routePrefix;
        }

        const pluginOptions = {
            database: database,
            serverConfigs: configs
        };
        let jwt = require("./libs/jwt").default()
        await jwt.register(server, pluginOptions);

        console.log("All plugins registered successfully.");

        console.log("Register Routes");

        User(server, configs, database);
        Todo(server, configs, database);

        console.log("Routes registered sucessfully.");

        return server;
    } catch (err) {
        console.log("Error starting server: ", err);
        throw err;
    }
}
