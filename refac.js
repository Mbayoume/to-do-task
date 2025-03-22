const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// start working with localStorage and save data into an empty array

const taskData = []
let currentTask = {}

openTaskFormBtn.addEventListener("click",()=>{
    taskForm.classList.toggle("hidden")
})

// working on the dialog element and how to close it 


closeTaskFormBtn.addEventListener("click",()=>{
  // check if the user has entered any data into the form by creating a truthy varaible that check on the iputs of the task form 
  const formInputsContainValues= titleInput.value || dateInput.value|| descriptionInput.value;
   if(formInputsContainValues){
    confirmCloseDialog.showModal()
   } else{
    reset();
   }
});

// working on the discard message 

cancelBtn.addEventListener("click", ()=>{
    confirmCloseDialog.close(); 
    console.log("cancel")
});

discardBtn.addEventListener("click",()=>{
    confirmCloseDialog.close();
    reset();
});

// start working on getting data from the form and save it into an object

taskForm.addEventListener("submit", (e)=>{
    e.preventDefault();

taskForm.classList.toggle("hidden");
});

// enhance the code by add the task or update the task based on the user action
const addOrUpdateTask = ()=>{
    // we will use findIndex to check if the task is already exist or not and this methd is used to find the index of the first element in the array that satisfies the provided testing function
    const dataArrIndex = taskData.findIndex(item => item.id === currentTask.id);
    // when a user wants to create a task this task sholud be saved into an object
    const taskObj = {
        id:`${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title:titleInput
    };
   if(dataArrIndex=== -1){
    taskData.unshift(taskObj);
   }
   updateTaskContainer()
   reset()

}


// create the update function 

const updateTaskContainer = ()=>{
  // looping through the taskData array and display the tasks in the tasksContainer
taskData.forEach(({id, title, date, description}) => {
  tasksContainer.innerHTML += `
    <div class="task" id="${id}">
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Description:</strong> ${description}</p>
      <button type="button" class="btn">Edit</button>
      <button type="button" class="btn">Delete</button>
    </div>
  `
} 
);
}


// create a reset function to clear the inputs after createing the taks 
const reset =()=>{
  titleInput.value= "";
  dateInput.value="";
  descriptionInput.value="";
  taskForm.classList.toggle("hidden");
  // now we need to make the task object empty agin to make the user able to add a new task
  currentTask={};
}