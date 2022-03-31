/**
 * @jest-environment jsdom
 */

import Tasks from '../modules/TasksList.js';
import { describe } from 'jest-circus';

const tasks = new Tasks();
const task = tasks.newTask('add a remove function', false);

describe('Test the Update, Checkbox, and Clear all features', () => {
    test('description value from add Task', () => {
        expect(tasks.setupComplete()).toBe(task.checked);
    });
})