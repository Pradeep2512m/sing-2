

window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2"

let APP_ID = "badc8b21";
let API_KEY = "4bbef650a730a16f8f94b6c25a5d6b61";
let TYPE = "public"      //string

/*
@param {Array} queries array
@param {Function} success callback function

*/


export const fetchData = async function (queries, successCallback){
    const query=queries?.join("&")
    .replace(/,/g, "=")
    .replace(/ /g, "%20")
    .replace(/\+/g, "%2B")

    const url= `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${query ? `&${query}`:""}`;   //string
 

    const response =await fetch (url);    //object

    if(response.ok){
        const data=await response.json();
        successCallback(data);
        
    }
}