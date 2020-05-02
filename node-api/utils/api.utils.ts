export enum APIStatusEnum {
    Success = 200,
    Created = 201,
    Bad_Request = 400,
    Unauthorized = 401,
    Forbidden = 403,
    Internal_Server_Error = 500
};

// Definir objeto de Respuesta
export const APIUtils = (ENV:any) => {
    return {
        BodyResponse: (status: APIStatusEnum, description: string, message: string, result: any = null, error: any = null) => {
            return {
                microService: ENV.NAME,
                environment: ENV.ENVIROMENT,
                status,
                description,
                message,
                result,
                error
            }
        }
    }
}