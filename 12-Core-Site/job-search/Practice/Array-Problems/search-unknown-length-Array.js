const expect = require( 'chai' ).expect;

/* PROBLEM - Search Unknown Length Array - Given a sorted array of unknown length and a number to search for, return the index of the number in the array. Accessing an element out of bounds throws exception. If the number occurs multiple times, return the index of any occurrence. If it isn't present, return -1. */

let myArr = [ 3, 5, 6, 7, 8 ];

console.log( myArr.indexOf( 11 ) );
