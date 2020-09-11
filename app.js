// Function to control task data
const TaskController = (function () {
    let data = {
        tasks: [
            {
                id: 1,
                title: 'task1',
                subTitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, harum',
                assignedTo: 'Mostafa',
                startAt: new Date().toISOString().slice(0, 10),
                endAt: new Date().toISOString().slice(0, 10),
                priority: 'High',
                status: 'In Progress',
                completedPercentage: 50
            },
            {
                id: 2,
                title: 'task1',
                subTitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, harum',
                assignedTo: 'Mostafa',
                startAt: new Date().toISOString().slice(0, 10),
                endAt: new Date().toISOString().slice(0, 10),
                priority: 'Low',
                status: 'New',
                completedPercentage: 50
            },
            {
                id: 3,
                title: 'task2',
                subTitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, harum',
                assignedTo: 'Mahumud',
                startAt: new Date().toISOString().slice(0, 10),
                endAt: new Date().toISOString().slice(0, 10),
                priority: 'Medium',
                status: 'Completed',
                completedPercentage: 90
            }
        ],
        // currentTask is for edit/update task usages
        currentTask: null
    };

    return {
        getTasks() {
            return data.tasks;
        },
        getTaskById(id) {
            return data.tasks.find(task => task.id === id)
        },
        setCurrentTask(taskToBeEdited) {
            data.currentTask = taskToBeEdited;
        },
        updateItem(taskToBeUpdated){
            // updatedTask is needed for local storage purposes
            let updatedTask = null;
            // Assign map result array to data.tasks
            data.tasks = data.tasks.map(task => {
                if (task.id === data.currentTask.id) {
                    task = taskToBeUpdated;
                    // Assign current id because id field in form is hidden to UI
                    task.id = data.currentTask.id;
                    // Assign task to updatedTask for local storage purpose
                    updatedTask = task;
                    return task;
                } else {
                    return task;
                }
            });
            return updatedTask;
        },
        // Destructuring argument taskInfo
        addTasks({
            title,
            subTitle,
            assignedTo,
            startAt,
            endAt,
            priority,
            status,
            completedPercentage
        }) {
            // Task id no should be started from 1
            const id = data.tasks.length > 0 ? data.tasks.length + 1 : 1
            const task = {
                // When property and value name are the same, avoid naming twice
                id,
                title,
                subTitle,
                assignedTo,
                startAt,
                endAt,
                priority,
                status,
                completedPercentage
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
        // Function to assign completed task on check icon click event
        completedTask(id) {
            // Mapping data task to check if id is matched
            data.tasks = data.tasks.map(task => {
                if (task.id === id) {
                    if (task.status === 'New' || 'In Progress') {
                        task.status = 'Completed';
                    }
                    return task;
                } else {
                    return task;
                }
            });
            console.log(data.tasks);
            // data.tasks = updatedTask;

        }
    }
})()


// Function to local storage ========================================================================
const StorageConroller = (function () {

})()



// Function to connect with task data into UI DOM ============================================================
const UIController = (function () {
    // Create object for all the necessary selectors
    const selectors = {
        id: '.id',
        titleInput: '.title-input',
        displayTaskArea: '.display-task-area',
        taskBody: '#task-body',
        addTask: '.add-btn',
        updateTaskBtn: '.update-btn',
        backBtn: '.back-btn',
        subTitle: '.sub-title',
        assignedTo: '.assigned-to',
        startAt: '.start-date',
        endAt: '.end-date',
        priority: 'input[type=radio][name=priority]:checked',
        status: 'input[type=radio][name=status]:checked',
        completedPercentage: '.percentage-num'

    }

    const displayTaskArea = () => {
        document.querySelector(selectors.displayTaskArea).style.display = 'block';
    }

    const hideTaskArea = () => {
        document.querySelector(selectors.displayTaskArea).style.display = 'none';
    }

    const handleBadgeColorPriority = (priority) => {
        // const { high, medium, low } = task.priority;
        if (priority === 'High') return 'primary'
        if (priority === 'Medium') return 'success'
        if (priority === 'Low') return 'warning'
    }

    const handleStyleCompletedStatus = (status) => {
        if (status === 'Completed') {
            return true;
        }
    }

    return {
        getSelectors() {
            return selectors
        },
        showUpdateState() {
            document.querySelector(selectors.addTask).style.display = 'none';
            document.querySelector(selectors.updateTaskBtn).style.display = 'inline-block';
            document.querySelector(selectors.backBtn).style.display = 'inline-block';
        },
        clearUpdateState() {
            document.querySelector(selectors.addTask).style.display = 'inline-block';
            document.querySelector(selectors.updateTaskBtn).style.display = 'none';
            document.querySelector(selectors.backBtn).style.display = 'none';
        },
        showAlert(msg, className) {
            console.log(msg, className)
        },
        clearFields() {
            document.querySelector(selectors.titleInput).value = '';
            document.querySelector(selectors.subTitle).value = '';
            document.querySelector(selectors.assignedTo).value = '';
            document.querySelector(selectors.startAt).value = '';
            document.querySelector(selectors.endAt).value = '';
        },
        // validateForm() {

        // },
        getTaskInput() {
            return {
                id: document.querySelector(selectors.id).value,
                title: document.querySelector(selectors.titleInput).value,
                subTitle: document.querySelector(selectors.subTitle).value,
                assignedTo: document.querySelector(selectors.assignedTo).value,
                startAt: document.querySelector(selectors.startAt).value,
                endAt: document.querySelector(selectors.endAt).value,
                priority: document.querySelector(selectors.priority).value,
                status: document.querySelector(selectors.status).value,
                completedPercentage: document.querySelector(selectors.completedPercentage).value,
            }
        },
        populateForm({ title, subTitle, assignedTo, startAt, endAt, priority, status, completedPercentage }) {
            // Display Update and Back button on the form
            this.showUpdateState();
            // Populate all the fields
            document.querySelector(selectors.titleInput).value = title;
            document.querySelector(selectors.subTitle).value = subTitle;
            document.querySelector(selectors.assignedTo).value = assignedTo;
            document.querySelector(selectors.startAt).value = startAt;
            document.querySelector(selectors.endAt).value = endAt;
            document.querySelector(selectors.priority).value = priority;
            document.querySelector(selectors.status).value = status;
            document.querySelector(selectors.completedPercentage).value = completedPercentage;
        },
        populateTask({ id, title, assignedTo, endAt, priority, status, completedPercentage }) { // Destructuring parameter task
            // Display task area when new task is added
            displayTaskArea();
            let taskResult = '';
            taskResult += `
                    <tr>
                        <th scope="row">${id}</th>
                        <td >${title}</td>
                        <td><span class="badge badge-pill badge-${handleBadgeColorPriority(priority)}">${priority}</span></td>
                        <td class=${handleStyleCompletedStatus(status) ? 'completed-task' : ''}>${status}</td>
                        <td>${endAt}</td>
                        <td>${assignedTo}</td>
                        <td>
                            <div class="progress">
                            <div class="progress-bar-striped bg-success" role="progressbar" style="width: ${completedPercentage}%" aria-valuenow="${completedPercentage}" aria-valuemin="0" aria-valuemax="100"> <span class="text-black font-weight-bold">${completedPercentage}%</span> </div>
                        </div>
                        </td>
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
            // console.log(tasks);
            // Handle display task table area
            if (tasks.length > 0) {
                displayTaskArea();
            } else {
                hideTaskArea();
            }

            let tasksResult = '';
            tasks.forEach(task => {
                // Destructuring all the properties
                const { id, title, priority, status, endAt, assignedTo, completedPercentage } = task;
                tasksResult += `
                    <tr>
                        <th scope="row">${id}</th>
                        <td>${title}</td>
                        <td><span class="badge badge-pill badge-${handleBadgeColorPriority(priority)}">${priority}</span></td>
                        <td class=${handleStyleCompletedStatus(status) ? 'completed-task' : ''}>  ${status}</td>
                        <td >${endAt}</td>
                        <td>${assignedTo}</td>
                        <td>
                            <div class="progress">
                            <div class="progress-bar-striped bg-success" role="progressbar" style="width: ${completedPercentage}%" aria-valuenow="${completedPercentage}" aria-valuemin="0" aria-valuemax="100"> <span class="text-black font-weight-bold">${completedPercentage}%</span> </div>
                        </div>
                        </td>
                        <td>
                            <i class="fas fa-edit text-primary"></i>
                            <i class="fas fa-check-square text-success"></i>
                            <i class="fas fa-trash-alt text-danger"></i>
                        </td>
                    </tr>
                `
                // console.log(task)
            });
            document.querySelector(selectors.taskBody).innerHTML = tasksResult;

        }
    }
})()




// Function to combine between TaskController and UIController ================================================
const AppController = ((Task, UI, Storage) => {
    // console.log(Task.getTasks());

    // Load Event listeners
    const loadEventListeners = () => {
        const selectors = UI.getSelectors();

        // Register all the functions of click event listeners
        document.querySelector(selectors.addTask).addEventListener('click', addNewTask);
        // document.querySelector(selectors.backBtn).addEventListener('click', backDefault);
        document.querySelector(selectors.updateTaskBtn).addEventListener('click', updateTask);
        document.querySelector(selectors.displayTaskArea).addEventListener('click', editTask);
        document.querySelector(selectors.displayTaskArea).addEventListener('click', completeTask);
    }

    function addNewTask(e) {
        e.preventDefault();

        // Get all data of a task from UI from
        const taskInfo = UI.getTaskInput();
        // console.log(taskInfo);

        // Validation all the fields
        // UI.validateForm(taskInfo);

        const {
            title,
            subTitle,
            assignedTo,
            startAt,
            endAt,
            priority,
            status,
            completedPercentage
        } = taskInfo;

        // console.log((!status[0].checked));  // priority/status validation is rest

        // Validation all the fields
        if (
            title.trim() === ''
            || subTitle.trim() === ''
            || assignedTo.trim() === ''
            || startAt === ''
            || endAt === ''
            || priority === ''
            || status === ''
            || completedPercentage === ''
        ) {
            UI.showAlert('Oops... Some fields must not be empty. Please try again!', 'warning');
            // } else if (!(priority[0].checked) && !(priority[1].checked) && !(priority[2].checked)) {
            //     UI.showAlert('One priority must be checked', 'warning');
            // } else if (!(status[0].checked) && !(status[1].checked) && !(status[2].checked)) {
            //     UI.showAlert('One status must be checked', 'warning');
        } else {
            // Update to data center
            const task = Task.addTasks(taskInfo);
            console.log(task);

            // Clear Field after submitting
            UI.clearFields();

            // Update task to UI section
            UI.populateTask(task)
        }
    }

    function completeTask(e) {
        if (e.target.classList.contains('fa-check-square')) {
            // console.log(e.target.parentElement.parentElement.children[0].innerText);
            const targetId = Number(e.target.parentElement.parentElement.children[0].innerText);
            // Update status property to data center
            Task.completedTask(targetId);
            // Getting updated tasks from Task controller
            const tasks = Task.getTasks()
            // Update status to UI
            UI.populateAllTask(tasks);
        }
    }

    function editTask(e) {
        if (e.target.classList.contains('fa-edit')) {
            // Getting targeted ID
            const targetId = Number(e.target.parentElement.parentElement.children[0].innerText);
            // Getting targeted task by Id
            const taskToBeUpdated = Task.getTaskById(targetId);
            // Update state to data center
            Task.setCurrentTask(taskToBeUpdated);
            // Display task to UI from
            UI.populateForm(taskToBeUpdated);
        }
    }

    function updateTask(e) {
        e.preventDefault();
        // Getting current input value
        const inputValueToUpdate = UI.getTaskInput();
        // Updating value to data center
        const updatedTask = Task.updateItem(inputValueToUpdate);
        // console.log(updatedTask);
        // Clear Fields
        UI.clearFields();
        // Remove Update and Back button
        UI.clearUpdateState();
        // Getting tasks
        const tasks = Task.getTasks();
        console.log(tasks)
        // Update UI
        UI.populateAllTask(tasks);

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
            UI.clearUpdateState();

            // Call event listeners
            loadEventListeners();
        }
    }


})(TaskController, UIController, StorageConroller)
// Arguments pass for better way because update/change make easier in future

// App entry point
AppController.init();