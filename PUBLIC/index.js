// import data from "./getData.js";
// let tasks = data;
let url = 'http://localhost:3000/tasks';

const getData = async (url) => {
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
    
        if (response.ok) {
            let result = await response.json();
            return result;
            // console.log("Success:", result);
        } else {
            console.error("Server error:", response.statusText);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};


let tasks = await getData(url)

//SIDE BAR EVENT LISTENERS 
// document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.getElementById("menu-btn");
    const showBtn = document.getElementById("show-btn");

    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("hidebar");
        document.querySelector('.menu-hide').style.display='';
    });

    showBtn.addEventListener("click", () => {
        sidebar.classList.remove("hidebar");
        document.querySelector('.menu-hide').style.display='none';
    });
// });



// CALL THE FUNCTIONS AFTER THE DOM IS LOADED
// document.addEventListener("DOMContentLoaded",()=>{
//     // getTasks();
//     // getTasks();
//     console.log('sfvnh')
//     showTasks(tasks);
//     // archiveTask();
//     // completetask()
//     // addForm();
//     // updateForm();
//     // deleteTask();
// })



/*******************************SEND TO SERVER*******************************/

const sendData= async(data,url,method) =>{
    try {
        let response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    
        if (response.ok) {
            let result = await response.json();
            return result;
            // console.log("Success:", result);
        } else {
            console.error("Server error:", response.statusText);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
     
}
    
const sendReq = async (url) => {
    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });
    
        if (response.ok) {
            let result = await response.json();
            return result;
            // console.log("Success:", result);
        } else {
            console.error("Server error:", response.statusText);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

/**********************************GET TASKS**********************************/ 

    const showTasks = (tasks,archive=0) =>{
        // tasks=tasks.reverse();
        let main = document.querySelector('.main');
        main.innerHTML='';
        const addtask_div = document.createElement('div');
        addtask_div.classList.add('task');
        addtask_div.classList.add('add-task');
        addtask_div.innerHTML=`<button id="add"><i class="bx bx-plus-circle"></i></button>`
        main.appendChild(addtask_div);
        tasks=tasks.filter(task=>task.archived==archive);
        tasks.forEach(task=>{
            let taskDiv = document.createElement('div');
            taskDiv.dataset.id = task.id;
            taskDiv.dataset.status = task.status;
            taskDiv.dataset.archive = task.archived;
            taskDiv.classList.add('task');
            let stat;
            task.status ? stat ='Completed' : stat='Todo';
            taskDiv.innerHTML = `
            <header>
                <span class="status">${stat}</span>
                <span class="label">${task.label}</span>
                <h1 class="task-title">${task.title}</h1>
            </header>
            <main>
                <span class="description">${task.description}</span>
            </main>
            <footer>
                <span class="due-date">${task.due_date}</span>
                <span class="buttons">
                    <button class="mark-complete-btn"><i class='bx bx-check-double'></i></button>
                    <button class="delete-btn"><i class='bx bx-trash' ></i></button>
                    <button class="mark-archive-btn"><i class='bx bx-hide'></i></button>
                    <button class="edit-btn"><i class='bx bx-edit' ></i></button>
                </span>
            </footer>
        `;
           
            // document.querySelector('.main').insertBefore(taskDiv,document.querySelector('.add-task'))
            const main = document.querySelector('.main');
            const addTask = document.querySelector('.add-task');
    
            if (main && addTask) {
                main.insertBefore(taskDiv, addTask.nextSibling);
            }
            if(task.status){
                taskDiv.style.backgroundColor='#d6ffb5';
            }
            addForm();
            updateForm();
           
       });
   }

    // showTasks(tasks);
   //SHOW ALL TASKS
   document.querySelector('#all-tasks').addEventListener('click',()=>showTasks(tasks))
    

   //SEARCH TASK
   document.querySelector('#search').addEventListener("input", ()=> {
        let value = document.querySelector('#search').value;
        let task = tasks.filter(task=>task.title.toLowerCase().includes(value.toLowerCase())||task.description.toLowerCase().includes(value.toLowerCase()));
        showTasks(task);
    });

    //FILTER BY STATUS
    const showStatus = (status)=>{
        let statusTasks = tasks.filter(task=>task.status==status);
        showTasks(statusTasks);
    }
    
    const todo_btn=document.querySelector('#todo-btn');
    todo_btn.addEventListener('click',()=>showStatus(0));
    
    const completed_btn=document.querySelector('#completed-btn');
    completed_btn.addEventListener('click',()=>showStatus(1));
    
    
    //FILTER BY LABELS
    const showTag = (tag)=>{
         let labelTasks = tasks.filter(task=>task.label==tag);
         showTasks(labelTasks)
     }
     
    const personal_btn=document.querySelector('#personal-btn');
    personal_btn.addEventListener('click',()=>showTag('Personal'));
    
    const work_btn=document.querySelector('#work-btn');
    work_btn.addEventListener('click',()=>showTag('Work'));

    const others_btn=document.querySelector('#others-btn');
    others_btn.addEventListener('click',()=>showTag('Others'));
    
    //SHOW ARCHIVES
    const archive_btn=document.querySelector('#archive-btn');
    archive_btn.addEventListener('click',()=>showTasks(tasks,1));

/*********************************ARCHIVE TASK*********************************/

    const archiveTask = () => {
        document.querySelector(".main").addEventListener("click", (event) => {
            if (event.target.closest(".mark-archive-btn")) { 
                let taskDiv = event.target.closest(".task");
                if (taskDiv && confirm("Are you sure you want to archive this task?")) {
                    let taskId = parseInt(taskDiv.dataset.id); 
    
                    let task = tasks.find(t => t.id === taskId);
                    if (task) {
                        task.archived = 1;
                        console.log("task id: ",task.id); 
                        sendData({},`http://localhost:3000/updateArchive/${task.id}`,"PATCH")
                    }
                    showTasks(tasks, 0); 
                }
            }
        });
    };
    // archiveTask()

    /*********************************Complete TASK*********************************/
    
    const completetask = () =>{
        document.querySelector(".main").addEventListener("click", (event) => {
            if (event.target.closest(".mark-complete-btn")) { 
                let taskDiv = event.target.closest(".task");
                if (taskDiv && confirm("MARK THE TASK AS COMPLETE?")) {
                    let taskId = parseInt(taskDiv.dataset.id); 
    
                    let task = tasks.find(t => t.id === taskId);
                    if (task) {
                        task.status = 1;
                        console.log("task id: ",task.id);
                        sendData({},`http://localhost:3000/updateStatus/${task.id}`,"PATCH")
                    }
                    showTasks(tasks, 0); 
                }
            }
        });   
        // completetask();
    };


/**********************************ADD TASK**********************************/ 

//CONVERT TO FORM FOR ADD TASK
const addForm = () =>{
    document.querySelector('.add-task').addEventListener("click", (event) => {
        let taskDiv = document.querySelector('.add-task')

        //CREATING FORM
        let form = document.createElement("form");
        form.classList.add("task");
        form.innerHTML = `
                    <header>
                        <select name="label" id="label" class="label">
                            <option>Work</option>
                            <option>Personal</option>
                            <option>Other</option>
                        </select>
                        <input type="text" id="task-title" class="task-title" placeholder='TASK TITLE' required>
                    </header>
                        <textarea name="description" id="description" class="description" placeholder="TASK DESCRIPTION"></textarea>
                    <footer>
                        <input type="date" name="due-date" id="due-date" class="due-date" value="">
                        <span class="buttons">
                             <button type="submit" class="save-btn"><i class='bx bx-save'></i></button><button id="cancel"> <i class="bx bxs-x-circle"></i></button>
                        </span>
                    </footer>
`;
//Replace this form with the div
        if(taskDiv)
        taskDiv.replaceWith(form);
        cancelAdd();

        // Save with Button
            form.addEventListener('submit',(e)=>{
                e.preventDefault()
                appendTask(form);
               
            })
    });

}

//CANCEL UPDATE
const cancelAdd = ()=>{
    const cancel = document.querySelector('#cancel');
    cancel.addEventListener('click',(event)=>{
        event.preventDefault();
       const addtask_div = document.createElement('div');
       addtask_div.classList.add('add-task');
       addtask_div.classList.add('task');
       addtask_div.innerHTML=`<button id="add"><i class="bx bx-plus-circle"></i></button>`
       if(document.querySelector('form'))
       document.querySelector('form').replaceWith(addtask_div); 
       addForm();
})
}


//APPEND FORM TO MAIN
const appendTask = (form) =>{
let label = form.querySelector(".label").value;
let title = form.querySelector(".task-title").value;
let description = form.querySelector(".description").value;
let dueDate = form.querySelector(".due-date").value;

let data = {
    label: label,
    title: title,
    description: description,
    dueDate: dueDate,
    status: 0,
    archive: 0
}
//send data to server
console.log(data);
sendData(data,"http://localhost:3000/add","POST");

// Create a new task div
let taskDiv = document.createElement("div");
taskDiv.classList.add("task");
taskDiv.innerHTML = `
    <header>
        <span class="status">Todo</span>
        <span class="label">${label}</span>
        <h1 class="task-title">${title}</h1>
    </header>
    <main>
        <span class="description">${description}</span>
    </main>
    <footer>
        <span class="due-date">${dueDate}</span>
        <span class="buttons">
            <button class="complete-btn"><i class='bx bx-check-double'></i></button>
            <button class="delete-btn"><i class='bx bx-trash' ></i></button>
            <button class="archive-btn"><i class='bx bx-hide'></i></button>
            <button class="edit-btn"><i class='bx bx-edit' ></i></button>
        </span>
    </footer>
`;


//replace the form with add task div again
const addtask_div = document.createElement('div');
addtask_div.classList.add('task','add-task');
addtask_div.innerHTML=`<button id="add"><i class="bx bx-plus-circle"></i></button>`;

form.replaceWith(addtask_div)
const main = document.querySelector('.main');
    if (main && addtask_div) {
        main.insertBefore(taskDiv, addtask_div.nextSibling);
    }

updateForm();
addForm();
}

/*********************************UPDATE TASK*********************************/

//CONVERT TO FORM FOR UPDATE
const updateForm = () =>{
    // document.querySelectorAll(".edit-btn").forEach(button=>{
    //     button.addEventListener("click", (event) => {
    //         let taskDiv = event.target.closest(".task");

    document.querySelector(".main").addEventListener("click", (event) => {
        if (event.target.closest(".edit-btn")) {
            let taskDiv = event.target.closest(".task");
            if(!taskDiv) return;

            //GET EXISTING VALUES
            let label = taskDiv.querySelector(".label").innerText.trim();
            let title = taskDiv.querySelector(".task-title").innerText.trim();
            let description = taskDiv.querySelector(".description").innerText.trim();
            let dueDate = taskDiv.querySelector(".due-date").innerText.trim();
            //CREATING FORM
            let form = document.createElement("form");
            form.classList.add("task");

            form.dataset.id = taskDiv.dataset.id;
            form.dataset.archive = parseInt(taskDiv.dataset.archive);
            form.dataset.stat = taskDiv.querySelector('.status').innerText;
            form.innerHTML = `
                        <header>
                            <select name="label" id="label" class="label">
                                <option ${label === "Work" ? "selected" : ""}>Work</option>
                                <option ${label === "Personal" ? "selected" : ""}>Personal</option>
                                <option ${label === "Other" ? "selected" : ""}>Other</option>
                            </select>
                            <input type="text" class="task-title" value="${title}">
                        </header>
                            <textarea name="description" id="description" class="description">${description}</textarea>
                        <footer>
                            <input type="date" name="due-date" id="due-date" class="due-date" value="${dueDate}">
                            <span class="buttons">
                                 <button type="submit" class="save-btn"><i class='bx bx-save'></i></button>
                            </span>
                        </footer>
    `

            //Replace this form with the div
            taskDiv.replaceWith(form);

            // Save with Button
                form.querySelector(".save-btn").addEventListener("click", (e) => {
                    e.preventDefault();
                    saveTask(form);
                });
 } });    
}
//SAAVE THE UPDATED TASK
function saveTask(form) {
    let label = form.querySelector(".label").value;
    let title = form.querySelector(".task-title").value;
    let description = form.querySelector(".description").value;
    let dueDate = form.querySelector(".due-date").value;
    let stat = form.dataset.stat;
    let status;
    (stat=='Todo')? status=0 : status=1;
    // let status = form.querySelector(".status").value;

    // Create a new task div
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
   
    taskDiv.innerHTML = `
        <header>
            <span class="status">${stat}</span>
            <span class="label">${label}</span>
            <h1 class="task-title">${title}</h1>
        </header>
        <main>
            <span class="description">${description}</span>
        </main>
        <footer>
            <span class="due-date">${dueDate}</span>
            <span class="buttons">
                <button class="complete-btn"><i class='bx bx-check-double'></i></button>
                <button class="delete-btn"><i class='bx bx-trash' ></i></button>
                <button class="archive-btn"><i class='bx bx-hide'></i></button>
                <button class="edit-btn"><i class='bx bx-edit' ></i></button>
            </span>
        </footer>
    `;
    let archive = form.dataset.archive;
    //send data to server
    let data = {
        label: label,
        title: title,
        description: description,
        dueDate: dueDate,
        status: status,
        archive: parseInt(archive)
    }
    console.log(data);
    let id = form.dataset.id;
    sendData(data,`http://localhost:3000/update/${id}`,"PUT");

    // Replace form with the updated task div
    form.replaceWith(taskDiv);

    // Reattach event listeners for edit buttons
    const todo_btn=document.querySelector('#todo-btn');
    todo_btn.addEventListener('click',()=>showStatus(0));
    
    const completed_btn=document.querySelector('#completed-btn');
    completed_btn.addEventListener('click',()=>showStatus(1));
    updateForm();
    // archiveTask();
  
}

/*********************************DELETE TASK*********************************/

const deleteTask = () => {
    document.querySelector(".main").addEventListener("click", (event) => {
        if (event.target.closest(".delete-btn")) {
            let taskDiv = event.target.closest(".task");
            let id = taskDiv.dataset.id;
            if (taskDiv && confirm("Are you sure you want to delete this task?")) {
                sendData({},`http://localhost:3000/delete/${id}`,"DELETE")
                taskDiv.remove();
            }
        }
    });
};


showTasks(tasks);
    archiveTask();
    completetask()
    addForm();
    // updateForm();
    deleteTask();


