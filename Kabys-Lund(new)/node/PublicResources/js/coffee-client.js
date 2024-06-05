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
  let coffeeOrderData={};
  coffeeOrderData.name=document.getElementById("name").value;
  coffeeOrderData.str=document.getElementById("coffeeStrength_id").value;
  coffeeOrderData.milk =document.querySelector('input[name="coffeeMilk"]:checked').value;
  console.log("Extracted"); console.log(coffeeOrderData);
  return coffeeOrderData;
}
function coffeeOrder(event){
  event.preventDefault();                                      //we handle the interaction with the server rather than browsers form submission
  let coffeeOrderData=extractCoffeeOrderFormData();
  fetch('/coffee-orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coffeeOrderData),
  }
  ).then(response => response.json())
  .then(data => {
    data.map((item)=>{
      console.log(item.name)
      let orderName = item.name;
      let orderTime = item.orderTime;
      let isReady = item.isReady;
      let ordermessage = document.getElementById("orderMessage_id");
      ordermessage.textContent=`Hi ${orderName}! Your order was received at ${orderTime}. Your order is ${isReady?"":"not"} ready !`
    });
    
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}
document.getElementById("coffeeOrderForm_id").addEventListener("submit", coffeeOrder);

document.getElementById("coffeeStatusForm_id").addEventListener("submit", requestCoffeeStatus);