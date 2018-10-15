import * as Hapi from "hapi";

export interface ICredentials extends Hapi.AuthCredentials {
    id: string;
}

export interface IRequestAuth extends Hapi.RequestAuth {
    credentials: ICredentials;
}

export interface IRequest extends Hapi.Request {
    auth: IRequestAuth;
}

export interface ILoginRequest extends IRequest {
    payload: {
        email: string;
        password: string;
    };
}

export interface ICreateTodoItem extends IRequest{
    payload: {
        text: string
    }
}

export interface IUpdateTodoItem extends IRequest{
    payload: {
        id: string,
        text: string
    }
}

export interface IFinishTodoItem extends IRequest{
    payload: {
        id: string
    }
}
