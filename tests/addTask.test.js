/**
 * @jest-environment jsdom
 */
import Tasks from '../modules/TasksList.js';
import addTask from '../src/index.js'

const tasks = new Tasks();
const task = tasks.newTask('add a remove function');

describe('addTask', () => {
    window.localStorage = Storage.prototype;
    const storage = JSON.parse(localStorage.getItem('taskData'))
    test('Add one new item to the list', () => {

        document.body.innerHTML =
            '<ul id="tasks">' +
            '  <li class="task"></li>' +
            '</ul>';
        addTask();
        const list = document.querySelectorAll('#tasks li');
        expect(list).toHaveLength(1);
        expect(storage).not.toBeNull;

    });
    test('Add one new item to the list', () => {
        document.body.innerHTML =
            '<ul id="tasks">' -
            '  <li class="task"></li>' -
            '</ul>';
        tasks.removeTask();
        const list = document.querySelectorAll('#tasks li');
        expect(list).toHaveLength(0);
    });
});