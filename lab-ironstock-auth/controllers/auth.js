const User = require('../models/user');
const bcrypt = require("bcryptjs");
const saltRounds = 10;

exports.signUp = (req, res, next) => res.render('auth/signup');

exports.registerUser = (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    if (!username || !password) {
        res.render('auth/signup', {
            errorMessage: 'Las informaciones username, y contraseña son mandatorias'
        });
        return;
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res.status(500).render('auth/signup', {
            errorMessage: 'La contraseña debe tener al menos 6 caracteres y debe contener, por lo menos, una letra minúscula, una mayúscula y un número.'
        });
        return;
    }
    bcrypt.genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                username,
                passwordHash: hashedPassword
            });
        }).then(userFromDB => {
            console.log('usuario creado: ', userFromDB.username);
            req.session.currentUser = userFromDB;
            console.log(userFromDB);
            res.redirect('/userProfile');
        })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).render('auth/signup', {
                    errorMessage: error.message
                });
            } else if (error.code === 11000) {
                res.status(400).render('auth/signup', {
                    errorMessage: 'El username ya existe...'
                });
            } else {
                next(error);
            }
        });
};

exports.logIn = (req, res) => {
    console.log("la sesión existe?", req.session);
    res.render('auth/login');
};


exports.validateLogIn = (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    if (username === '' || password === '') {
        res.render('auth/login', {
            errorMessage: 'Por favor complete los dos campos, username y contraseña, para entrar.'
        });
        return;
    }
    User.findOne({
            username
        })
        .then(userFromDB => {
            if (!userFromDB) {
                res.render('auth/login', {
                    errorMessage: 'El Username no está registrado. Pruebe otro username o registre uno nuevo.'
                });
                return;
            } else if (bcrypt.compareSync(password, userFromDB.passwordHash)) {
                req.session.currentUser = userFromDB;
                res.redirect('/userProfile');
            } else {
                res.render('auth/login', {
                    errorMessage: 'Contraseña incorrecta.'
                });
            }
        })
        .catch(error => next(error));
};

exports.logOut = (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
};