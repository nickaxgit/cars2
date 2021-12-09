"use strict"

let makes={Ford:[],Tesla:[],BMW:[],Vauxhall:[]}
makes.Ford="Fiesta,Focus,KA,Mondeo,Fusion,B-Max".split(",")
makes.Tesla="3,Sport,Cybertruck".split(",")
makes.BMW="3,5,i3,i7,1 Series".split(",")
makes.Vauxhall="Corsa,Insignia,Movano,Astra,Senator".split(",")
makes.Toyota="Yaris,Celica,MR2,Avensis,Rav4".split(",")
makes.Nissan="Leaf,Primera,Juke,Micra".split(",")


let cars=generateRandomCars(makes,100)

let holder = document.getElementById("holder")

let saveButton=document.getElementById("save")
saveButton.addEventListener("click", addCar )

renderCars()

function renderCars(){

    holder.innerHTML=''
    for (let i=0;i<cars.length;i++){
        let card = document.createElement("div")
        card.classList.add("card")        
        holder.appendChild(card)

        let heading= document.createElement("h1")
        heading.innerHTML= cars[i].make + " " + cars[i].model
        card.appendChild(heading)

        let picture=document.createElement("img")
        picture.src= cars[i].picture
        card.appendChild(picture)
        picture.style.width="80%"

        let price= document.createElement("p")
        price.innerHTML= "£" + cars[i].price
        card.appendChild(price) 
        
        let mileage= document.createElement("p")
        mileage.innerHTML= cars[i].mileage + " miles"
        card.appendChild(mileage) 
        
        let color=document.createElement("div")
        color.classList.add("colorSquare")
        card.appendChild(color)
        color.style.backgroundColor=cars[i].colour
    }
}

function addCar(){


    let make=document.getElementById("make").value
    let model=document.getElementById("model").value
    let price=document.getElementById("price").value
    let color=document.getElementById("color").value

    let car ={make:make,model:model,price:price}
    cars.push(car)      

    renderCars()
       

}

function generateRandomCars(makes,numCars){

    let colours="red,orange,yellow,green,blue,violet,black,white,gray".split(",")
    let pics=[]
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/seat/ibiza.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/peugeot/108.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/renault/clio.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/ford/b-max.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/bmw/1-series.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/nissan/qashqai.png")

    let cars=[]
    for(let i=0;i<numCars;i++){
        let make=pickFrom(Object.keys(makes))  //Pick a manufacturer from the makes object
        let model = pickFrom(makes[make])
        cars.push({make:make,model:model,price:randomInteger(1000)*10,mileage:randomInteger(200000),colour:pickFrom(colours),picture:pickFrom(pics)})    
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

