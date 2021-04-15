const router = require('express').Router();
const auth = require('../middleware/auth');

router.get('/', auth,  (req, res) => {
    return res.send({message: 'Tudo ok com o GET da raiz'});
});

router.post('/', auth, (req, res) => {
    return res.send({message: 'Tudo ok com o POST da raiz'});
});

module.exports = router;