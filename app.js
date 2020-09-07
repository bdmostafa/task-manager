// Function to control task data
const TaskController = (function () {
    const data = {
        tasks: [
            {
                id: 0,
                title: 'task1',
                completed: false
            },
            {
                id: 0,
                title: 'task1',
                completed: false
            }
        ]
    };

    return {
        getTasks() {
            return data.tasks;
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
        titleInput: '.title-input',
        taskBody: '#task-body',
        addTask: '.add-btn',
        updateTask: '.update-btn',
        backBtn: '.back-btn'
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
        clearField() {

        },
        populateTask(tasks) {
            // console.log(tasks);
            let taskResult = '';
            tasks.forEach(task => {
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
                            <a href="#" class="badge badge-info">Update</a>
                            <a href="#" class="badge badge-danger">Delete</a>
                        </td>
                    </tr>
                `
            });
            document.querySelector(selectors.taskBody).innerHTML = taskResult;
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
    }
    function addNewTask(e) {
        e.preventDefault();
        const titleTask = UI.getTitleTask();
        // console.log(titleTask);

        if (titleTask.trim() === '') {
            UI.showAlert('Oops... Title must not be an empty. Please try again!', 'warning');
        } else {
            // Update to data center

            // Update to UI
        }
    }

    return {
        init() {
            // Getting tasks from data center
            const tasks = Task.getTasks();

            // Populating tasks in UI
            UI.populateTask(tasks)

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