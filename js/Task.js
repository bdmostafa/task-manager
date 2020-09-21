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
            // console.log(data.tasks)
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

            // When status value is completed, completedPercentage value will be 100 by default
            // if(status === 'Completed') {
            //     task.completedPercentage = 100
            // }
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