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
        HOST: '192.168.76.138',
        PORT: 27017,
        USER_NAME: 'dba-root',
        USER_PASSWORD: 'mongoadminpwd',
        DEFAULT_DATABASE: 'dbMTWDM'
    }
};