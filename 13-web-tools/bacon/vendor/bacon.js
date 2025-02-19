/*! https://lambda-w-1-notes.netlify.app/13-web-tools/bacon v0.1.0 by @bgoonz | MIT license */ ;
( function ( root ) {

	// Detect free variables `exports`
	const freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	const freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	const freeGlobal = typeof global == 'object' && global;
	if ( freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal ) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	const DEFAULT_ALPHABET = 'ABCDEFGHIKLMNOPQRSTUWXYZ';

	const decode = function ( ciphertext, options ) {
		ciphertext = ciphertext.toUpperCase();
		// Use the most common 24-letter Bacon alphabet by default.
		const alphabet = options && options.alphabet != null ?
			options.alphabet.toUpperCase() :
			DEFAULT_ALPHABET;
		let index = -1;
		const length = ciphertext.length;
		let space = '';
		let result = '';
		let buffer = [];
		let symbol;
		let alphabetIndex;
		while ( ++index < length ) {
			symbol = ciphertext.charAt( index );
			if ( symbol == 'A' || symbol == 'B' ) {
				buffer.push( symbol );
			} else {
				// Prepare a space to be added to the output.
				space = ' ';
			}
			if ( buffer.length == 5 ) {
				alphabetIndex = (
					( buffer[ 0 ] == 'A' ? 0 : 0x10 ) + // 0b10000
					( buffer[ 1 ] == 'A' ? 0 : 0x08 ) + // 0b01000
					( buffer[ 2 ] == 'A' ? 0 : 0x04 ) + // 0b00100
					( buffer[ 3 ] == 'A' ? 0 : 0x02 ) + // 0b00010
					( buffer[ 4 ] == 'A' ? 0 : 0x01 ) // 0b00001
				);
				buffer = [];
				result += ( result.length ? space : '' ) + alphabet.charAt( alphabetIndex );
				space = '';
			}
		}
		return result;
	};

	const encode = function ( string, options ) {
		string = string.toUpperCase();
		let alphabet;
		if ( options && options.alphabet != null ) {
			alphabet = options.alphabet.toUpperCase();
		} else {
			// Use the most common 24-letter Bacon alphabet by default.
			alphabet = DEFAULT_ALPHABET;
			string = string
				.replace( /J/g, 'I' )
				.replace( /V/g, 'U' );
		}
		let index = -1;
		const length = string.length;
		let alphabetIndex;
		let space = '';
		let result = '';
		while ( ++index < length ) {
			alphabetIndex = alphabet.indexOf( string.charAt( index ) );
			if ( alphabetIndex > -1 ) {
				result += space + (
					( alphabetIndex & 0x10 ? 'B' : 'A' ) + // 0b10000
					( alphabetIndex & 0x08 ? 'B' : 'A' ) + // 0b01000
					( alphabetIndex & 0x04 ? 'B' : 'A' ) + // 0b00100
					( alphabetIndex & 0x02 ? 'B' : 'A' ) + // 0b00010
					( alphabetIndex & 0x01 ? 'B' : 'A' ) // 0b00001
				);
				space = '';
			} else if ( index ) {
				// Prepare a space to be added to the output, unless it's leading space.
				space = ' ';
			}
		}
		return result;
	};

	const bacon = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define( function () {
			return bacon;
		} );
	} else if ( freeExports && !freeExports.nodeType ) {
		if ( freeModule ) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = bacon;
		} else { // in Narwhal or RingoJS v0.7.0-
			for ( const key in bacon ) {
				bacon.hasOwnProperty( key ) && ( freeExports[ key ] = bacon[ key ] );
			}
		}
	} else { // in Rhino or a web browser
		root.bacon = bacon;
	}

}( this ) );
