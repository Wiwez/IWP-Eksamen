let diceroll = [1,6,6,2,3,4,6,2,6];
let v;

let findDices_v1 = function (dice, compare, underequal3){
    let i = 0;
    let j = 0;
    let dicerollarray = [];
    for(i=0; i<dice.length; i++){
        v = dice[i];
        if(compare(v)){         
            dicerollarray[j] = i+":"+dice[i];
            j++
        }
    }
    return "6 Position "+ dicerollarray + " & Numbers under and equal to 3: " + underequal3;
}
function is6(v){
    if(v === 6){
        return true;
    }else{
        return false;
    }
}

let dicefilter = diceroll.filter(dice=>dice==6).reduce((sum,dice)=>sum+dice,0);

underequal3 = diceroll.filter(x => x <= 3);
console.log(findDices_v1(diceroll, is6, underequal3));
console.log("Sum of all 6s: "+dicefilter);
