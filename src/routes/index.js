const router = require('express').Router();

router.get('/', (req, res) => {
    return res.send({message: 'Tudo ok com o GET da raiz'});
});

router.post('/', (req, res) => {
    return res.send({message: 'Tudo ok com o POST da raiz'});
});

module.exports = router;