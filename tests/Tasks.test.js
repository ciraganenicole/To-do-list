const addTask = require('../src/index.js');
//jest.mock('./index.js');
test('Add one new item to the list', () => {
    document.body.innerHTML =
        '<ul>' +
        '  <li class="task"></li>' +
        '</ul>';
    addTask();
    const list = document.querySelectorAll('.task');
    expect(list).toHaveLength(1);
});