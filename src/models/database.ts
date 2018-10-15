import * as Mongoose from "mongoose";
import { IDataConfiguration } from "../config";

export function init(config: IDataConfiguration): any {
    (<any>Mongoose).Promise = Promise;
    Mongoose.connect(process.env.MONGO_URL || config.connectionString);

    let mongoDb = Mongoose.connection;

    mongoDb.on("error", () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once("open", () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    return {};
}
