// first logic is for opening the modal while clicking on the plus button
let plusBtn = document.querySelector(".add-btn");
// this flag will be true if modal open and false if not.
let addFlag = false;
// this will make the modal open or close
let modalCont = document.querySelector(".modal");
// select the main container
let mainCont = document.querySelector(".main-container");
// selecting the text-Cont for deleting the likha hua data after creating the ticket
let textCont = document.querySelector(".text-cont");
// colors we are having in the priorities
let colors = ["pink", "yellow", "green", "purple"];
// setting the default priority color inside the modal
let defaultPriorityColor = colors[3];
// selecting the tag for the colors of the priority inside the modal
let allPriorityColor = document.querySelectorAll(".colo");

// accessing the colors for the filter of the ticket on the basis of the color
let toolBoxColors = document.querySelectorAll(".color");

// Listerner for the modal priority coloring
allPriorityColor.forEach((colorElement, index) => {
  colorElement.addEventListener("click", (e) => {
    // removing the highlight from all the colors
    allPriorityColor.forEach((colorElement) => {
      colorElement.classList.remove("highlight");
    });
    // adding the highlight to the selected color
    colorElement.classList.add("highlight");
    defaultPriorityColor = colors[index];
    console.log(defaultPriorityColor);
  });
});

plusBtn.addEventListener("click", (e) => {
  //   display the modal
  addFlag = !addFlag;
  if (addFlag) {
    modalCont.style.display = "flex";
  } else {
    modalCont.style.display = "none";
  }
});
// if anyone press enter in the modal after creating the ticket then the ticket will generate and added to the main container
modalCont.addEventListener("keydown", (e) => {
  let key = e.key;
  if (key == "Enter") {
    generateTicket(defaultPriorityColor, textCont.value, "Set Heading");
    modalCont.style.display = "none";
    addFlag = false;
    // after this the modalCont will be closed but the text eneter inside its text area(that text inside the text area is the textarea value) will remains the same so we have to remove the text area text also. below code will do that..
    // setModalDefault();
    textCont.value = "";
  }
});
function generateTicket(ticketColor, ticketTask, ticketHeading) {
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `  
  <div class="ticket-color ${ticketColor}"></div>
  <div class="ticket-heading" contenteditable="true"><strong>${ticketHeading}</strong></div>
  <div class="task-area" contenteditable="true" > ${ticketTask}</div> 
  <div class="ticket-delete">
  <i class="fa-solid fa-trash-can"></i>
        </div>
  `;
  mainCont.appendChild(ticketCont);
  removeTicket(ticketCont);
//   handle the color of the ticket by clicking on the ticket
   handleColorChange(ticketCont); 
}

function removeTicket(ticket){
     let deleteTicketDiv = ticket.querySelector(".ticket-delete");
     let trashCan = deleteTicketDiv.children[0];
     trashCan.addEventListener("click",(e) =>{
        console.log("jatin");
        ticket.remove();
     })
}

// handling the color changing  of the ticket(priority changing)
function handleColorChange(ticket){
    let ticketColor= ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click",(e) =>{
        let currentTicketColor = ticketColor.classList[1];
        //  get ticket color index
        let currentColorIndex = colors.findIndex((color) => {
           return currentTicketColor === color;
        });
        currentColorIndex++;
        let newColorIndex = currentColorIndex % 4;
        let newTicketColor = colors[newColorIndex];
        ticketColor.classList.remove(currentTicketColor);
        ticketColor.classList.add(newTicketColor);
    })
}

// this function will filter the tickets according to the color of the toolbox
for(let i=0;i<toolBoxColors.length;i++)
{
   toolBoxColors[i].addEventListener("click",(e) =>{
        let currentFilterColor = toolBoxColors[i].classList[0];
        console.log(currentFilterColor);
        
        let allTickets = document.querySelectorAll(".ticket-cont");
        for(let j=0;j<allTickets.length;j++)
        {
            let ticketColor = allTickets[j].querySelector(".ticket-color");
            if(ticketColor.classList[1] != currentFilterColor)
            {
                allTickets[j].style.display = "none";
            }
            else{
                allTickets[j].style.display = "block";
            }
        }
   })
}
