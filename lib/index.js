'use strict';

// MODULES //

var getKeys = require( 'object-keys' );
var copy = require( 'utils-copy' );
var typeName = require( './type.js' );


// TOJSON //

/**
* FUNCTION: toJSON( err )
*	Returns a JSON representation of an error object.
*
* @param {Error|TypeError|SyntaxError|URIError|ReferenceError|RangeError|RangeError|EvalError} err - error to serialize
* @returns {Object} JSON representation
*/
function toJSON( err ) {
	var keys;
	var out;
	var i;
	if ( !( err instanceof Error ) ) {
		throw new TypeError( 'invalid input argument. Must provide an error object. Value: `' + err + '`.' );
	}
	out = {};

	// Guaranteed properties:
	out.type = typeName( err );
	out.message = err.message;

	// Possible general error properties...
	if ( err.name ) {
		out.name = err.name;
	}
	if ( err.stack ) {
		out.stack = err.stack;
	}
	// Possible Node.js (system error) properties...
	if ( err.code ) {
		out.code = err.code;
	}
	if ( err.errno ) {
		out.errno = err.errno;
	}
	if ( err.syscall ) {
		out.syscall = err.syscall;
	}
	// Any enumerable properties...
	keys = getKeys( err );
	for ( i = 0; i < keys.length; i++ ) {
		out[ keys[i] ] = copy( err[ keys[i] ] );
	}
	return out;
} // end FUNCTION toJSON()


// EXPORTS //

module.exports = toJSON;
