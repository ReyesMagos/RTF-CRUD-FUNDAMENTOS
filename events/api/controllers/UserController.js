/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    new: function(req, res) {

        res.view();
    },
    create: function(req, res, next) {
        // body...
        // body...

        //Aqui lo que estamos haciendo es crear un objeto user para guardar
        // los datos que traemos del formulario, si alguien edita este el dato que ponga
        //no se añadira a nuestro modelo
        var gen;
        if (req.param('genre') & req.param('genre') == 0)
            gen = 'M';
        else if (req.param('genre'))
            gen = 'F';

        var userObj = {
            name: req.param('name'),
            lastname: req.param('lastname'),
            age: req.param('age'),
            email: req.param('email'),
            genre: gen,
            phone: req.param('phone'),
            address: req.param('address'),
            username: req.param('username'),
            password: req.param('password'),
            passwordConfirmation: req.param('passwordConfirmation')
        }

        console.log(userObj);

        User.create(userObj, function userCreated(err, user) {
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }

                res.redirect('user/new')
                return;
            }

            req.session.authenticated = true;
            req.session.User = user;

            res.redirect('/user/show/' + user.id);



        });
    },
    show: function(req, res, next) {
        User.findOne(req.param('id'), function userFounded(err, user) {
            if (err) return next(err);
            if (!user) return next();
            res.view({
                user: user
            });
            // body...
        });
    },
    edit: function(req, res, next) {
        // body...
        User.findOne(req.param('id'), function(err, user) {
            // body...
            if (err) return next(err);
            if (!user) return next();
            res.view({
                user: user
            });
        });
    },
    update: function(req, res, next) {
        var userObj = {
            name: req.param('name'),
            lastname: req.param('lastname'),
            age: req.param('age'),
            email: req.param('email'),
            genre: req.param('genre'),
            phone: req.param('phone'),
            address: req.param('address')
        }
        User.update(req.param('id'), userObj, function userUpdated(err, user) {
            // body...
            if (err) {
                req.session.flash = {
                    err: err
                }
                return res.redirect('user/edit/' + req.param('id'));
            }

            res.redirect('/user/show/' + req.param('id'));
        });
        // body...
    },
    list: function(req, res, next) {
        loggedUser= req.session.User.admin;
        User.find(function(err, users) {
            if (err)
                return next(err);
            res.view({
                users: users, loggedUser:loggedUser
            });
        });
        // body...
    },
    destroy: function(req, res, next) {
        User.destroy(req.param('id'), function (err) {
            if (err) {
                return next(err);
            }
            
            res.redirect('user/list');


        });

    }



};