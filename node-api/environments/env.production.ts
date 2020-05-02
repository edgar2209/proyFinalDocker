export default {
    API: {
        NAME: 'Micro-Servicio punto de Venta | NodeJS',
        PORT: 3000,
        ENVIRONMENT: 'Development'
    },
    NOTIFY: {
        DELAY: 1000 * 10        // 10 Segundos
    },
    TOKEN: {
        SECRETKEY: 'secretkey-value',
        EXPIRES: 5000   // 5 segundos
    },
    MONGODB: {
        HOST: '192.168.116.128',
        PORT: 27017,
        USER_NAME: 'dbo-operador',
        USER_PASSWORD: 'operador123',
        DEFAULT_DATABASE: 'dbMTWDM'
    }
};