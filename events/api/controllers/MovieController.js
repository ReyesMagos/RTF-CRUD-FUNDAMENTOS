/**
 * MoviesController
 *
 * @description :: Server-side logic for managing movies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
    new: function(req, res) {
        res.view();
        // body...
    },
    create: function(req, res, next) {
        console.log('me redirecciono');
        var castingMembers = req.param('casting');
        console.log(castingMembers);
   
        var movie = {
            title: req.param('title'),
            synopsis: req.param('synopsis'),
            releaseDate: req.param('releaseDate'),
            director: req.param('director'),
            country: req.param('country'),
            clasification: req.param('clasification'),
            imageTitle: 'culo',
            casting: castingMembers
        }
        console.log(movie);
        Movie.create(movie, function movieCreated(err, movie) {
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                return res.redirect('movie/new/');
            }

            return res.redirect('movie/show/' + movie.id);


        });

    },
    show: function(req, res, next) {
        var user= req.session.User;
        Movie.findOne(req.param('id'), function movieFind(err, movie) {
            if (err)
                return res.next(err);
            res.view({
                movie: movie, user:user
            });
        });
    },
    index: function(req, res, next) {
        var user = req.session.User;
        Movie.find(function moviesFinded(err, movies) {
            res.view({
                movies: movies,
                user: user
            });
        })
    },
    destroy: function(req, res, next) {
        Movie.destroy(req.param('id'), function movieDestroyed(err) {
            if (err)
                return next(err);
            res.redirect('movie/index');
        });

    },
    edit: function(req, res, next) {
        Movie.findOne(req.param('id'), function movieFind(err, movie) {
            if (err){
                req.session.flash={
                    err:errs
                }
                return res.redirect('movie/edit');
            }
            res.view({
                movie: movie
            });
        });
    },
    update: function(req, res, next) {
        var castingMembers = req.param('casting');



        var movieObj = {
            title: req.param('title'),
            synopsis: req.param('synopsis'),
            releaseDate: req.param('releaseDate'),
            director: req.param('director'),
            country: req.param('country'),
            clasification: req.param('clasification'),
            imageTitle: 'culo',
            casting: castingMembers
        }
        Movie.update(req.param('id'),movieObj,function (err) {
            // body...
            if(err){

               req.session.flash={
                    err:err
                }
                return res.redirect('movie/edit');
            }
            return res.redirect('movie/show/' + req.param('id'));
        });
        // body...
    }

};