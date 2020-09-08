//select the elements

const clear = document.querySelector('.clear')
const dateElement = document.getElementById('date')
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST , id  ;

//get item from local storage

     
        let data = localStorage.getItem("TODO");



        if(data){
            LIST = JSON.parse(data);
            id = LIST.length; 
            loadList(LIST);
        }else{
            LIST = [];
            id = 0 ;
        }
        


    // load items to the user interface

  function loadList(array){
      array.forEach(function(item){
          addToDo(item.name , item.id , item.done , item.trash)
      })

  }

  // clear the local storage

  clear.addEventListener("click",function(){
      localStorage.clear();
      location.reload();
  });


//Show todays date
const options = {weekday: "long" , month : "short" , day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US',options);

//add to do function

function addToDo(toDo , id , done , trash){
 
    if(trash) { return } 
     
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
     
    const item =`
        <li class="item">
           <i class="fa ${DONE} co" job="complete" id="${id}"></i>
           <p class="text ${LINE}">${toDo}</p>
           <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
    `;

    const position = "beforeend";
    list.insertAdjacentHTML(position,item);

}

//add item to the list 

document.addEventListener('keyup',function(event){
      if(event.keyCode == 13){
          const toDo = input.value;
    // if the input is not empty
          if(toDo){
              addToDo(toDo,id,false,false);

              LIST.push({
                  name : toDo,
                  id : id,
                  done :false,
                  trash : false
              });
            // add item to local storage
              localStorage.setItem("TODO",JSON.stringify(LIST));
            

              id++;
          }
          input.value = "";
      }
});
      

      // complete to do

      function completeteToDo(element){
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

        LIST[element.id].done = LIST[element.id].done ? false : true;
      }

      // remove to do

      function removeToDo(element){
          element.parentNode.parentNode.removeChild(element.parentNode);

          LIST[element.id].trash  = true;

      };

      //target the items


      list.addEventListener("click", function(event){
          const element = event.target;  //return the clicked element
          const elementJob = element.attributes.job.value; //complete or delete
      

      if ( elementJob == "complete"){
          completeteToDo(element);
      }else if (elementJob == "delete"){
          removeToDo(element);
      }
     
         // add item to local storage
         localStorage.setItem("TODO",JSON.stringify(LIST));

    });
