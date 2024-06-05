let diceroll = [1,6,6,2,3,4,6,2,6];
let v;
let darray = [];

function get6s_v3(darray, compare){
    let i = 0;
    let j = 0;
    let dicerollarray = [];
    for(i=0; i<darray.length; i++){
        v = darray[i];
        if(compare(v)){         
            dicerollarray[j] = i+":"+darray[i];
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
//get6s_v3(diceroll, is6);
console.log(get6s_v3(diceroll, is6));
