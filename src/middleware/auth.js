const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * Responsavel por fazer a verificação do token do usuário
 */
 const auth = (req, res, next) => {
    const token_header = req.headers.auth;

    if (!token_header) return res.status(401).send({error: 'Token não enviado!'});

    jwt.verify(token_header, config.jwt_secret, (err, decoded) => {
        if (err) return res.status(401).send({error: 'Token inválido'});
        res.locals.auth_data = decoded;

        return next();
    });
}

module.exports = auth;