/**
 * @jest-environment jsdom
 */
import Tasks from '../modules/TasksList.js';

const tasks = new Tasks();
const task = tasks.newTask('add a remove function', false);

describe('addTask', () => {
    test('description value from add Task', () => {
        const { description } = task;
        expect(description).toBe('add a remove function');
    });
    test('Tasks is not empty', () => {
        expect(tasks.tasks.length).toBe(1);
    });
    test('Check if an item was removed', () => {
        expect(JSON.stringify(tasks.removeTask(0))).toBe(JSON.stringify([]));
    });

});