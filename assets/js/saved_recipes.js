

"use strict";

// import

import { getTime } from "./module.js";


const savedRecipes  = Object.keys(window.   localStorage).filter(item=>{
    return item.startsWith("cookio-recipe");
});   //Array


const $savedRecipesContainer=document.querySelector("[data-saved-recipe-container]");

$savedRecipesContainer.innerHTML=`<h2 class="headline-small sction-title">Saved Recipes</h2>`



const $gridList =document.createElement("div");

$gridList.classList.add('grid-list');


if(savedRecipes.length){
    savedRecipes.map((savedRecipe, index)=>{
        const {
            recipe:{
                image,
                label:title,
                totalTime:cookingTime,
                uri
            }
        }=JSON.parse(window.localStorage.getItem(savedRecipe));


        const recipeId = uri.slice(uri.lastIndexOf("_") + 1);
        const isSaved=window.localStorage.getItem(`cookio-recipe${recipeId}`);     //undefined || string
        const $card = document.createElement('div');
        $card.classList.add("card");
        $card.style.animationDelay= `${100 * index}ms`;

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
        
    })
}else{
    $savedRecipesContainer.innerHTML +=`<p class="body-large">You don't saved any recipes yet !</p>`
}

$savedRecipesContainer.appendChild($gridList);