const router = require('express').Router();

router.get('/', (req, res) => {
    return res.send({message: 'Tudo ok com o GET da rota de usuários'})
});

router.post('/create', (req, res) => {
    return res.send({message: 'Tudo ok com o POST da rota create'})
});

module.exports = router;