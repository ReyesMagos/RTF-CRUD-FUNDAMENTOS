/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');
module.exports = {

    new: function(req, res) {


        res.view();
        // body...
    },
    create: function(req, res, next) {
        if (!req.param('username')  || !req.param('password')) {
            var usernamePasswordRequiredError = [{
                name: 'usernamePasswordRequired',
                message:
                'Debe ingresar usuario y contraseña'
            }]

            req.session.flash = {
                err: usernamePasswordRequiredError
            }
            res.redirect('session/new');
            return;
        }

        User.findOneByUsername(req.param('username'), function foundUser (err, user) {

            if (err) return next(err);
            console.log('encontre usuario '+ user.username)
            if (!user) {
                var noAccountError = [{
                    name: 'noAccount',
                    message: 'el nombre de usuario ' + req.param('username') + ' no fue encontrado'
                }]
                req.session.flash = {
                    err: noAccountError
                }
                res.redirect('session/new');
                return;

            }

            bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
                if (err) return next(err);
                if (!valid) {
                    var usernamePasswrodMismatchError = [{
                        name: 'usernamePasswordMismatch',
                        message: 'La contraseña ingresada no es correcta'
                    }]
                    req.session.flash = {
                        err: usernamePasswrodMismatchError
                    }
                    res.redirect('session/new');
                    return;

                }
                req.session.authenticated = true;
                req.session.User = user;
                res.redirect('/user/show/' + user.id); 
            });

        });

    }
};