let diceroll = [1,6,6,2,3,4,6];
function get6s_v1(diceroll){
let i = 0;
let j = 0;
let dicerollarray = [];



 for(i=0; i<diceroll.length; i++){
     if(diceroll[i] === 6){         
           dicerollarray[j] = i+":"+diceroll[i];
           j++
    }
}
 return dicerollarray;
}
console.log(get6s_v1(diceroll));

/* KUNNE OGSÅ LØSES SÅDAN HER

let diceroll = [1, 6, 6, 2, 3, 4, 6];

function get6s_v1(diceroll) {
    let dicerollarray = [];

    diceroll.forEach((value, index) => {
        if (value === 6) {
            dicerollarray.push(index + ":" + value);
        }
    });

    return dicerollarray;
}

console.log(get6s_v1(diceroll));
*/