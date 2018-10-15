import * as Mongoose from "mongoose";

export interface ITodo extends Mongoose.Document {
    text: string;
    finished: boolean;
    user: string;
    createdAt: Date;
    updateAt: Date;
}

export const TodoSchema = new Mongoose.Schema(
    {
        text: { type: String, required: true },
        user: { type: Mongoose.Schema.Types.ObjectId, required: true},
        finished: { type: Boolean, required: true },
    },
    {
        timestamps: true
    }
);

export const TodoModel = Mongoose.model<ITodo>("Todo", TodoSchema);
