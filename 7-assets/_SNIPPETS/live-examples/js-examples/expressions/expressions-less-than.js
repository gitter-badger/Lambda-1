console.log( 5 < 3 );
// expected output: false

console.log( 3 < 3 );
// expected output: false

// Compare bigint to number (note: bigint is not supported in all browsers)
console.log( 3n < 5 );
// expected output: true

console.log( 'aa' < 'ab' );
// expected output: true
