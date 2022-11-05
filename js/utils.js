//SELECTOR
const  $=function(element){
    return document.querySelector(element)
 }
 
 
 // Select all
 const  $a=function(element){
    return document.querySelectorAll(element)
 }
 
 
 
 //Create element
 const createElement=function(tagName,className,content){
 
     const newElement=document.createElement(tagName);
 
     if(className){
       newElement.setAttribute('class', className);
     }
     if(content){
       newElement.innerHTML=`${content}`;
     }
     
     return newElement
 }