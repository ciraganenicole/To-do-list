/**
 * @jest-environment jsdom
 */

import Tasks from '../modules/TasksList.js';

const tasks = new Tasks();
const task = tasks.newTask('add a remove function', false);

describe('Test the Update, Checkbox, and Clear all features', () => {
  test('checkbox', () => {
    expect(tasks.setupComplete()).toBe(task.checked);
  });

  test('edit function', () => {
    tasks.tasks.push(task);
    tasks.editTask(0, 'add an edit function');
    expect(tasks.tasks[0].description).toBe('add an edit function');
  });
});