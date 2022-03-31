/**
 * @jest-environment jsdom
 */

import addTask from '../src/index.js'

test('Add one new item to the list', () => {
    document.body.innerHTML = '<ul>' + '  <li class="task"></li>' + '</ul>';
    addTask();
    const list = document.querySelectorAll('.task');
    expect(list).toHaveLength(1);
});