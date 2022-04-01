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

  assignTasks(tasks = this.tasks) {
    const newTasks = [];
    tasks.forEach((t, index) => {
      newTasks.push(new Task(t.description, t.completed, index + 1, t.editable));
    });
    this.tasks = newTasks;
    localStorage.setItem('taskData', JSON.stringify(this.tasks.map((t, index) => ({ ...t, index }))));
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
    return this.hamburger;
  }

  removeItem(index) {
    this.tasks = JSON.parse(localStorage.getItem('taskData'));
    const newTasks = this.tasks.filter((t) => t.index !== index + 1);
    localStorage.setItem('taskData', JSON.stringify(newTasks));
    const storage = JSON.parse(localStorage.getItem('taskData'));
    document.body.innerHTML = '<ul id="tasks"></ul>';
    storage.forEach((task) => {
      document.body.innerHTML += `<ul id="tasks">
        <li class="task">
        <div class="description">
        <input type="checkbox" class="check"  id="checkbox-${task.index - 1}" ${task.completed ? 'checked' : ''}/>
        ${!task.editable ? `<p class="text">${task.description}</p>` : ''}
        ${task.editable ? `<input value='${task.description}' id="input-${task.index - 1}"/>` : ''}</div>
       <div id="myLinks-${task.index - 1}" style="display:none" class="list" >
       <a href="#" class='del' id="del-${task.index - 1}">Delete</a>
       <a href="#" class='edit'>Edit</a>
       </div>
       <button class="remove" id="remove-${task.index - 1}"><i class="fa-solid fa-ellipsis-vertical ellips"></i></button>
       </li>
    </ul>`;
    });
  }

  removeTask(index) {
    const newTasks = this.tasks.filter((t) => t.index !== index + 1);
    return newTasks;
  }

  editTask(index, description) {
    this.tasks[index].description = description;
    this.tasks[index].editable = false;
  }

  setupRemove() {
    this.hamburger();
    const del = document.querySelectorAll('.del');
    del.forEach((button) => {
      const removeFunc = () => {
        const index = parseInt(button.id.replace('del-', ''), 10);
        this.removeTask(index);
        this.assignTasks();
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
          this.editTask(index, e.target.value);
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

  addItem(description) {
    const task = new Task(description, false, this.tasks.length + 1);
    this.tasks.push(task);
    localStorage.setItem('taskData', JSON.stringify(this.tasks));
    const container = document.getElementById('tasks');
    container.innerHTML += `<li class="task">
    <div class="description">
    <input type="checkbox" class="check"  id="checkbox-${task.index - 1}" ${task.completed ? 'checked' : ''}/>
    ${!task.editable ? `<p class="text">${task.description}</p>` : ''}
    ${task.editable ? `<input value='${task.description}' id="input-${task.index - 1}"/>` : ''}</div>
   <div id="myLinks-${task.index - 1}" style="display:none" class="list" >
   <a href="#" class='del' id="del-${task.index - 1}">Delete</a>
   <a href="#" class='edit'>Edit</a>
   </div>
   <button class="remove" id="remove-${task.index - 1}"><i class="fa-solid fa-ellipsis-vertical ellips"></i></button>
   </li>`;
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

  setupClearAll() {
    const clear = document.getElementById('clear');
    if (clear) {
      clear.addEventListener('click', () => {
        this.assignTasks(this.tasks.filter((task) => !task.completed));
      });
    }
  }
}

export default Tasks;