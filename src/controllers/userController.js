const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');

/**
 * Cria um Token para o usuário
 * 
 * @param userId id do usuário
 * @returns o token próprio do usuário 
 */
 const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_secret, { expiresIn: '1d' });
}

const UserController = {
    async createUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({error: 'Dados insuficientes!'});

        try {
            if (await User.findOne({ email })) return res.status(400).send({error: 'Usuário já registrado'});

            const user = await User.create(req.body);
            user.password = undefined;

            return res.status(201).send({user, token: createUserToken(user.id)});
        } catch (err) {
            return res.status(500).send({error: 'Erro ao registrar usuário!'})
        }
    },

    async userLogin(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({error: 'Dados insuficientes!'});

        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user) return res.status(400).send({error: 'Usuário não registrado!'});

            const pass_ok = await bcrypt.compare(password, user.password);

            if (!pass_ok) return res.status(401).send({error: 'Erro ao autenticar usuário'});

            user.password = undefined;

            return res.send({user, token: createUserToken(user.id)});
        } catch (err) {
            return res.status(500).send({error: 'Erro ao buscar usuário'});
        }
    },
    
    getUser(req, res) {
        return res.send(req.user);
    }    
}

module.exports = UserController;