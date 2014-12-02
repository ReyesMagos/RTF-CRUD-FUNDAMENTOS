/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        name: {
            type: 'string',
            required: true
        },
        lastname: {
            type: 'string',
            required: true
        },admin:{
            type:'string',
            defaultsTo:false
        },
        age: {
            type: 'integer',
            required: true
        },
        email: {
            type: 'email',
            required: true,
            unique: true

        },
        genre: {
            type: 'string',
            required: true

        },
        phone: {
            type: 'integer',
            required: true
        },
        address: {
            type: 'string',
            required: true
        },
        username: {
            type: 'string',
            required: true,
            unique: true

        },
        password: {
            type: 'string',
            required: true
        },
        passwordConfirmation: {
            type: 'string',
            required: true

        },
        encryptedPassword: {
            type: 'string'
        },
        toJSON: function() {
            // body...
            var obj = this.toObject();
            delete obj.password;
            delete obj._csrf;
            delete obj.encryptedPassword
            return obj;
        }

    },
    beforeCreate: function(values, next) {
        // body...
        console.log('fuck i am in before created');
        if (!values.password || !values.passwordConfirmation || values.password != values.passwordConfirmation) {
        
        return next({
            err: ['Las contraseñas no coinciden']
        });
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
        if (err) return next(err);
        // body...
        values.encryptedPassword = encryptedPassword;
        next();

    });
}
};