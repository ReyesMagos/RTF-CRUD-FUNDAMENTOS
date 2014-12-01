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
        var cast = [];

        // var fileTitle;
        // console.log('fuck');
        // var uploadFile = req.file('moviePoster');
        // var fileName = req.file('moviePoster')._files[0].stream.filename;
        // var uploadPath = process.cwd() + '/assets/images';

        // uploadFile.upload({
        //     dirname: uploadPath,
        //     maxBytes: 1000000
        // }, function onUploadComplete(err, files) {
        //     if (err) {
        //         fileName = 'default';
        //         console.log(err);
        //     }
        //     console.log("subi la imagen redireccionare");
        //     createMovie();

        // });

        if (castingMembers) {
            for (i = 0; i < castingMembers.length; i++) {
                cast[i] = castingMembers[i];
            }
        }
        // body...    
        var movie = {
            title: req.param('title'),
            synopsis: req.param('synopsis'),
            releaseDate: req.param('releaseDate'),
            director: req.param('director'),
            country: req.param('country'),
            clasification: req.param('clasification'),
            imageTitle: 'culo',
            casting: cast
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

            return res.redirect('movie/show/<%= movie.id%>');


        });

    },
    show: function(req, res, next) {
        Movie.findOne(req.param('id'), function movieFind(err, movie) {
            if (err)
                 return res.next(err);
            res.view({
                movie: movie
            });
        });
    }, index:function(req, res ,next) {
        Movie.find(function function_name (err, movies) {
            res.view({movies:movies});
        })
    }

};