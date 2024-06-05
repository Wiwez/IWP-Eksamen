let minNum = 1;
let maxNum = 100;
let numToGuess = Math.floor(Math.random() * (maxNum - minNum + 1 )) + minNum;
let attemps = 0 
let userGuess
console.log(numToGuess)

function guessNumber(){
    let userGuess = document.getElementById("guess").value
    let guessMessage = document.getElementById("guessMessage")
    console.log(userGuess)
    if(userGuess == numToGuess){
        guessMessage.textContent = "SUCESS"
        window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    }else{
        if(numToGuess<userGuess){
            if(userGuess- numToGuess >= 10){
            guessMessage.textContent = "Lower"
            }else{
                guessMessage.textContent = "Getting closer - Lower"
            }
        }

        if(numToGuess>userGuess){
            if(numToGuess-userGuess >= 10){
            guessMessage.textContent = "Higher"
        }else{
            guessMessage.textContent = "Getting closer - Higher"
        }
        }

    }

}