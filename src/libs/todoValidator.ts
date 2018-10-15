import * as Joi from "joi";

export const createTodo = Joi.object().keys({
    text: Joi.string().trim().required(),
    finished: Joi.boolean().forbidden().default(false)
});

export const updateTodo = Joi.object().keys({
    id: Joi.string().trim().required(),
    text: Joi.string().trim().required(),
});

export const checkTodoId = Joi.object().keys({
    id: Joi.string().trim().required(),
});
