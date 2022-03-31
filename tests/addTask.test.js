/**
 * @jest-environment jsdom
 */
import Tasks from '../modules/TasksList.js';

describe('addTask', () => {
  test('description value from add Task', () => {
    const tasks = new Tasks();
    const task = tasks.newTask('add a remove function', false);
    const { description } = task;
    expect(description).toBe('add a remove function');
  });
});