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


function extractCoffeeStatusFormData(){
  let coffeeStatusData={};
  coffeeStatusData.orderID=document.getElementById("coffeeOrder_id").value;
  console.log("Extracted"); console.log(coffeeStatusData);
  return coffeeStatusData;
}

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

function extractCoffeeOrderFormData(){
  let coffeeData = {
    name: "",
    str: "",
    milk: ""
  };

  coffeeData.name = document.getElementById("nameOrder_id").value;
  coffeeData.str = document.getElementById("coffeeStr").value;

  let milkOptions = document.getElementsByName("milk");
  for (let i = 0; i < milkOptions.length; i++) {
    if (milkOptions[i].checked) {
      coffeeData.milk = milkOptions[i].value;
      break;
    }
  }

  console.log(coffeeData);
  return coffeeData;
}

async function orderCoffee(event) {
  event.preventDefault(); // We handle the interaction with the server rather than browser's form submission
  document.getElementById("submitOrderBtn_id").disabled = true; // Prevent double submission
  
  // Extract the coffee order data
  let coffeeFormData = extractCoffeeOrderFormData();
  
  try {
    // Send the coffee order data to the server
    let coffeeStatus = await jsonPost(document.getElementById("coffeeOrderForm_id").action, coffeeFormData);
    
    console.log("Ordered: ");
    console.log(coffeeStatus);
    
    // Update the status element with the response
    let orderedElem = document.getElementById("ordered_id");
    orderedElem.textContent = `Hi ${coffeeStatus.name}! Your order was received at ${coffeeStatus.orderTime}. Your order is ${coffeeStatus.orderID }!`;
    orderedElem.style.visibility = "visible";
    
    document.getElementById("submitOrderBtn_id").disabled = false; // Re-enable submission
  } catch (e) {
    console.log("Oops " + e.message);
    alert("Encountered Error: " + e.message + "\nPlease retry!");
    document.getElementById("submitOrderBtn_id").disabled = false;
  }
}

// Utility function to send JSON data via a POST request
async function jsonPost(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
}

document.getElementById("coffeeStatusForm_id").addEventListener("submit", requestCoffeeStatus);
document.getElementById("coffeeOrderForm_id").addEventListener("submit", orderCoffee);
