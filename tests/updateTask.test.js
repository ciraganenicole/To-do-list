/**
 * @jest-environment jsdom
 */

import Task from "../modules/Tasks";
import Tasks from "../modules/TasksList.js";

test('edit function', () => {
  const tasks = new Tasks();
  const task = new Task('add new functions', false, 1, false);
  tasks.tasks.push(task);
  tasks.editTask(0, 'add an edit function');
  expect(tasks.tasks[0].description).toBe('add an edit function');
});