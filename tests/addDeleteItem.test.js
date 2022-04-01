/**
 * @jest-environment jsdom
 */
import Tasks from '../modules/TasksList.js';

const tasks = new Tasks();

describe('addTask', () => {
  test('Add a new item to the list', () => {
    document.body.innerHTML = `<ul id="tasks">
            </ul>`;
    tasks.addItem('add a removeItem function');
    tasks.addItem('add an addItem function');
    const list = document.querySelectorAll('#tasks li');
    expect(list).toHaveLength(2);
  });

  test('verify local storage after invoking addItem function ', () => {
    const storage = JSON.parse(localStorage.getItem('taskData'));
    expect(storage.length).toBe(2);
  });

  test('remove an item from the list', () => {
    const storage = JSON.parse(localStorage.getItem('taskData'));
    document.body.innerHTML = '<ul id="tasks"></ul>';
    const container = document.getElementById('tasks');
    storage.forEach((task) => {
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
    });
    tasks.removeItem(1);
    const list = document.querySelectorAll('#tasks li');
    expect(list).toHaveLength(1);
  });

  test('verify local storage after invoking removeItem function ', () => {
    const storage = JSON.parse(localStorage.getItem('taskData'));
    expect(storage.length).toBe(1);
  });
});