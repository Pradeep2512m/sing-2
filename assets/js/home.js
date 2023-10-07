
// Importing custom javascript files
"use strict";
import { fetchData } from "./api.js";
import { $skeletonCard, cardQueries } from "./global.js";
import { getTime } from "./module.js";

const $searchField=document.querySelector('[data-search-field]');
const $searchBtn=document.querySelector("[data-search-btn]");

$searchBtn.addEventListener('click',()=>{
    if($searchField.value)window.location=`/recipes.html?q=.html?q=${$searchField.value}`;
})

// Search submit when pressed Enyter key

$searchField.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
        $searchBtn.click()
    }
});


// tab panel navigation

let $tabBtns=document.querySelectorAll('[data-tab-btn]');    //Nodelist
let $tabpanels=document.querySelectorAll('[data-tab-panel');
let [$lastactiveTabPanel]=$tabpanels;   //NodeElement
let [$lastActiveTabBtn]=$tabBtns;        //NodeElement
 

addEventOnElements($tabBtns, 'click',function(){
    $lastactiveTabPanel.setAttribute('hidden','');
    $lastActiveTabBtn.setAttribute('aria-selected',false);
    $lastActiveTabBtn.setAttribute('tabindex',-1);


    let $currentTabPanel = document.querySelector(`#${this.getAttribute("aria-controls")}`);
    $currentTabPanel.removeAttribute("hidden");
    this.setAttribute("aria-selected",true);
    this.setAttribute('tabindex',0);

    $lastactiveTabPanel=$currentTabPanel;
    $lastActiveTabBtn=this;

    addTabContent(this, $currentTabPanel)
});


// Navigate tab with arrow key
addEventOnElements($tabBtns, 'keydown', function(e){
    let $nextElement= this.nextElementSibling;
    let $previousElement=this.previousElementSibling;

    if(e.key==='ArrowRight' && $nextElement){
        this.setAttribute('tabindex', -1);
        $nextElement.setAttribute('tabindex',0);
        $nextElement.focus();
    }else if(e.key==='ArrowLeft' && $previousElement){
        this.setAttribute('tabindex',-1);
        $previousElement.setAttribute('tabindex',0);
        $previousElement.focus();
    }else if(e.key==='Tab'){
        this.setAttribute('tabindex',-1);
        $lastActiveTabBtn.setAttribute('tabindex',0)
    }
});





// work with Api    fetch data for tab content

const addTabContent = ($currentTabBtn, $currentTabPanel) =>{

    let $gridList = document.createElement('div');
    $gridList.classList.add("grid-list");

   $currentTabPanel.innerHTML=` 

   <div class="grid-list">
       
      ${$skeletonCard.repeat(12)}
      </div>
   `;


   fetchData([['mealType',$currentTabBtn.textContent.trim().toLowerCase()], ...cardQueries], function (data){
    console.log(data);

    $currentTabPanel.innerHTML = "";

    for (let i=0 ;i<12; i++){
        const{
            recipe: {
                image,label:title,
                totalTime: cookingTime,
                uri
            }
        } = data.hits[i];


        const recipeId = uri.slice(uri.lastIndexOf("_") + 1);
        const isSaved=window.localStorage.getItem(`cookio-recipe${recipeId}`);     //undefined || string
        const $card = document.createElement('div');
        $card.classList.add("card");
        $card.style.animationDelay= `${100 *i}ms`;

        $card.innerHTML= `
                
        <div class="grid-list">


        <div class="card">
            <figure class="card-media img-holder">
                <img src="${image}" alt="${title}" loading="lazy" height="195" width="195" class="img-cover">
            </figure>

            <div class="card-body">
                <h3 class="title-small">
                    <a href="./detail.html?recipe=${recipeId}" class="card-link">${title ?? "Untitled"}</a>
                </h3>

                <div class="meta-wrapper">
                    <div class="meta-item">
                        <span class="material-symbols-outlined" aria-hidden="true">schedule</span>

                        <span class="label-medium">${getTime(cookingTime).time || "<1"} ${getTime(cookingTime).timeUnit}</span>
                    </div>
                    <button class="icon-btn has-state ${isSaved ? "saved" :"removed"}" aria-label="Add to saved recipes" onclick="saveRecipe(this, '${recipeId}')">

                        <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>
                        <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>


                    </button>
                </div>
            </div>


            
        </div>
    </div> 
        `;

        $gridList.appendChild($card)
    }

    $currentTabPanel.appendChild($gridList);


    $currentTabPanel.innerHTML+=`
    <a href="./recipes.html?mealType=${$currentTabBtn.textContent.trim().toLowerCase()}" class="btn btn-secondary label-large has-state">Show more</a>`;
   })

    

}


addTabContent($lastActiveTabBtn , $lastactiveTabPanel);


// fetch data for slider card


let cuisineType = ["Asian" , "French"];

let $sliderSections = document.querySelectorAll('[data-slider-section]');

for(let [index, $sliderSection] of $sliderSections.entries()){
    $sliderSection.innerHTML=`
        <div class="container">
            <h2 class="section-title headline-small" id="slider-label-1">Latest ${cuisineType[index]} Recipes
            </h2>
           <div class="slider">
                <ul class="slider-wrapper" data-slider-wrapper>

                    ${`<li class="slider-item">${$skeletonCard}</li>`.repeat(10)}

                </ul>
            </div>

        </div>
    `;

    const $sliderWrapper= $sliderSection.querySelector("[data-slider-wrapper]");

    fetchData([...cardQueries, ["cuisineType",cuisineType[index]]], function(data){

       $sliderWrapper.innerHTML="";

       data.hits.map(item=>{
           const{
               recipe:{
                   image,
                   label:title,
                   totalTime:cookingTime,
                   uri
               }
           }=item;

      const recipeId = uri.slice(uri.lastIndexOf("_") + 1);
       const isSaved=window.localStorage.getItem(`cookio-recipe${recipeId}`);     //undefined || string


       const  $sliderItem=document.createElement("li");
       $sliderItem.classList.add("slider-item");
       
       console.log($sliderItem);


       $sliderItem.innerHTML=`
             
       <div class="card">
            <figure class="card-media img-holder">
                    <img src="${image}" alt="${title}" loading="lazy" height="195" width="195" class="img-cover">
            </figure>

                    <div class="card-body">
                        <h3 class="title-small">
                            <a href="./detail.html?recipe=${recipeId}" class="card-link">${title ?? "Untitled"}</a>
                        </h3>

                        <div class="meta-wrapper">
                            <div class="meta-item">
                                <span class="material-symbols-outlined" aria-hidden="true">schedule</span>

                                <span class="label-medium">${getTime(cookingTime).time || "<1"} ${getTime(cookingTime).timeUnit}</span>
                            </div>
                            <button class="icon-btn has-state ${isSaved ? "saved" :"removed"}" aria-label="Add to saved recipes" onclick="saveRecipe(this, '${recipeId}')">

                                <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>
                                <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>


                            </button>
                        </div>
                    </div>     
         </div>
        
       
       `;
       $sliderWrapper.appendChild($sliderItem);

       

    })
       
    })
     

     
}