// first logic is for opening the modal while clicking on the plus button
let plusBtn = document.querySelector(".add-btn");
// this flag will be true if modal open and false if not.
let addFlag = false;
// this will make the modal open or close
let modalCont = document.querySelector(".modal");
plusBtn.addEventListener("click", (e)=>{
//   display the modal 
     addFlag = !addFlag;
     if(addFlag){
        modalCont.style.display = "flex";
     }
     else{
        modalCont.style.display = "none";
     }
// generate ticket
});
