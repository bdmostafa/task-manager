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
        percentageNum: '.percentage-num',
        total: '.total',
        new: '.new',
        inProgress: '.in-progress',
        completed: '.completed',
        alert: '.alert'
    }

    const isChecked = (inputName) => {
        const arrField = document.getElementsByName(inputName)
        for (let field of arrField) {
            if (field.checked) return field.value;
        }
        return false;
    }

    const populateRadioBtn = (inputName) => {
        switch (inputName) {
            // Check status input
            case 'Low':
                document.querySelector('#low').checked = true;
                break;
            case 'Medium':
                document.querySelector('#medium').checked = true;
                break;
            case 'High':
                document.querySelector('#high').checked = true;
                break;
            // Check priority input
            case 'New':
                document.querySelector('#new').checked = true;
                break;
            case 'In Progress':
                document.querySelector('#in-progress').checked = true;
                break;
            case 'Completed':
                document.querySelector('#completed').checked = true;
                break;
        }
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

    const handleCompletedPercentage = (status) => {
        let val = document.querySelector(selectors.percentageNum).value
        if (isChecked(status) === 'Completed') {
            return val = 100;
        }
        return val;
    }

    const styleProgressBar = (completedPercentage) => {
        if (completedPercentage >= 75) return 'success';
        else if (completedPercentage >= 50) return 'info';
        else if (completedPercentage >= 25) return 'warning'
        return 'danger';
    }

    const taskOutputTemplate = ({ id, title, assignedTo, endAt, priority, status, completedPercentage }) => {
        return `
            <tr>
                <th scope="row">${id}</th>
                <td>${title}</td>
                <td><span class="badge badge-pill badge-${handleBadgeColorPriority(priority)}">${priority}</span></td>
                <td class=${handleStyleCompletedStatus(status)
                    ? 'completed-task'
                    : ''
                }>${status}</td>
                <td>${endAt}</td>
                <td>${assignedTo}</td>
                <td>
                    <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-${styleProgressBar(completedPercentage)}" role="progressbar" style="width: ${completedPercentage}%" aria-valuenow="${completedPercentage}" aria-valuemin="0" aria-valuemax="100"> <span class="text-black font-weight-bold">${completedPercentage}%</span> </div>
                </div>
                </td>
                <td>
                    <i class="fas fa-edit text-primary"></i>
                    <i class="fas fa-check-square text-success"></i>
                    <i class="fas fa-trash-alt text-danger"></i>
                </td>
            </tr>
        `
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
            document.querySelector(selectors.percentageNum).value = 10;
            document.querySelector(selectors.percentageRange).value = 10;
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
                completedPercentage: handleCompletedPercentage('status')
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
            document.querySelector(selectors.percentageNum).value = completedPercentage;
            document.querySelector(selectors.percentageRange).value = completedPercentage;
        },
        populateTask({ id, title, assignedTo, endAt, priority, status, completedPercentage }) {
            // Display task area when new task is added
            displayTaskArea();
            let taskResult = '';
            // Generate HTML tamplate
            taskResult += taskOutputTemplate({ id, title, assignedTo, endAt, priority, status, completedPercentage });
                // Insert taskResult after all the elements before end of the target div (taskBody)
                document.querySelector(selectors.taskBody).insertAdjacentHTML("beforeend", taskResult);
        },
        populateAllTask(tasks) {
            // Handle display task table area
            if (tasks.length > 0) displayTaskArea();
            else hideTaskArea();

            let tasksResult = '';
            tasks.forEach(task => {
                // Destructuring all the properties
                const { id, title, priority, status, endAt, assignedTo, completedPercentage } = task;
                // Generate HTML tamplate
                tasksResult += taskOutputTemplate({ id, title, assignedTo, endAt, priority, status, completedPercentage });
            });
            document.querySelector(selectors.taskBody).innerHTML = tasksResult;

        }
    }
})()