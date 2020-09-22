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
        percentageRange: '.percentage-range',
        completedPercentage: '.percentage-num',
        total: '.total',
        new: '.new',
        inProgress: '.in-progress',
        completed: '.completed',
        alert: '.alert'
    }

    const byId = {
        high: 'high',
        medium: 'medium',
        low: 'low',
        new: 'new',
        inProgress: 'in-progress',
        completed: 'completed'
    }

    const isChecked = (inputName) => {
        const arrField = document.getElementsByName(inputName)
        for (let field of arrField) {
            if (field.checked) return field.value;
        }
        return false;
    }

    // const priorityChecked = () => {
    //     const priority = document.getElementsByName('priority')
    //     for (let i of priority) {
    //         if (i.checked) return i.value;
    //     }
    //     return false;

    //     // https://stackoverflow.com/questions/37527213/loop-radio-button-form-javascript

    //     // const low = document.getElementById(byId.low)
    //     // const medium = document.getElementById(byId.medium)
    //     // const high = document.getElementById(byId.high)

    //     // if (low.checked) return low.value
    //     // if (high.checked) return high.value
    //     // if (medium.checked) return medium.value
    //     // return false;
    // }

    // const statusChecked = () => {
    //     const priority = document.getElementsByName('priority')
    //     const newTask = document.getElementById(byId.new)
    //     const inProgress = document.getElementById(byId.inProgress)
    //     const completed = document.getElementById(byId.completed)

    //     if (newTask.checked) return newTask.value
    //     if (inProgress.checked) return inProgress.value
    //     if (completed.checked) return completed.value
    //     return false;
    // }

    const populateRadioBtn = (inputName) => {
        if (inputName === 'Low') return document.getElementById(byId.low).checked = true;
        if (inputName === 'Medium') return document.getElementById(byId.medium).checked = true;
        if (inputName === 'High') return document.getElementById(byId.high).checked = true;
        if (inputName === 'New') return document.getElementById(byId.new).checked = true;
        if (inputName === 'In Progress') return document.getElementById(byId.inProgress).checked = true;
        if (inputName === 'Completed') return document.getElementById(byId.completed).checked = true;
    }

    // const populateStatusField = (status) => {
    //     if (status === 'New') return document.getElementById(byId.new).checked = true;
    //     if (status === 'In Progress') return document.getElementById(byId.inProgress).checked = true;
    //     if (status === 'Completed') return document.getElementById(byId.completed).checked = true;
    // }

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

    const handleCompletedPercentage = () => {
        let val = document.querySelector(selectors.completedPercentage).value
        if (isChecked() === 'Completed') {
            return val = 100;
        }
        return val;
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
            const div = document.createElement('div');
            div.textContent = msg;
            div.className = `font-weight-bold alert alert-${className}`;
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
            document.getElementsByName('priority').forEach(i => i.checked = false);
            document.getElementsByName('status').forEach(i => i.checked = false);
        },
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
                priority: isChecked('priority'),
                status: isChecked('status'),
                completedPercentage: handleCompletedPercentage()
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
            // Populate checked value from priority and status input radio field
            populateRadioBtn(priority);
            populateRadioBtn(status);
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
                // Match completed status with percentage column
                const handleCompletedPercentage = () => {
                    return status === 'Completed' ? 100 : completedPercentage;
                }

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
                            <div class="progress-bar-striped bg-success" role="progressbar" style="width: ${handleCompletedPercentage()}%" aria-valuenow="${handleCompletedPercentage()}" aria-valuemin="0" aria-valuemax="100"> <span class="text-black font-weight-bold">${handleCompletedPercentage()}%</span> </div>
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