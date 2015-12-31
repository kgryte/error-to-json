'use strict';

var toJSON = require( './../lib' );

var err = new Error( 'beep' );
console.log( toJSON( err ) );
/*
  {
	"type": "Error",
	"name": "Error",
	"message": "beep",
	"stack": "<stack>"
  }
*/

err = new TypeError( 'invalid type' );
console.log( toJSON( err ) );
/*
  {
	"type": "TypeError",
	"name": "TypeError",
	"message": "invalid type",
	"stack": "<stack>"
  }
*/

err = new SyntaxError( 'bad syntax' );
console.log( toJSON( err ) );
/*
  {
	"type": "SyntaxError",
	"name": "SyntaxError",
	"message": "bad syntax",
	"stack": "<stack>"
  }
*/

err = new ReferenceError( 'unknown variable' );
console.log( toJSON( err ) );
/*
  {
	"type": "ReferenceError",
	"name": "ReferenceError",
	"message": "unknown variable",
	"stack": "<stack>"
  }
*/

err = new URIError( 'bad URI' );
console.log( toJSON( err ) );
/*
  {
	"type": "URIError",
	"name": "URIError",
	"message": "bad URI",
	"stack": "<stack>"
  }
*/

err = new RangeError( 'value out-of-range' );
console.log( toJSON( err ) );
/*
  {
	"type": "RangeError",
	"name": "RangeError",
	"message": "value out-of-range",
	"stack": "<stack>"
  }
*/

err = new EvalError( 'eval error' );
console.log( toJSON( err ) );
/*
  {
	"type": "EvalError",
	"name": "EvalError",
	"message": "eval error",
	"stack": "<stack>"
  }
*/

