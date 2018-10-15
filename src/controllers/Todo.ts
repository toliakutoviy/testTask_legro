import * as Hapi from "hapi";

import { IServerConfigurations } from "../config";
import {IRequest, ICreateTodoItem, IUpdateTodoItem, IFinishTodoItem} from "../interfaces/request";
import {TodoModel} from "../models/Todo";
import * as Boom from "boom";

export default class TodoListController {
    private configs: IServerConfigurations;

    constructor(configs: IServerConfigurations) {
        this.configs = configs;
    }

    public async createTodoItem(request: ICreateTodoItem, h: Hapi.ResponseToolkit) {
        try {
            let data: any = {
                text: request.payload.text,
                finished: false,
                user: request.auth.credentials.id
            };
            let todo: any = await TodoModel.create(data);
            return h.response(todo).code(201);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }
    public async editTodoItem(request: IUpdateTodoItem, h: Hapi.ResponseToolkit) {
        try {
            const { id, text } = request.payload;
            const todo: any = await TodoModel.findById(id);
            if (todo.user != request.auth.credentials.id) {
                return h.response({error: "Unathorized"}).code(400)
            }
            if (!todo.finished ) {
                todo.text = text;
                await todo.save();
            }
            return h.response(todo).code(201);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async deleteTodoItem(request: IRequest, h: Hapi.ResponseToolkit) {
        const { id } = request.params;
        const todo: any = await TodoModel.findById(id);
        if (todo.user != request.auth.credentials.id) {
            return h.response({error: "Unathorized"}).code(400)
        }
        await todo.remove();
        return h.response({message: "succes"}).code(200);
    }

    public async finishTodoItem(request: IFinishTodoItem, h: Hapi.ResponseToolkit) {
        try {
            const { id } = request.params;
            const todo: any = await TodoModel.findById(id);
            if (todo.user != request.auth.credentials.id) {
                return h.response({error: "Unathorized"}).code(400)
            }
            if (!todo.finished ) {
                todo.finished = true;
                await todo.save();
            }
            return h.response(todo).code(201);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }

    public async listTodoItems(request: IRequest, h: Hapi.ResponseToolkit) {
        try {
            const todos: any = await TodoModel.find({user: request.auth.credentials.id}).sort([["createdAt", -1]]);

            return h.response(todos).code(201);
        } catch (error) {
            return Boom.badImplementation(error);
        }
    }
 }
