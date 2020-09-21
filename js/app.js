// import { StorageConroller } from './Storage';
// import { TaskController } from './Task';
// import { UIController } from './UI';

// Function to combine between TaskController and UIController ================================================
const AppController = ((Task, UI, Storage) => {

    // Load Event listeners
    const loadEventListeners = () => {
        const selectors = UI.getSelectors();

        // Register all the functions of click event listeners
        document.querySelector(selectors.percentageRange).addEventListener('input', rangeWithAmount);
        document.querySelector(selectors.addTask).addEventListener('click', addNewTask);
        document.querySelector(selectors.updateTaskBtn).addEventListener('click', updateTask);
        document.querySelector(selectors.backBtn).addEventListener('click', backDefault);
        document.querySelector(selectors.displayTaskArea).addEventListener('click', editTask);
        document.querySelector(selectors.displayTaskArea).addEventListener('click', completeTask);
        document.querySelector(selectors.displayTaskArea).addEventListener('click', deleteTask);
    }

    function rangeWithAmount(e) {
        const value = e.target.value;
        document.querySelector('.percentage-range').value = value;
        document.querySelector('.percentage-num').value = value;
    }

    function addNewTask(e) {
        e.preventDefault();

        // Get all data of a task from UI from
        const taskInfo = UI.getTaskInput();

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

        // Validation all the fields
        if (
            title.trim() === ''
            || subTitle.trim() === ''
            || assignedTo.trim() === ''
            || startAt === ''
            || endAt === ''
            || priority === false
            || status === false
            // || completedPercentage === ''
        ) {
            UI.showAlert('Oops... Some fields are empty. Please try again!', 'warning');
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
        console.log(updatedTask)
        // Update to localStorage
        Storage.updateTask(updatedTask);
        // Clear Fields
        UI.clearFields();
        // Remove Update and Back button
        UI.showDefaultWithBackBtn();
        // Getting tasks
        const tasks = Task.getTasks();
        console.log(tasks)
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