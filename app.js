// Function to local storage ========================================================================
const StorageConroller = (function () {
    return {
        addTask(task) {
            let tasks;
            if (localStorage.getItem('tasks') === null) {
                tasks = [];
                tasks.push(task)
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
                tasks.push(task)
            }
            localStorage.setItem('tasks', JSON.stringify(tasks))
        },
        getTasks() {
            let tasks;
            if (localStorage.getItem('tasks') === null) {
                tasks = [];
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'));
            }
            return tasks;
        },
        updateTask(updatedTask) {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.forEach((task, idx) => {
                if (task.id === updatedTask.id) {
                    // Remove selected indexed task
                    // Add/Replace updatedTask on that indexed position
                    tasks.splice(idx, 1, updatedTask)
                }
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            // Another way using map
            // const updateTask = tasks.map(task => {
            //     if (task.id === updatedTask.id) {
            //         task = updatedTask;
            //         return task;
            //     }
            //     return task;
            // })
            // localStorage.setItem('tasks', JSON.stringify(updateTask));
        },
        deleteTask(taskToBeDeleted) {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            // Filter tasks that are not to be deleted
            const filteredTask = tasks.filter(task => task.id !== taskToBeDeleted.id);
            localStorage.setItem('tasks', JSON.stringify(filteredTask));
        }
    }
})()

// Function to control task data
const TaskController = (function (Storage) {
    let data = {
        tasks: Storage.getTasks(),
        // [
        //     {
        //         id: 1,
        //         title: 'task1',
        //         subTitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, harum',
        //         assignedTo: 'Mostafa',
        //         startAt: new Date().toISOString().slice(0, 10),
        //         endAt: new Date().toISOString().slice(0, 10),
        //         priority: 'High',
        //         status: 'In Progress',
        //         completedPercentage: 50
        //     },
        //     {
        //         id: 2,
        //         title: 'task2',
        //         subTitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, harum',
        //         assignedTo: 'Mostafa',
        //         startAt: new Date().toISOString().slice(0, 10),
        //         endAt: new Date().toISOString().slice(0, 10),
        //         priority: 'Low',
        //         status: 'New',
        //         completedPercentage: 50
        //     },
        //     {
        //         id: 3,
        //         title: 'task3',
        //         subTitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, harum',
        //         assignedTo: 'Mahumud',
        //         startAt: new Date().toISOString().slice(0, 10),
        //         endAt: new Date().toISOString().slice(0, 10),
        //         priority: 'Medium',
        //         status: 'Completed',
        //         completedPercentage: 90
        //     }
        // ],

        // currentTask is for edit/update task usages
        currentTask: null
    };

    return {
        getData() {
            return data;
        },
        getTasks() {
            return data.tasks;
        },
        getTaskById(id) {
            return data.tasks.find(task => task.id === id)
        },
        setCurrentTask(taskToBeEdited) {
            // Assign target event task to currentTask property of data object
            data.currentTask = taskToBeEdited;
        },
        getCurrentTask() {
            return data.currentTask;
        },
        getTotalTaskCount() {
            return data.tasks.length;
        },
        getStatusCount() {
            let newCount = 0;
            let progressCount = 0;
            let completedCount = 0;
            data.tasks.map(task => {
                if (task.status === 'New') {
                    newCount += 1;
                } else if (task.status === 'In Progress') {
                    progressCount += 1;
                } else if (task.status === 'Completed') {
                    completedCount += 1;
                }
            })
            const allCounts = [newCount, progressCount, completedCount];
            return [...allCounts];
        },
        updateItem(taskToBeUpdated) {
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
        deleteTask(targetedTask) {
            data.tasks = data.tasks.filter(task => task.id !== targetedTask.id);
            console.log(data.tasks)
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
            // Task id no should be started from 1 if tasks length is zero
            // Another new task id will be plus 1 following last task id
            const id = 
                data.tasks.length > 0 
                ? data.tasks[data.tasks.length - 1].id + 1 
                : 1

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
                        task.completedPercentage = 100;
                    }
                    return task;
                } else {
                    return task;
                }
            });
        }
    }
})(StorageConroller)

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
        completedPercentage: '.percentage-num',
        total: '.total',
        new: '.new',
        inProgress: '.in-progress',
        completed: '.completed',
        alert: '.alert'
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
        showDefaultWithBackBtn() {
            document.querySelector(selectors.addTask).style.display = 'inline-block';
            document.querySelector(selectors.updateTaskBtn).style.display = 'none';
            document.querySelector(selectors.backBtn).style.display = 'none';
        },
        showAlert(msg, className) {
            console.log(msg, className)
            const div = document.createElement('div');
            div.textContent = msg;
            div.className = `alert alert-${className}`;
            document
                .querySelector(selectors.displayTaskArea)
                .insertAdjacentElement('beforebegin', div)
            // After 3 seconds, alert is removed
            if (document.querySelector(selectors.alert)) {
                this.clearAlert();
            }
        },
        clearAlert() {
            setTimeout(() => {
                document.querySelector(selectors.alert).remove()
            }, 3000)
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
        showTotalTaskCount(tasksCount) {
            document.querySelector(selectors.total).textContent = tasksCount;
        },
        showStatusCount([newCount, inProgress, completed]) {
            document.querySelector(selectors.new).textContent = newCount;
            document.querySelector(selectors.inProgress).textContent = inProgress;
            document.querySelector(selectors.completed).textContent = completed;
        },
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
        document.querySelector(selectors.updateTaskBtn).addEventListener('click', updateTask);
        document.querySelector(selectors.backBtn).addEventListener('click', backDefault);
        document.querySelector(selectors.displayTaskArea).addEventListener('click', editTask);
        document.querySelector(selectors.displayTaskArea).addEventListener('click', completeTask);
        document.querySelector(selectors.displayTaskArea).addEventListener('click', deleteTask);
    }

    function addNewTask(e) {
        e.preventDefault();

        // Get all data of a task from UI from
        const taskInfo = UI.getTaskInput();
        // console.log(taskInfo);

        // Validation all the fields
        // UI.validateForm(taskInfo);

        // Destructuring taskInfo properties
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

            // Update to Local Storage
            Storage.addTask(task);

            // Clear Field after submitting
            UI.clearFields();

            // Task count function calling
            handleTaskCount();

            // Update task to UI section
            UI.populateTask(task)
        }
    }

    function backDefault(e) {
        e.preventDefault();
        // Clear form fields
        UI.clearFields();
        // Show blank state
        UI.showDefaultWithBackBtn();
    }
    function editTask(e) {
        if (e.target.classList.contains('fa-edit')) {
            // Getting targeted ID
            const targetId = Number(e.target.parentElement.parentElement.children[0].innerText);
            // Getting targeted task by Id
            const taskToBeUpdated = Task.getTaskById(targetId);
            // Update state to data center
            Task.setCurrentTask(taskToBeUpdated);
            // Display task info to UI from
            UI.populateForm(taskToBeUpdated);
            // Task count function calling
            handleTaskCount();
        }
    }

    function updateTask(e) {
        e.preventDefault();
        // Getting current input value
        const inputValueToUpdate = UI.getTaskInput();
        // Updating value to data center
        const updatedTask = Task.updateItem(inputValueToUpdate);
        // Update to localStorage
        Storage.updateTask(updatedTask);
        // Clear Fields
        UI.clearFields();
        // Remove Update and Back button
        UI.showDefaultWithBackBtn();
        // Getting tasks
        const tasks = Task.getTasks();
        // Update UI
        UI.populateAllTask(tasks);
        // Task count function calling
        handleTaskCount();

    }

    function completeTask(e) {
        if (e.target.classList.contains('fa-check-square')) {
            // console.log(e.target.parentElement.parentElement.children[0].innerText);
            const targetId = Number(e.target.parentElement.parentElement.children[0].innerText);
            // Update status property to data center
            Task.completedTask(targetId);
            // Get task by Id
            const targatedTask = Task.getTaskById(targetId)
            // Update completed status to local storage
            Storage.updateTask(targatedTask);
            // Getting updated tasks from Task controller
            const tasks = Task.getTasks()
            // Update status to UI
            UI.populateAllTask(tasks);

            // Task count function calling
            handleTaskCount();
        }
    }

    function deleteTask(e) {
        if (e.target.classList.contains('fa-trash-alt')) {
            // Getting targeted ID
            const targetId = Number(e.target.parentElement.parentElement.children[0].innerText);
            // Getting targeted task by Id
            const taskToBeDeleted = Task.getTaskById(targetId);
            // Update task / remove task from data center
            Task.deleteTask(taskToBeDeleted);
            // Delete from local storage
            Storage.deleteTask(taskToBeDeleted)
            // Getting tasks
            const tasks = Task.getTasks();
            // Update UI
            UI.populateAllTask(tasks);

            // Task count function calling
            handleTaskCount();
        }
    }

    function handleTaskCount() {
        // Gettting total task count and pass to UI section
        const totalTask = Task.getTotalTaskCount();
        UI.showTotalTaskCount(totalTask);

        const statusCount = Task.getStatusCount();
        UI.showStatusCount(statusCount);

    }

    return {
        init() {
            // Getting tasks from data center
            const tasks = Task.getTasks();

            // Task count function calling
            handleTaskCount();

            // Populating tasks in UI
            UI.populateAllTask(tasks)

            // Show edit state
            UI.showUpdateState();

            // Show back state
            UI.showDefaultWithBackBtn();

            // Call event listeners
            loadEventListeners();
        }
    }
})(TaskController, UIController, StorageConroller)
// Arguments pass for better way because update/change make easier in future

// App entry point
AppController.init();