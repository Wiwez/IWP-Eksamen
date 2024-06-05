let ale = document.querySelectorAll("#beerForm input[type='radio']");
const aleForm = document.querySelector("#beerForm");



function Drinkstatus() {
  ale.forEach((radio) => {
    console.log(radio, radio.checked);
  });
}


ale.forEach((radio) => {
  radio.addEventListener("click", Drinkstatus);
});
/*
document.body.addEventListener("mouseover", (event) => {
  console.log(event.target.nodeName,  event.target.innerHTML);
});
*/
let keylogger = [];
document.addEventListener("keydown", (event) => {
  
  event.key === keylogger.push(event.key);
  console.log(keylogger);
});
/*
start.addEventListener("click", Drinkstatus);
*/

let headline = document.createElement("h1");
headline.append("Vælg øl-type:");
document.body.prepend(headline);


let start = document.querySelector("#startButton");
let beerList = document.createElement("select");
start.before(beerList);
 

let beerTypes={
  ales: ["Bitter", "Pale Ale", "Brown Ale", "Trappist", "Porter",  "Weizenbier"],
  lagers:["Pilsner", "Münchener", "Wiener", "Bock", "Porter"],
  wilds: ["Gueuze", "Faro", "Fruit"]
};

function beerDropdown(key, beerDict){
  let beers = beerDict[key];
  beerList.innerHTML = "";
  beers.forEach((beer) => {
    let option = document.createElement("option");
    option.append(beer);
    beerList.append(option);
  });
}

ale.forEach((radio) => {
  radio.addEventListener("click", () => {
 beerDropdown(radio.value, beerTypes);
  });
  });