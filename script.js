const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


//Function to add to-do-item
function addTask() {
  const task = inputBox.value.trim();
  if (task === "") {
    alert("Please write down a task");
    return;
  }
  //Create list and add task
  const li = document.createElement("li");
  li.innerHTML = `
  <label>
    <input type="checkbox">
    <span class= "task-span">${task}</span>
    </label>
    
    <span class="delete-btn">Delete</span>
    <span class="edit-btn">Edit</span>
`;
listContainer.appendChild(li);
inputBox.value = ""; //Empty the input box

const checkbox = li.querySelector("input");
const editButton = li.querySelector(".edit-btn");
const taskSpan = li.querySelector(".task-span");
const deleteButton = li.querySelector(".delete-btn");

//Checkbox functionality
checkbox.addEventListener("click", function() {
  li.classList.toggle("completed", checkbox.checked);
});

editButton.addEventListener("click", function(){
  const update = prompt("Edit Task: ", taskSpan.textContent);
  if(update !== null) {
    taskSpan.textContent = update;
    li.classList.remove("completed");
    checkbox.checked = false;
  }
});

deleteButton.addEventListener("click", function() {
  const confirmation = confirm("Are you sure?");
  if(confirmation == true){
    li.remove();
  }
})
}

