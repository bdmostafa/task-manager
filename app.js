// Function to control task data
const TaskController = (function () {
    let data = {
        tasks: [
            {
                id: 1,
                title: 'task1',
                completed: false
            },
            {
                id: 2,
                title: 'task2',
                completed: false
            }
        ]
    };

    return {
        getTasks() {
            return data.tasks;
        },
        addTasks(titleTask) {
            const id = data.tasks.length > 0 ? data.tasks.length : 0
            const task = {
                id,
                title: titleTask,
                completed: false
            };
            // data.tasks.push(task);
            // console.log(task)

            // Functiona way - ES6 (as like state management)
            const updatedTask = {
                ...data,
                tasks: [...data.tasks, task]
            }
            data = updatedTask;
            return task;

        },
        completedTask(id) {
            // Mapping data task to check if id is matched
            data.tasks = data.tasks.map(task => {
                if (task.id === id) {
                    task.completed = true;
                    return task;
                } else {
                    return task;
                }
            });
            // console.log(data.tasks);
            // data.tasks = updatedTask;

        }
    }
})()



// Function to local storage
const StorageConroller = (function () {

})()



// Function to connect with task data into UI DOM
const UIController = (function () {
    // Create object for the selectors
    const selectors = {
        displayTaskArea: '.display-task-area',
        titleInput: '.title-input',
        taskBody: '#task-body',
        addTask: '.add-btn',
        updateTask: '.update-btn',
        backBtn: '.back-btn'
    }

    const displayTaskArea = () => {
        document.querySelector(selectors.displayTaskArea).style.display = 'block';
    }

    const hideTaskArea = () => {
        document.querySelector(selectors.displayTaskArea).style.display = 'none';
    }

    return {
        getSelectors() {
            return selectors
        },
        showUpdateState() {
            document.querySelector(selectors.addTask).style.display = 'none';
            document.querySelector(selectors.updateTask).style.display = 'block';
            document.querySelector(selectors.backBtn).style.display = 'block';
        },
        showBackState() {
            document.querySelector(selectors.addTask).style.display = 'block';
            document.querySelector(selectors.updateTask).style.display = 'none';
            document.querySelector(selectors.backBtn).style.display = 'none';
        },
        getTitleTask() {
            return document.querySelector(selectors.titleInput).value;
        },
        showAlert(msg, className) {
            console.log(msg, className)
        },
        clearFields() {
            document.querySelector(selectors.titleInput).value = '';
        },
        populateTask(task) {
            // Display task area when new task is added
            displayTaskArea();
            let taskResult = '';
            taskResult += `
                    <tr>
                        <th scope="row">${task.id}</th>
                        <td>${task.title}</td>
                        <td><span class="badge badge-pill badge-primary">High</span></td>
                        <td>${task.completed}</td>
                        <td>10-2-20</td>
                        <td>Mostafa</td>
                        <td>
                            <div class="progress">
                            <div class="progress-bar-striped bg-success" role="progressbar" style="width: 100%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"> <span class="text-black font-weight-bold">50%</span> </div>
                        </div>
                        </td>
                        <td>10-2-20</td>
                        <td>
                            <i class="fas fa-edit text-primary"></i>
                            <i class="fas fa-check-square text-success"></i>
                            <i class="fas fa-trash-alt text-danger"></i>
                        </td>
                    </tr>
                `
            // Insert taskResult after all the elements before end of the target div (taskBody)
            document.querySelector(selectors.taskBody).insertAdjacentHTML("beforeend", taskResult);
        },
        populateAllTask(tasks) {
            // Handle display task area
            if (tasks.length > 0) {
                displayTaskArea();
            } else {
                hideTaskArea();
            }

            // console.log(tasks);
            let tasksResult = '';
            tasks.forEach(task => {
                tasksResult += `
                    <tr>
                        <th scope="row">${task.id}</th>
                        <td>${task.title}</td>
                        <td><span class="badge badge-pill badge-primary">High</span></td>
                        <td>${task.completed}</td>
                        <td>10-2-20</td>
                        <td>Mostafa</td>
                        <td>
                            <div class="progress">
                            <div class="progress-bar-striped bg-success" role="progressbar" style="width: 100%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"> <span class="text-black font-weight-bold">50%</span> </div>
                        </div>
                        </td>
                        <td>10-2-20</td>
                        <td>
                            <i class="fas fa-edit text-primary"></i>
                            <i class="fas fa-check-square text-success"></i>
                            <i class="fas fa-trash-alt text-danger"></i>
                        </td>
                    </tr>
                `
            });
            document.querySelector(selectors.taskBody).innerHTML = tasksResult;
        }
    }
})()




// Function to combine between TaskController and UIController
const AppController = (function (Task, UI, Storage) {
    // console.log(Task.getTasks());

    // Load Event listeners
    const loadEventListeners = () => {
        const selectors = UI.getSelectors();

        // Register all the functions of click event listeners
        document.querySelector(selectors.addTask).addEventListener('click', addNewTask);
        // document.querySelector(selectors.updateTask).addEventListener('click', UpdateTask);
        // document.querySelector(selectors.backBtn).addEventListener('click', backDefault);
        // document.querySelector(selectors.addTask).addEventListener('click', addTask);
        document.querySelector(selectors.displayTaskArea).addEventListener('click', completeTask);
    }
    function addNewTask(e) {
        e.preventDefault();
        const titleTask = UI.getTitleTask();
        // console.log(titleTask);

        if (titleTask.trim() === '') {
            UI.showAlert('Oops... Title must not be an empty. Please try again!', 'warning');
        } else {
            // Update to data center
            const task = Task.addTasks(titleTask);
            // console.log(task);

            // Clear Field
            UI.clearFields();

            // Update to UI
            UI.populateTask(task)
        }
    }

    function completeTask(e) {
        if (e.target.classList.contains('fa-check-square')) {
            // console.log(e.target.parentElement.parentElement.children[0].innerText);
            const targetId = Number(e.target.parentElement.parentElement.children[0].innerText);
            Task.completedTask(targetId);
        }
    }

    return {
        init() {
            // Getting tasks from data center
            const tasks = Task.getTasks();

            // Populating tasks in UI
            UI.populateAllTask(tasks)

            // Show edit state
            UI.showUpdateState();

            // Show back state
            UI.showBackState();

            // Call event listeners
            loadEventListeners();
        }
    }


})(TaskController, UIController, StorageConroller)
// Arguments pass for better way because update/change make easier in future

// App entry point
AppController.init();