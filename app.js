// Function to control task data
const TaskController = (function() {
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
        getTasks(){
            return data.tasks;
        }
    }
})()