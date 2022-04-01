/**
 * @jest-environment jsdom
 */

import Tasks from '../modules/TasksList.js';

const tasks = new Tasks();
const task = tasks.newTask('add a remove function', false);

describe('Test the Update, Checkbox, and Clear all features', () => {
  test('Add a items to the list', () => {
    document.body.innerHTML = `<ul id="tasks">
                </ul>`;
    tasks.addItem('add an addItem function');
    const list = document.querySelectorAll('#tasks li');
    expect(list).toHaveLength(1);
  });

  test('check the local storage after invoking addItem function ', () => {
    const storage = JSON.parse(localStorage.getItem('taskData'));
    expect(storage.length).toBe(2);
  });

  test('Updating an item status ', () => {
    expect(tasks.setupComplete()).toBe(task.checked);
  });

  test('edit function', () => {
    const storage = JSON.parse(localStorage.getItem('taskData'));
    document.body.innerHTML = '<ul id="tasks"></ul>';
    storage.forEach((task) => {
      const container = document.getElementById('tasks');
      container.innerHTML += `
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
         </li>`;
    });
    tasks.editTask(1, 'add an edit function');
    expect(tasks.tasks[0].description).toBe('add an edit function');
  });

  test('verify the localStorage is updated ', () => {
    const storage = JSON.parse(localStorage.getItem('taskData'));
    expect(storage[0].description).toBe('add an edit function');
  });

  test('test auto complteted', () => {
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
    tasks.clearAllCompleted(2);
    const list = document.querySelectorAll('#tasks li');
    expect(list).toHaveLength(1);
  });

  test('check the localStorage after call clearAllCompleted function ', () => {
    const storage = JSON.parse(localStorage.getItem('taskData'));
    expect(storage.length).toBe(1);
    expect(storage[0].completed).toBe(false);
  });
});