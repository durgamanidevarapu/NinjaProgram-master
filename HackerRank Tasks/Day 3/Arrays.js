'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(input => {
        return input.trim();
    });
    
    main();    
});

function readLine() {
    return inputString[currentLine++];
}

/**
*   Return the second largest number in the array.
*   @param {Number[]} nums - An array of numbers.
*   @return {Number} The second largest number in the array.
**/
function getSecondLargest(nums) {
    // Complete the function
    var sortedArray=Array.from(new Set(nums.sort()));
    var maxValue=Math.max(...sortedArray);
    var secondLargestValue=-Infinity;
    for(var i=0;i<sortedArray.length;i++){
        if(maxValue-sortedArray[i]!=0 && sortedArray[i]>secondLargestValue){
            secondLargestValue=sortedArray[i];
        }
    }
    return secondLargestValue;
}

function main() {
    const n = +(readLine());
    const nums = readLine().split(' ').map(Number);
    
    console.log(getSecondLargest(nums));
}