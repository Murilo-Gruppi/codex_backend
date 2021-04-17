const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Cria um Schema para os usuários do sistema
 */
const UserSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true, 
        unique: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

// Um pré save para criptografar a senha e guardar no bd
UserSchema.pre('save', async function(next) {
    let user = this;
    if (!user.isModified('password')) return next();

    user.password = await bcrypt.hash(user.password, 10);
    return next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;