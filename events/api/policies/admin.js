module.exports = function(req, res, ok) {
	// body...
	if(req.session.User && req.session.User.admin){
		return ok();
	}
	var requireAdminError=[{name:'requireAdmin', message:'debes ser administrador'}]
	req.session.flash={
		err:requireAdminError
	}
	res.redirect('session/new');
	return;
}