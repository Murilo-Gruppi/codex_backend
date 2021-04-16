const router = require('express').Router();
const auth = require('../middleware/auth');

/**
 * Método GET da rota raiz, deve retornar as tarefas por aqui, mas somente se o usuário estiver autenticado com o token
 */
router.get('/', auth,  (req, res) => {
    return res.send({message: 'Tudo ok com o GET da raiz'});
});


/**
 * Método POST da rota raiz, por enquanto retorna somente uma mensagem se o método POST desta rota estiver ok, mas somente se o usuário estiver autenticado com o token
 */
router.post('/', auth, (req, res) => {
    return res.send({message: 'Tudo ok com o POST da raiz'});
});

module.exports = router;