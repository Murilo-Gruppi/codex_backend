const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return {
                bd_url: URL_DO_BD_DEV
            }
        case 'prod':
            return {
                bd_url: URL_DO_BD_PROD
            }
    }
}

console.log(`API em ambiente ${env.toUpperCase()}`);
module.exports = config();
