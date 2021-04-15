const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_url: URL_DO_BD_DEV,
                jwt_secret: JWT_SECRET,
                jwt_expires_in: TEMPO_PARA_EXPIRAR
            }
        case 'prod':
            return {
                bd_url: URL_DO_BD_PROD,
                jwt_secret: JWT_SECRET,
                jwt_expires_in: TEMPO_PARA_EXPIRAR
            }
    }
}

console.log(`API em ambiente ${env.toUpperCase()}`);
module.exports = config();
