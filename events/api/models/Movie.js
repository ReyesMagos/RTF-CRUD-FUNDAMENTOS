/**
* Movies.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	title:{
  		type:'string',
  		required:true
  	},synopsis:{
  		type:'string',
  		required:true
  	},releaseDate:{
  		type:'date',
  		required:true
  	},director:{
  		type:'string',
  		required:true
  	},country:{
  		type:'string',
  		required:true
  	},clasification:{
  		type:'string',
  		required:true
  	},casting:{
  		type:'array',
  		required:true
  	},imageTitle:{
      type:'string',
      required:true
    }


  }
};

