let stopWatchCounter = document.getElementById("stopwatchDisplay")
let stopWatchTime = null
let startTime = 0
let elapsedTime = 0
let running = false
let time
function startStopWatch(){
console.log("Starting Stopwatch")
if(!running){
    startTime = Date.now() - elapsedTime;

       time =  setInterval(()=>{
            let currentTime = Date.now();
            elapsedTime = currentTime - startTime
            let hours = Math.floor(elapsedTime / (1000 * 60 * 60)% 24)
            let minutes = Math.floor(elapsedTime / (1000 * 60 )% 60)
            let seconds = Math.floor(elapsedTime / 1000 % 60)
            let miliSeconds = Math.floor(elapsedTime % 1000/10)
           

            hours = String(hours).padStart(2,"0");
            minutes = String(minutes).padStart(2,"0");
            seconds = String(seconds).padStart(2,"0");
            miliSeconds = String(miliSeconds).padStart(2,"0");


            console.log(`${hours}:${minutes}:${seconds}:${miliSeconds}`)
            stopWatchCounter.textContent =`${hours}:${minutes}:${seconds}:${miliSeconds}`
        }, 10)
        running = true
}
}
function stopStopWatch(){
    console.log("Stopping Stopwatch")
    if(running){
        clearInterval(time)
        running = false
    }
        
}
function resetStopWatch(){
    console.log("Resetting Stopwatch")
    stopWatchCounter.textContent ="00:00:00:00"
        clearInterval(time)
        running = false
        startTime = 0
        elapsedTime = 0
}
