const User = require('../models/user');

exports.getAllValues = (req, res, next) => {

    if (!req.session.currentUser) {
        res.render('auth/login', {
            errorMessage: 'User not logged in'
        });
    } else {
        User.findOne({
                username: {
                    $eq: req.session.currentUser.username
                }
            })
            .then(user => {
                res.render('auth/user-profile', {
                    values: user.valueArray,
                    username: user.username
                });

            }).catch(error => {
                next(error);
            });
    }
};

exports.createValue = (req, res, next) => {
    const symbol = req.body.symbol;
    const user = req.session.currentUser;
    console.log(req.session.currentUser);

    User.findOneAndUpdate({
            "username": user.username
        }, {
            $push: {
                valueArray: symbol
            }
        })
        .then((value) => {
            res.redirect('userProfile');
        })
        .catch((error) => {
            res.redirect('userProfile');
        });
};

exports.deleteValue = (req, res, next) => {
    const symbol = req.params.item;
    const user = req.session.currentUser;
    User.findOneAndUpdate({
            "username": user.username
        }, {
            $pull: {
                valueArray: symbol
            }
        })
        .then((value) => {
            res.redirect('../userProfile');
        })
        .catch((error) => {
            res.redirect('../userProfile');
        });
};

exports.chart = (req, res, next) => {
    console.log(req.session.currentUser);
    if (!req.session.currentUser) {
        res.render('auth/login', {
            errorMessage: 'User not logged in'
        });
    } else {
        User.findOne({
                username: {
                    $eq: req.session.currentUser.username
                }
            })
            .then(user => {
                res.render('auth/charts', {
                    values: user.valueArray
                });
            }).catch(err => console.log("Error!", err));
    }
};