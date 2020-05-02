import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
// API Utils Import
import {APIUtils, APIStatusEnum} from '../utils/api.utils';

// AL poner esta funció como default le podemos dar un nombre cualquiera a la función desde dónde se mande llamar.
export default (CONFIG:any) => {
    const apiUtils = APIUtils(CONFIG);
    return{
        verify: (req: Request, res: Response, next: NextFunction) => {
            const bearerHeader = req.headers['authorization'];
            if(typeof bearerHeader !== 'undefined'){
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];

                jwt.verify(bearerToken, CONFIG.TOKEN.SECRETKEY, (err: any, tokenDecoded:any) => {
                    if(err) {
                        return res.status(APIStatusEnum.Forbidden).json(
                            apiUtils.BodyResponse(
                                APIStatusEnum.Forbidden,
                                // Descripcion
                                'Acceso prohibido al verificar el token (Middleware TOKEN´s)',
                                // Mensaje
                                'El Token proporcionado, no es Token Válido. Favor de Verificar',
                                // Result
                                {},
                                // Error
                                err,
                                
                            )
                        );
                    }
                    req.body.authUser = tokenDecoded;
                    next();
                } );
            }
            else{
                // Unauthorized
                return res.status(APIStatusEnum.Unauthorized).json(
                    apiUtils.BodyResponse(
                        APIStatusEnum.Unauthorized,
                        // Descripcion
                        'Acceso NO autorizado (Middleware TOKEN´s)',
                        // Mensaje
                        'Necesita proporcionar un Token',
                        // Result
                        {},
                        // Error
                        {},
                        
                    )
                );
            }
        }
    }
}