const router = require('express').Router();
const Users = require('../model/User');
const jwt = require('jsonwebtoken');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_secret, { expiresIn: config.jwt_expires_in });
}

router.get('/', async (req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (err) {
        return res.status(500).send({error: 'Erro na consulta de usuários!'})
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({error: 'Dados insuficientes!'});

    try {
        if (await Users.findOne({ email })) return res.status(400).send({error: 'Usuário já registrado'});

        const user = await Users.create(req.body);
        user.password = undefined;

        return res.status(201).send(user);
    } catch (err) {
        return res.status(500).send({error: 'Erro ao registrar usuário!'})
    }
});

module.exports = router;