// Function to local storage ========================================================================
export const StorageConroller = (() => {
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