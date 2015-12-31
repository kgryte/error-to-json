'use strict';

// MODULES //

var test = require( 'tape' );
var hasClass = require( 'detect-class-support' )();
var toJSON = require( './../lib' );


// FIXTURES //

var createClass1 = require( './fixtures/customerror.proto.js' );
var createClass2 = require( './fixtures/customerror.subclass.js' );


// TESTS //

test( 'main export is a function', function test( t ) {
	t.ok( typeof toJSON === 'function', 'main export is a function' );
	t.end();
});

test( 'if provided anything other than an error instance, the function will throw an error', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws when provided a ' + (typeof values[i]) );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			toJSON( value );
		};
	}
});

test( 'the function returns a JSON object', function test( t ) {
	var err = new Error( 'beep' );
	var json = toJSON( err );
	t.ok( typeof json === 'object', 'returns an object' );
	t.end();
});

test( 'the JSON object includes an error type', function test( t ) {
	var expected;
	var values;
	var json;
	var i;

	values = [
		new Error(),
		new EvalError(),
		new TypeError(),
		new ReferenceError(),
		new SyntaxError(),
		new URIError(),
		new RangeError()
	];

	expected = [
		'Error',
		'EvalError',
		'TypeError',
		'ReferenceError',
		'SyntaxError',
		'URIError',
		'RangeError'
	];

	for ( i = 0; i < values.length; i++ ) {
		json = toJSON( values[ i ] );
		t.equal( json.type, expected[ i ], 'type equal to ' + expected[ i ] );
	}
	t.end();
});

test( 'the JSON object includes an error message', function test( t ) {
	var expected;
	var values;
	var json;
	var i;

	values = [
		new Error( 'a' ),
		new EvalError( 'b' ),
		new TypeError( 'c' ),
		new ReferenceError( 'd' ),
		new SyntaxError( 'e' ),
		new URIError( 'f' ),
		new RangeError( 'g' )
	];

	expected = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g'
	];

	for ( i = 0; i < values.length; i++ ) {
		json = toJSON( values[ i ] );
		t.equal( json.message, expected[ i ], 'message equal to \'' + expected[ i ] + '\'' );
	}
	t.end();
});

test( 'if a `stack` property is present, the JSON object includes a stack trace', function test( t ) {
	var expected;
	var values;
	var json;
	var i;

	values = [
		new Error(),
		new EvalError(),
		new TypeError(),
		new ReferenceError(),
		new SyntaxError(),
		new URIError(),
		new RangeError()
	];

	expected = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g'
	];

	for ( i = 0; i < values.length; i++ ) {
		values[ i ].stack = expected[ i ];
		json = toJSON( values[ i ] );
		t.equal( json.stack, expected[ i ], 'stack equal to \'' + expected[ i ] + '\'' );
	}
	t.end();
});

test( 'if a `stack` property is not present, the JSON object will not include a `stack` property', function test( t ) {
	var json;
	var err;

	err = new Error();

	// Fake not having a `stack` by intercepting access and returning `undefined`, similar to non-existent property behavior...
	Object.defineProperty( err, 'stack', {
		'value': undefined,
		'enumerable': false,
		'configuable': true,
		'writable': true
	});

	json = toJSON( err );
	t.equal( json.stack, undefined, 'no stack property' );
	t.end();
});

test( 'if a `name` property is present, the JSON object includes an error name', function test( t ) {
	var expected;
	var values;
	var json;
	var i;

	values = [
		new Error(),
		new EvalError(),
		new TypeError(),
		new ReferenceError(),
		new SyntaxError(),
		new URIError(),
		new RangeError()
	];

	expected = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g'
	];

	for ( i = 0; i < values.length; i++ ) {
		values[ i ].name = expected[ i ];
		json = toJSON( values[ i ] );
		t.equal( json.name, expected[ i ], 'name equal to \'' + expected[ i ] + '\'' );
	}
	t.end();
});

test( 'if a `name` property is not present, the JSON object will not include a `name` property', function test(t ) {
	var json;
	var err;

	err = new Error();

	// Fake not having a `name` by intercepting access and returning `undefined`, similar to non-existent property behavior...
	Object.defineProperty( err, 'name', {
		'value': undefined,
		'enumerable': false,
		'configuable': true,
		'writable': true
	});

	json = toJSON( err );
	t.equal( json.name, undefined, 'no name property' );

	t.end();
});

test( 'if a `code` property is present, the JSON object includes an error code', function test( t ) {
	var expected;
	var values;
	var json;
	var i;

	values = [
		new Error(),
		new EvalError(),
		new TypeError(),
		new ReferenceError(),
		new SyntaxError(),
		new URIError(),
		new RangeError()
	];

	expected = [
		1,
		2,
		3,
		4,
		5,
		6,
		7
	];

	for ( i = 0; i < values.length; i++ ) {
		values[ i ].code = expected[ i ];
		json = toJSON( values[ i ] );
		t.equal( json.code, expected[ i ], 'code equal to \'' + expected[ i ] + '\'' );
	}
	t.end();
});

