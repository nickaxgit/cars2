"use strict"

let makes={ford:[],tesla:[],bmw:[],vauxhall:[]}
makes.ford="Fiesta,Focus,KA,Mondeo,Fusion,Transit".split(",")
makes.tesla="3,sport,Cybertruck".split(",")
makes.bmw="3,5,i3,i7,1 series".split(",")
makes.vauxhall="Corsa,Insignia,Movano,Astra,Senator"

let cars=generateRandomCars(makes,3)


let holder = document.getElementById("holder")

for (let i=0;i<cars.length;i++){
    let card = document.createElement("div")
    card.classList.add("card")        
    holder.appendChild(card)

    let heading= document.createElement("h1")
    heading.innerHTML= cars[i].make + " " + cars[i].model
    card.appendChild(heading)

    let price= document.createElement("p")
    price.innerHTML= cars[i].price
    card.appendChild(price)
    
}


function generateRandomCars(makes,numCars){

    let cars=[]
    for(let i=0;i<numCars;i++){
        let make=pickFrom(Object.keys(makes))  //Pick a manufacturer from the makes object
        let model = pickFrom(makes[make])
        cars.push({make:make,model:model,price:randomInteger(10000),mileage:randomInteger(100000)})    
    }

    return cars  //send back the 'complete' list of cars
}


// a generic function to return a random selection from ANY array (i choose to pass it)
function pickFrom(list){
    let r=Math.floor(Math.random()* list.length)  // generate a random number between 0 and the list length (-1)
    return list[r]  //return the chosen item
    
}

function randomInteger(max){  //Returns a number between 1 and max (inclusive)
    return Math.floor(Math.random() * max) +1
}

