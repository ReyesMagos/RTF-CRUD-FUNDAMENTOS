module.exports = function(req, res, ok) {
    // body...
    var sessionUserMatchesId = req.session.User.id === req.param('id');
    var isAdmin = req.session.User.admin;
     console.log(isAdmin);
    if (!sessionUserMatchesId || !isAdmin) {

        var noRightsError = [{
            name: 'noRights',
            message: 'debes ser administrador'
        }]
        req.session.flash = {
            err: noRights
        }
        
        res.redirect('session/new');
        return;
    }
    ok();

}