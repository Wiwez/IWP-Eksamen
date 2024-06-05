let Decrease = document.getElementById("Decrease")
let Increase = document.getElementById("Increase")
let Reset = document.getElementById("Reset")
let Counter = document.getElementById("counterlbl")
let i = 0

function increaseCounter(){
    i++
    Counter.textContent = i
}
function decreaseCounter(){
    i--
    Counter.textContent = i
    
}
function resetCounter(){
    i = 0
    Counter.textContent = i

}
