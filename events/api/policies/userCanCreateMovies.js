module.exports = function(req,res, ok){
	var user= req.session.User;
	res.locals.flash={};
	if(!user || !user.admin){
		var noAdminError=[{name:'noAdmin',message:'Debe ser Administrador'}]
		req.session.flash={
			err:noAdminError
		}
		return res.redirect('/session/new/');
	}
	
	
	if(!req.session.flash) {
		req.session.flash={};
	}
	res.locals.flash = _.clone(req.session.flash);
	ok();
};