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


// apply the same behavior on the ui and the local storage
const taskData = [] || JSON.parse(localStorage.getItem("data"));
let currentTask = {}
// create a function to remove any special characters from the input
const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '')
}
openTaskFormBtn.addEventListener("click",()=>{
    taskForm.classList.toggle("hidden")
})

// working on the dialog element and how to close it 


closeTaskFormBtn.addEventListener("click",()=>{
  // check if the user has entered any data into the form by creating a truthy varaible that check on the iputs of the task form 
  const formInputsContainValues= titleInput.value || dateInput.value|| descriptionInput.value;
  // check if the user has updatedt the form inputs or not
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;
   if(formInputsContainValues &&formInputValuesUpdated ){
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
    addOrUpdateTask();

});

// enhance the code by add the task or update the task based on the user action
const addOrUpdateTask = ()=>{

  // make suer that the titel is not containes any white spaces
  if(!titleInput.value.trim()){
    alert("Please provide a title");
    return;
  }
    // we will use findIndex to check if the task is already exist or not and this methd is used to find the index of the first element in the array that satisfies the provided testing function
    const dataArrIndex = taskData.findIndex(item => item.id === currentTask.id);
    // when a user wants to create a task this task sholud be saved into an object
    const taskObj = {
        id:`${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
        title:removeSpecialChars(titleInput.value),
        date:dateInput.value,
        description:removeSpecialChars(descriptionInput.value)

    };
   if(dataArrIndex=== -1){
    taskData.unshift(taskObj);
   }else{
    taskData[dataArrIndex]=taskObj

   }
   updateTaskContainer()
   reset()
   localStorage.setItem("data",JSON.stringify(taskData));
}


// create the update function 

const updateTaskContainer = ()=>{

  // clear the tasksContainer before displaying the tasks to avoid the duplication.
  tasksContainer.innerHTML = "";
  // looping through the taskData array and display the tasks in the tasksContainer
taskData.forEach(({id, title, date, description}) => {
  tasksContainer.innerHTML += `
    <div class="task" id="${id}">
      <p><strong>Title:</strong> ${title}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Description:</strong> ${description}</p>
      <button onclick="editTask(this)" type="button" class="btn">Edit</button>
      <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
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
  addOrUpdateTaskBtn.innerText = "Add Task"
}


// delet task function

const deleteTask =(buttonEl)=>{
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id);
    buttonEl.parentElement.remove();
    if(dataArrIndex !== -1){
      taskData.splice(dataArrIndex,1)

    }
    // we don't need to remove or clear the local storage we need jsut to save the new items after deleting the task
    localStorage.setItem("data",JSON.stringify(taskData));

};

// edit task function
const editTask = (buttonEl)=>{
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id);
    currentTask = taskData[dataArrIndex];
    titleInput.value = currentTask.title;
    descriptionInput.value=currentTask.description;
    dateInput.value=currentTask.date;
    addOrUpdateTaskBtn.innerText = "Update Task";
    taskForm.classList.toggle("hidden");
}

// make sure that the tasks are displayed when the page is refreshed
if(taskData.length){
  updateTaskContainer()
}