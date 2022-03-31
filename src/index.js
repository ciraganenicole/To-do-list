import './style.css';
import Tasks from '../modules/TasksList.js';
// import { moduleExpression } from '@babel/types';

const taskList = new Tasks();
taskList.initialize();

const addTask = () => {
    const input = document.getElementById('add');
    //input.value = '';
    if (input) input.onchange = ((e) => {
        e.preventDefault();
        const description = e.target.value;
        taskList.newTask(description);
        e.target.value = '';
    });
};
addTask();

export default addTask;