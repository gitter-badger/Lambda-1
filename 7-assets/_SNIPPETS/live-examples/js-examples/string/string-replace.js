const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log( p.replace( 'dog', 'monkey' ) );
// expected output: "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"


const regex = /Dog/i;
console.log( p.replace( regex, 'ferret' ) );
// expected output: "The quick brown fox jumps over the lazy ferret. If the dog reacted, was it really lazy?"
