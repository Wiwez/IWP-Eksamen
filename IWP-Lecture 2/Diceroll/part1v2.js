let diceroll = [1,6,6,2,3,4,6];
let v;


function get6s_v2(diceroll){
let i = 0;
let j = 0;
let dicerollarray = [];

 for(i=0; i<diceroll.length; i++){
    v = diceroll[i];
     if(is6(v)){         
           dicerollarray[j] = i+":"+diceroll[i];
           j++
    }
}
 return dicerollarray;
}

function is6(v){
    if(v === 6){
        return true;
    }else{
        return false;
    }
}
console.log(get6s_v2(diceroll));
