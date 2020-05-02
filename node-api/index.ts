// Express Imports
import Express from 'express';
// This variables are necessary because we are using the express webserver, the webservers use Response and Requests.
import {Request, Response} from 'express'
// Debug and Color imports
import {DEBUG,COLOR} from './utils/debug';
// API Utils Import
import {APIUtils, APIStatusEnum} from './utils/api.utils';
//

import jwt from 'jsonwebtoken'
// Acceder a las variables de Entorno
import ENV from './environments/env.production'
// JSON Web Tokens Middleware, AuthToken es el nombre que le estamos asiganando a la función default del middleware todo esto para reutilizar el middleware cada API que la consuma le manda sus propios variables de entorno.
import AuthToken from './middlewares/token.middleware';

const token = AuthToken(ENV);
// MongoDBHelpert Import
import MongoDBClient from 'mongodb';
import MongoDBHelpert from './helpers/mongodb.helper';


// Enviroments: variables de entorno son para ocultar información sensible.
// const env = {
//     PORT: process.env.PORT || 5000,
//     NAME: process.env.NAME || 'Micro-Servicio | NodeJS',
//     ENVIRONMENT: process.env.ENVIRONMENT || 'Development'
// }
// Variables Declaration
const debug=DEBUG();
const color=COLOR();
const app = Express();
const apiUtils = APIUtils(ENV);
const mongodb = MongoDBHelpert.getInstance(ENV);

// Anteriormente para leer el Request del Body se usaba librería de terceros BodyParser, en express 4.0 ya es con estas lineas y no ocupa la librería de terceros,
// Si no están estas lineas no deja conectarse desde Postman no deja hacer el encoded y recuperar los valores del Request.
app.use(Express.urlencoded({extended: true}));
app.use(Express.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routes use of get verb.
app.post('/login', (req: Request, res: Response) => {

    console.log(req.body);

    const {userName, password} = req.body;

    const mockUser = {
        fullname: 'Omar Uriel',
        userName: 'grillo',
        password: '123',
        email: ''
    }

    const mockRoles = ['Captura_Rol', 'Admon_Catalogos_Rol', 'Print_Rol']
    const secretKey = 'secretkey-value'

    // Validar usuario y contraseña
    if(userName == mockUser.userName && password == mockUser.password){

        const payload = {
            fullname: mockUser.fullname,
            userName: mockUser.userName,
            password: mockUser.email,
            email: mockRoles
        }

        // Generar un token para ese Usuario.
        jwt.sign(payload,secretKey, { expiresIn: ENV.TOKEN.EXPIRES}, (err, token) => {
            // Existe Error
            if(err){
                return res.status(500).json(
                    apiUtils.BodyResponse(APIStatusEnum.Internal_Server_Error, '', 'Error al intentar crear el token', null, err)
                )
            }

            // oK
            res.status(200).json(
                apiUtils.BodyResponse(APIStatusEnum.Success, 'Ok', 'Token generado de forma correcta', { userName: mockUser.userName, token }, null)
            )
        })
    }

    else{
        res.status(403).json(
            apiUtils.BodyResponse(APIStatusEnum.Forbidden,
                'La solicitud fue legal, pero el servidor ',
                'Credenciales Invalidas, El usuario y/o contraseña no son válidos, Favor de Verificar',
                {},
                null)
        )
    }
});

app.get('/products', async (req: Request, res: Response) => {
    
    const productos = await mongodb.db.collection('cars').find({}).toArray();

    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    //res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    //res.send('cors problem fixed:)');
    
    res.status(200).json(
        // apiUtils.BodyResponse(
        //     APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
        //     {
        //         productos,
        //         authUser: req.body.authUser
        //     }
        // )
        productos
    );
});

app.get('/products/:category', async (req: Request, res: Response) => {
    
    const productos = await mongodb.db.collection('cars').find({}).toArray();

    const { category } = req.params;

    const filter = productos.filter((item: any) => item.categoria == category || item.categoria.indexOf(category) >= 0);
    
    res.status(200).json(
        filter
    );
});

app.get('/products/description/:criterio', async (req: Request, res: Response) => {
    
    const productos = await mongodb.db.collection('cars').find({}).toArray();
    
    const { criterio } = req.params;

    const filterDescription = productos.filter((item: any) => item.descripcion.toLowerCase().includes(criterio.toLowerCase()));
    
    res.status(200).json(
        filterDescription
    );
});

app.get('/products/product/:codigo', async (req: Request, res: Response) => {
    
    const productos = await mongodb.db.collection('cars').find({}).toArray();
    
    const { codigo } = req.params;

    const filter2 = productos.filter((item: any) => item.codigo == codigo);
    
    res.status(200).json(
        filter2
    );
});

app.get('/product/:id', token.verify, async (req: Request, res: Response) => {
    
    const { id } = req.params;
    
    const _id =new MongoDBClient.ObjectID(id);
    
    const productos = await mongodb.db.collection('cars').find({_id}).toArray();
    
    res.status(200).json(
        apiUtils.BodyResponse(
            APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
            {
                productos,
                authUser: req.body.authUser
            }
        )
    );
});

// Start Express Server, al agregar el app.listen ya se puede acceder al servidor web en Node desde un navegador.
app.listen(ENV.API.PORT, async() => {
    // Conectando con MongoDB
    try{
        await mongodb.connect();
    }
    catch{

    }
    
    debug.express(`El servidor ${color.express('Express')} se inicio ${color.warning('correctamente')} en el puerto ${color.info(ENV.API.PORT)}`);
});