test( 'if an `errno` property is present, the JSON object includes an error code string', function test( t ) {
	var expected;
	var values;
	var json;
	var i;

	values = [
		new Error(),
		new EvalError(),
		new TypeError(),
		new ReferenceError(),
		new SyntaxError(),
		new URIError(),
		new RangeError()
	];

	expected = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g'
	];

	for ( i = 0; i < values.length; i++ ) {
		values[ i ].errno = expected[ i ];
		json = toJSON( values[ i ] );
		t.equal( json.errno, expected[ i ], 'errno equal to \'' + expected[ i ] + '\'' );
	}
	t.end();
});

test( 'if a `syscall` property is present, the JSON object includes a failed system call string', function test( t ) {
	var expected;
	var values;
	var json;
	var i;

	values = [
		new Error(),
		new EvalError(),
		new TypeError(),
		new ReferenceError(),
		new SyntaxError(),
		new URIError(),
		new RangeError()
	];

	expected = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g'
	];

	for ( i = 0; i < values.length; i++ ) {
		values[ i ].syscall = expected[ i ];
		json = toJSON( values[ i ] );
		t.equal( json.syscall, expected[ i ], 'syscall equal to \'' + expected[ i ] + '\'' );
	}
	t.end();
});

test( 'if a provided error has additional enumerable properties, the function will include these properties and their values in the output JSON', function test( t ) {
	var json;
	var err;

	// Data descriptor...
	err = new Error( 'errrr' );
	err.beep = 'boop';
	err.boop = 'beep';

	json = toJSON( err );
	t.equal( json.beep, err.beep, 'data descriptor' );
	t.equal( json.boop, err.boop, 'data descriptor' );

	// Accessor descriptor...
	err = new Error( 'errrr' );
	Object.defineProperty( err, 'beep', {
		'enumerable': true,
		'configurable': true,
		'get': function get() {
			return 'boop';
		}
	});
	Object.defineProperty( err, 'boop', {
		'enumerable': true,
		'configurable': false,
		'get': function get() {
			return 'beep';
		}
	});

	json = toJSON( err );
	t.equal( json.beep, err.beep, 'accessor descriptor' );
	t.equal( json.boop, err.boop, 'accessor descriptor' );

	t.end();
});

test( 'the function deep copies enumerable properties', function test( t ) {
	var json;
	var err;

	// Deep equal...
	err = new Error( 'errrr' );
	err.arr = [ 1, 2, [ 3, 4, 5 ] ];

	json = toJSON( err );
	t.notEqual( json.arr, err.arr, 'new instances' );
	t.deepEqual( json.arr, err.arr, 'deep equal' );

	t.end();
});

test( 'custom errors (proto)', function test( t ) {
	var CustomError;
	var types;
	var ctors;
	var json;
	var err;
	var i;

	ctors = [
		Error,
		TypeError,
		SyntaxError,
		ReferenceError,
		URIError,
		EvalError,
		RangeError
	];

	types = [
		'Error',
		'TypeError',
		'SyntaxError',
		'ReferenceError',
		'URIError',
		'EvalError',
		'RangeError'
	];

	for ( i = 0; i < ctors.length; i++ ) {
		CustomError = createClass1( ctors[ i ] );
		err = new CustomError( 'custom error' );
		json = toJSON( err );

		t.equal( json.type, types[ i ], 'type equal to ' + types[ i ] );
		t.equal( json.message, err.message, 'equal messages' );
		t.equal( json.name, err.name, 'equal names' );
		t.equal( json.stack, err.stack, 'equal stack trace' );
	}
	t.end();
});

if ( hasClass ) {
	test( 'custom errors (subclass; ES2015)', function test( t ) {
		var CustomError;
		var ctors;
		var json;
		var err;
		var i;

		ctors = [
			'Error',
			'TypeError',
			'SyntaxError',
			'ReferenceError',
			'URIError',
			'EvalError',
			'RangeError'
		];

		for ( i = 0; i < ctors.length; i++ ) {
			CustomError = createClass2( ctors[ i ] );
			err = new CustomError( 'custom error' );
			json = toJSON( err );

			t.equal( json.type, ctors[ i ], 'type equal to ' + ctors[ i ] );
			t.equal( json.message, err.message, 'equal messages' );
			t.equal( json.name, err.name, 'equal names' );
			t.equal( json.stack, err.stack, 'equal stack trace' );
		}
		t.end();
	});
}
