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

function getMaxLessThanK(n,k){
    var max=0;
    for(var i=1;i<=n;i++){
        for(var j=i+1;j<=n;j++){
            var result=i & j;
            if(result>max && result<k){
                max=result;
            }
        }
    }
    return max;
}

function main() {
    const q = +(readLine());
    
    for (let i = 0; i < q; i++) {
        const [n, k] = readLine().split(' ').map(Number);
        
        console.log(getMaxLessThanK(n, k));
    }
}