const el=document.querySelector("#add-time")
el.addEventListener('click',a)



function a(){
    console.log("aaaaaaa")
    const fieldscontainer=document.querySelector('.schedule-item').cloneNode
    (true)
    const fields= fieldscontainer.querySelectorAll('input');
   fields.forEach(function(fields){
       fields.value="";
   });

    document.querySelector('#schedule-items').appendChild(fieldscontainer)
}
