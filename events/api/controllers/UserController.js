/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    'new': function(req, res) {
       
        res.view('user/registerform');
    },


    
    create: function(req, res, next) {
        // body...
        // body...
        
        //Aqui lo que estamos haciendo es crear un objeto user para guardar
        // los datos que traemos del formulario, si alguien edita este el dato que ponga
        //no se añadira a nuestro modelo
        
        var userObj = {
                name: req.param('name'),
                lastname: req.param('lastname'),
                age: req.param('age'),
                email: req.param('email'),
                genre: req.param('genre'),
                phone: req.param('phone'),
                address: req.param('address')
            }
            
            
   
        User.create(userObj, function userCreated(err, user) {
            if (err) {
                console.log(err);
                req.session.flash={
                    err:err
                }
               
                res.redirect('user/new')
                return;
            }

              
			//res.json(user);
		
			
            res.redirect('/user/show/'+user.id);



        });
    },
    show:function (req, res, next) {
        User.findOne(req.param('id'),function userfounded(err,user) {
            if(err)return next(err);
            if(!user) return next();
            res.view({
                user:user
            });
            // body...
        });
    },
    edit:function (req, res, next) {
        // body...
        User.findOne(req.param('id'), function  (err, user) {
            // body...
            if(err) return next(err);
            if(!user)return next();
            res.view({
                user: user
            });
        });
    } ,update:function (req, res,next) {
          var userObj = {
                name: req.param('name'),
                lastname: req.param('lastname'),
                age: req.param('age'),
                email: req.param('email'),
                genre: req.param('genre'),
                phone: req.param('phone'),
                address: req.param('address')
            }
            User.update(req.param('id'),userObj,function updateUser (err, user) {
                // body...
                if(err){
                    req.session.flash={
                        err:err
                    }
                    return res.redirect('user/edit/'+req.param('id'));
                }

                res.redirect('/user/show/'+req.param('id'));
            });
        // body...
    }   
       

	
};