"use strict"

class Car{
    //properties 
    make:string=""
    model:string=""    
    picture:string=""
    price:number=0
    colour:string=""
    mileage:number=0    

    constructor(make:string,model:string,picture:string,price:number,colour:string,mileage:number){
        this.make=make
        this.model=model
        this.picture=picture
        this.price=price
        this.colour=colour
        this.mileage=mileage
    }

}

let makes:any ={}

makes.Ford="Fiesta,Focus,KA,Mondeo,Fusion,B-Max".split(",")
makes.Tesla="3,Sport,Cybertruck".split(",")
makes.BMW="3,5,i3,i7,1 Series".split(",")
makes.Vauxhall="Corsa,Insignia,Movano,Astra,Senator".split(",")
makes.Toyota="Yaris,Celica,MR2,Avensis,Rav4".split(",")
makes.Nissan="Leaf,Primera,Juke,Micra".split(",")



let cars:Car[]=[]


//localStorage.removeItem("cars")

cars=JSON.parse(localStorage.getItem("cars")!);
if (cars==null){
    cars=generateRandomCars(makes,5)
    saveCars()
}

cars.push (new Car("Ford","C-max","",1000,"Blue",87500))


//cars.sort((a,b)=>a.price-b.price) 

let whichColour=$("whichColour") //grabs the dropdown box
whichColour.addEventListener("change",filterByColour)


let holder:HTMLElement = document.getElementById("holder")!
let saveButton=document.getElementById("save")
saveButton!.addEventListener("click", addCar )

renderCars(cars)

function saveCars(){

    //Store
    //localStorage.setItem("key", "d;'d'lgf;gfd;'fd';;lhgfd';gflSmith");

    let carsString=JSON.stringify(cars)  //Converts our 'complex' array of car objects into a single string 
    localStorage.setItem("cars", carsString )  //permanently save (so the user can close their browser, or even swtich off - and come back to the came cars)

    // Retrieve
    //value  = localStorage.getItem("key");

}

function renderCars(results:Car[]){

    holder.innerHTML=''
    for (let i=0;i<results.length;i++){
        
        let card = document.createElement("div")
        card.classList.add("card")        
        holder.appendChild(card)

        let heading= document.createElement("h1")
        heading.innerHTML= results[i].make + " " + results[i].model
        card.appendChild(heading)

        let picture=document.createElement("img")
        picture.src= results[i].picture
        card.appendChild(picture)
        picture.style.width="80%"

        let price= document.createElement("p")
        price.innerHTML= "£" + results[i].price
        card.appendChild(price) 
        
        let mileage= document.createElement("p")
        mileage.innerHTML= results[i].mileage + " miles"
        card.appendChild(mileage) 
        
        let color=document.createElement("div")
        color.classList.add("colorSquare")
        card.appendChild(color)
        color.style.backgroundColor=results[i].colour
    }
}

function $(id:string):HTMLElement{
    let e=document.getElementById(id) //QuerySelector / QuerySelectorAll
    if (e==null){
        alert (`No such element ${id}`)
    }    
    return e!    
}

function addCar(){

    let make=(<HTMLInputElement>$("make")).value
    let model=(<HTMLInputElement>$("model")).value
    let price=parseInt((<HTMLInputElement>$("price")).value)
    let colour=(<HTMLInputElement>$("colour")).value
    let mileage=parseInt((<HTMLInputElement>$("mileage")).value)

    
    cars.push(<Car>{make:make,model:model,price:price,colour:colour,picture:randomPic()})      

    renderCars(cars)
    saveCars()

}


function randomPic():string{

    //returns a random car image URL
    let pics=[]
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/seat/ibiza.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/peugeot/108.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/renault/clio.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/ford/b-max.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/bmw/1-series.png")
    pics.push("https://cdn.tradecentregroup.io/image/upload/q_auto/f_auto/w_400/web/Group/cars/nissan/qashqai.png")

    return pickFrom(pics)

}


function generateRandomCars(makes:any,numCars:number){

    let colours="red,orange,yellow,green,blue,violet,black,white,gray".split(",")

    let cars=[]
    for(let i=0;i<numCars;i++){
        let make=pickFrom(Object.keys(makes))  //Pick a manufacturer from the makes object
        let model = pickFrom(makes[make])
        cars.push({make:make,model:model,price:randomInteger(1000)*10,mileage:randomInteger(200000),colour:pickFrom(colours),picture:randomPic()})    
    }

    return cars  //send back the 'complete' list of cars
}


// a generic function to return a random selection from ANY array (i choose to pass it)
function pickFrom(list:string[]){
    let r=Math.floor(Math.random()* list.length)  // generate a random number between 0 and the list length (-1)
    return list[r]  //return the chosen item
    
}

function randomInteger(max:number){  //Returns a number between 1 and max (inclusive)
    return Math.floor(Math.random() * max) +1
}

function filterByColour(){

    //grab the value of the dropdown
    let filteredCars = cars.filter((c)=>c.colour==(<HTMLSelectElement>$('whichColour')).value)

    renderCars(filteredCars)

}
