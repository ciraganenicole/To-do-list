import './style.css';

class Tasks {
  constructor() {
    this.tasks = [
      { description: 'Pray', completed: false, index: 0 },
      { description: 'Study', completed: false, index: 1 },
    ];
  }

    generate = () => {
      const dell = this.tasks.map((task) => {
        const htmlText = ` <li class="task">
               <div> <button type="button"><i class="fa-regular fa-square" ${task.completed} ></i></button>
                <p class="text">${task.description}</p></div>
                <a href=""><i class="fa-solid fa-ellipsis-vertical" ${task.index += 1}></i></a>
                </li>`;
        return htmlText;
      }).join(' ');
      const container = document.getElementById('tasks');
      container.innerHTML = dell;
    }

    newTask = (value) => {
      this.tasks.push({ description: value, completed: false, index: 0 });
      this.generate();
    }
}

const taskList = new Tasks();
taskList.generate();

const addTask = () => {
  const input = document.getElementById('add');
  input.addEventListener('change', (e) => {
    e.preventDefault();
    taskList.newTask(input.value);
    input.value = '';
  });
};

addTask();