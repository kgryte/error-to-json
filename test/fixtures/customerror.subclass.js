'use strict';

// CUSTOM ERROR //

/**
* FUNCTION: createClass( ctor )
*	Creates a CustomError class constructor. Note that we use function generation so that tests may be run in browsers not supporting ES2015 classes. This function may be loaded in non-ES2015 environments, but should only be invoked when ES2015 classes are supported.
*
* @param {String} ctor - error constructor name
* @returns {Function} constructor
*/
function createClass( ctor ) {
	/* jshint evil:true */
	var str = '';
	if ( !ctor ) {
		ctor = 'Error';
	}
	str += '(function create() {';
	str += 'class CustomError extends '+ctor+' {';
	str += 'constructor( msg ) {';
	str += 'super( msg );';
	str += '}';
	str += '}';
	str += 'return CustomError;';
	str += '})()';
	return eval( str );
} // end FUNCTION createClass()


// EXPORTS //

module.exports = createClass;
