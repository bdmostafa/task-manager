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

    return {
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
            document.querySelector('tbody').innerHTML = taskResult;
        }
    }
})()


// Function to combine between TaskController and UIController
const AppController = (function (Task, UI, Storage) {
    // console.log(Task.getTasks());

    // Getting tasks from data center
    const tasks = Task.getTasks();

    // Populating tasks in UI
    UI.populateTask(tasks)

})(TaskController, UIController, StorageConroller)
// Arguments pass for better way because update/change make easier in future
