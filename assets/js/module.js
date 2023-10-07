
"use strict";

/*

@param {number} minut5e cooking time
@returns {string}
*/

export const getTime=minute=>{
    const hour=Math.floor(minute / 60); //number
    const day=Math.floor(hour / 24);  //number
 
    const time=day || hour || minute;  //number
    const unitIndex= [day,hour,minute].lastIndexOf(time);    //number
      const timeUnit=["days","hours","minutes"][unitIndex]; //string


    return {time , timeUnit}
}