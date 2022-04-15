"use strict"
const API = "https://filltext.com/?rows=10&fname={firstName}&lname={lastName}&pretty=true&category=[1,2,3]"

const cardContiner = document.getElementById('continer')

const category1= document.getElementById('category1')
const category2= document.getElementById('category2')
const category3= document.getElementById('category3')

// global state data 
let globalState = {
    renderCardData: [],
    categoryFilter: 0

}

//  function to get data from API 
function load() {
    fetch(API).then(async (respons) => {
        // console.log( await respons.json())
        globalState.renderCardData = await respons.json()
        renderData(globalState.renderCardData)


    })
}


//create function to render in the card 

function renderData(arr) {
    cardContiner.innerHTML = ''
    const listOfCard = document.createElement('ul')
    for (let i = 0; i < arr.length; i++) {
        const cardElement = document.createElement('li')
        const imgCard = document.createElement('div')
        imgCard.className="imgcard"
        const nameCard = document.createElement('div')
        nameCard.className="namecard"
        const catigoryCard = document.createElement('div')
        catigoryCard.className="catigoryCard"

        imgCard.innerHTML = `${arr[i].fname[0]} ${arr[i].lname[0]} `
        nameCard.innerHTML = `${arr[i].fname} ${arr[i].lname}`
        catigoryCard.innerHTML = `category:  ${arr[i].category}`

        cardElement.appendChild(imgCard)
        cardElement.appendChild(nameCard)
        cardElement.appendChild(catigoryCard)
        listOfCard.appendChild(cardElement)

    }

    cardContiner.appendChild(listOfCard)



}
category1.addEventListener('click',function filterdata(){
    filterCategory(1)
})
category2.addEventListener('click',function filterdata(){
    filterCategory(2)
})
category3.addEventListener('click',function filterdata(){
    filterCategory(3)
})

// function to filter data depend on category
 function filterCategory  (idx) {
    let resulrArray;
     if(globalState.categoryFilter===idx)
     {
         resulrArray = globalState.renderCardData
         globalState.categoryFilter=0
     }
     else{
      resulrArray=globalState.renderCardData.filter((ele)=>{
         return ele.category ===idx
     })
     globalState.categoryFilter=idx

    }
    //  console.log('🌹🌹🌹🌹',resulrArray)
    renderData(resulrArray)

 }

load()


