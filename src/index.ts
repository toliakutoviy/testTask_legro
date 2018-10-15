import * as Server from "./server";
import * as Database from "./models/database";
import * as Configs from "./config";

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});

// Define async start function
const start = async ({ config}) => {
    try {

        const server = await Server.init(config);
        await server.start();
        console.log("Server running at:", server.info.uri);
    } catch (err) {
        console.error("Error starting server: ", err.message);
        throw err;
    }
};

// Init Database
const dbConfigs = Configs.getDatabaseConfig();
const database = Database.init(dbConfigs);

// Starting Application Server
const serverConfigs = Configs.getServerConfigs();

// Start the server
start({ config: serverConfigs});
