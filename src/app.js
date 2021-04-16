const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const config = require('./config/config');

const url = config.bd_url;
const options = { 
    useUnifiedTopology: true, 
    poolSize: 5, 
    useNewUrlParser: true 
};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão com o banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados');
});

mongoose.connection.on('connected', () => {
    console.log('Tudo certo com o banco de dados');
}); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;