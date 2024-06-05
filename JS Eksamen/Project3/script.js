function updateClock(){
    let running = true;
    let clock = document.getElementById("clock")
 setInterval(()=>{
     let dateNow = new Date()
     let timeNow = dateNow.getHours() +":" +dateNow.getMinutes()+ ":" + dateNow.getSeconds()
    clock.textContent = timeNow
 },1000)
}
document.addEventListener("DOMContentLoaded", (event) => {
    console.log("shit is loaded")
    updateClock()
  });