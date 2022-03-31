import Task from './Tasks.js';

class Tasks {
    constructor() {
        this.tasks = [];
    }

    initialize() {
        const stored = localStorage.getItem('taskData');
        if (stored) {
            this.tasks = JSON.parse(stored)
                .map((task, index) => new Task(task.description, task.completed, index + 1));
            this.setHtml();
        }
        this.setup();
    }

    setup() {
        this.setupRemove();
        this.setupComplete();
        this.setupClearAll();
    }

    setupClearAll() {
        document.getElementById('clear').addEventListener('click', () => {
            this.assignTasks(this.tasks.filter((task) => !task.completed));
        });
    }

    assignTasks(tasks = this.tasks) {
        const newTasks = [];
        tasks.forEach((t, index) => {
            newTasks.push(new Task(t.description, t.completed, index + 1, t.editable));
        });
        this.tasks = newTasks;
        localStorage.setItem('taskData', JSON.stringify(this.tasks.map((t, index) => ({...t, index }))));
        this.setHtml();
        this.setup();
    }
    hamburger() {
        const remove = document.querySelectorAll('.remove');
        remove.forEach((rmBtn) => {
            const hamb = document.getElementById(rmBtn.id.replace('remove', 'myLinks'));
            rmBtn.addEventListener('click', () => {
                rmBtn.style.display = 'none';
                hamb.style.display = 'flex';
            });
        });
    }

    removeTask(index) {
        const newTasks = this.tasks.filter((t) => t.index !== index + 1);
        return newTasks;
    }


    setupRemove() {
        this.hamburger();
        const del = document.querySelectorAll('.del');
        del.forEach((button) => {
            const removeFunc = () => {
                const index = parseInt(button.id.replace('del-', ''), 10);
                this.removeTask(index);
                this.assignTasks(newTasks);
            };
            button.onclick = removeFunc;
        });

        const edit = document.querySelectorAll('.edit');
        edit.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.tasks[index].editable = true;
                this.assignTasks();
                const input = document.getElementById(`input-${index}`);
                input.addEventListener('change', (e) => {
                    e.preventDefault();
                    this.tasks[index].description = e.target.value;
                    this.tasks[index].editable = false;
                    this.assignTasks();
                });
            });
        });
    }

    setupComplete() {
        const checkboxList = document.querySelectorAll('.check');
        checkboxList.forEach((checkbox) => {
            checkbox.addEventListener('click', () => {
                this.tasks[parseInt(checkbox.id.replace('checkbox-', ''), 10)].completed = checkbox.checked;
                this.assignTasks();
            });
        });
    }

    newTask(description, completed) {
        const task = new Task(description, completed, this.tasks.length + 1);
        this.tasks.push(task);
        return task;
    }

    displayTask(description, completed) {
        this.newTask(description, completed);
        this.assignTasks();
    }

    getBookList() {
        let containerHtml = '';
        this.tasks.forEach((task) => {
            containerHtml += task.getHtml();
        });
        return containerHtml;
    }

    setHtml() {
        const container = document.getElementById('tasks');
        container.innerHTML = this.getBookList();
        this.setupRemove();
    }
}

export default Tasks;