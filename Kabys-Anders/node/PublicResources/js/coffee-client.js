'use strict'
//SEE: https://javascript.info/strict-mode


function jsonParse(response){
  if(response.ok) 
     if(response.headers.get("Content-Type") === "application/json") 
       return response.json();
     else throw new Error("Wrong Content Type");   
 else 
    throw new Error("Non HTTP OK response");
}

//GET on URL and decode response body as json
function jsonFetch(url){
  return  fetch(url).then(jsonParse);
}

//POST on url with data as json data in body, and expecting json in response body
function jsonPost(url = '', data={}){
  console.log('Sending POST request to:', url); // Debugging log
  console.log('With data:', data); // Debugging log
  const options={
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
    };
  return fetch(url,options).then(jsonParse);
}

console.log("JS er klar!");

//Some example tests of server's API
/*
jsonPost("test", {name:"Mickey"}).then(status=>{
  console.log("Status="); console.log(status);
}).catch(e=>console.log("SERVER-SIDE VAlidation: FAIL "+e.message));

//expect validation error as this orderID does not exist
jsonFetch("coffee-orders/117").then(status=>{
  console.log("Status="); console.log(status);
}).catch(e=>console.log("SERVER-SIDE VAlidation: PASS "+e.message));
*/


/* In this app we don't use the browsers form submission, but the API defined by the server,
   Hence we extract the values of the input fields of the form and store them in an object, that is
   sent to the server as part of a POST to insert a new record (alse sends updated record back) 
*/ 

function extractCoffeeFormData(){
 
  const name = document.getElementById('name_id').value
  const strength = document.getElementById('coffeStrength_id').value

  const milkoptions = document.getElementsByName('milk')
  let selectedMilk =''
  for (options of milkoptions ) {
    if (option.checked) {
      selectedMilk = option.value
      break;
    }
  }
  let coffeeData = {
    name: name,
    strength: strength,
    milk: selectedMilk
  }

  console.log(coffeeData)
  return coffeeData;
}

function extractCoffeeStatusFormData(){
  let coffeeStatusData={};
  coffeeStatusData.orderID=document.getElementById("coffeeOrder_id").value;
  console.log("Extracted"); console.log(coffeeStatusData);
  return coffeeStatusData;
}

function sendCoffeeOrder(event) {
  console.log("does this work")
  event.preventDefault();                                      //we handle the interaction with the server rather than browsers form submission
  document.getElementById("submitOrderBtn_id").disabled=true; //prevent double submission

  let coffeeFormData = extractCoffeeFormData();
  console.log('Form data to be sent:', coffeeFormData); // Debugging log
  //GET on coffee-orders/orderID

  jsonPost(document.getElementById("coffeeOrderForm_id").action, coffeeFormData).then(coffeeStatus=>{
    console.log("Response from server:", coffeeStatus); // Debugging log
    console.log("Status="); console.log(coffeeStatus);
    let resultElem=document.getElementById("result_id");
    resultElem.textContent=`Hi ${coffeeStatus.name}! Your order was received at ${coffeeStatus.orderTime}. Your order number is ${coffeeStatus.orderID}`
    resultElem.style.visibility="visible";
    document.getElementById("submitOrderBtn_id").disabled=false; //re-enable submission 
  }).catch(e=>{
    console.log("Ooops "+e.message);
    alert("Encountered Error:" +e.message + "\nPlease retry!");
    document.getElementById("submitOrderBtn_id").disabled=false;
  });
}

document.getElementById("coffeeOrderForm_id").addEventListener("submit", sendCoffeeOrder);
console.log("Event listener registered for form submission.");


function requestCoffeeStatus(event) {
  event.preventDefault();                                      //we handle the interaction with the server rather than browsers form submission
  document.getElementById("submitStatusBtn_id").disabled=true; //prevent double submission
  let coffeeStatusFormData=extractCoffeeStatusFormData();
  //GET on coffee-orders/orderID
  jsonFetch(document.getElementById("coffeeStatusForm_id").action+"/"+coffeeStatusFormData.orderID,coffeeStatusFormData).then(coffeeStatus=>{
    console.log("Status="); console.log(coffeeStatus);
    let statusElem=document.getElementById("status_id");
    statusElem.textContent=`Hi ${coffeeStatus.name}! Your order was received at ${coffeeStatus.orderTime}. Your order is ${coffeeStatus.isReady?"":"not"} ready !`
    statusElem.style.visibility="visible";
    document.getElementById("submitStatusBtn_id").disabled=false; //re-enable submission 
  }).catch(e=>{
    console.log("Ooops "+e.message);
    alert("Encountered Error:" +e.message + "\nPlease retry!");
    document.getElementById("submitStatusBtn_id").disabled=false;
  });
}

document.getElementById("coffeeStatusForm_id").addEventListener("submit", requestCoffeeStatus);