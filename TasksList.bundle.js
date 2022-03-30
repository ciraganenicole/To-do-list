/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/Tasks.js":
/*!**************************!*\
  !*** ./modules/Tasks.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Task {
  constructor(description, completed, index, editable) {
    this.description = description;
    this.completed = completed || false;
    this.index = index;
    this.editable = editable || false;
  }

  getHtml() {
    return ` <li class="task" draggable="true">
           <div class="description">
        <input type="checkbox" class="check"  id="checkbox-${this.index - 1}" ${this.completed ? 'checked' : ''}/>
        ${!this.editable ? `<p class="text">${this.description}</p>` : ''}
        ${this.editable ? `<input value='${this.description}' id="input-${this.index - 1}"/>` : ''}</div>
     <div id="myLinks-${this.index - 1}" style="display:none" class="list" >
     <a href="#" class='del' id="del-${this.index - 1}">Delete</a>
     <a href="#" class='edit'>Edit</a>
   </div>
     <button class="remove" id="remove-${this.index - 1}"><i class="fa-solid fa-ellipsis-vertical ellips"></i></button>
     </li>`;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./modules/TasksList.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tasks.js */ "./modules/Tasks.js");


class Tasks {
    constructor() {
        this.tasks = [];
    }

    initialize() {
        const stored = localStorage.getItem('taskData');
        if (stored) {
            this.tasks = JSON.parse(stored)
                .map((task, index) => new _Tasks_js__WEBPACK_IMPORTED_MODULE_0__["default"](task.description, task.completed, index + 1));
            this.setHtml();
        }
        this.setup();
    }

    setup() {
        this.setupRemove();
        this.setupComplete();
        this.setupClearAll();
    }

    setupClearAll() {
        document.getElementById('clear').addEventListener('click', () => {
            this.assignTasks(this.tasks.filter((task) => !task.completed));
        });
    }

    assignTasks(tasks = this.tasks) {
        const newTasks = [];
        tasks.forEach((t, index) => {
            newTasks.push(new _Tasks_js__WEBPACK_IMPORTED_MODULE_0__["default"](t.description, t.completed, index + 1, t.editable));
        });
        this.tasks = newTasks;
        localStorage.setItem('taskData', JSON.stringify(this.tasks.map((t, index) => ({...t, index }))));
        this.setHtml();
        this.setup();
    }
    hamburger() {
        const remove = document.querySelectorAll('.remove');
        remove.forEach((rmBtn) => {
            const hamb = document.getElementById(rmBtn.id.replace('remove', 'myLinks'));
            rmBtn.addEventListener('click', () => {
                rmBtn.style.display = 'none';
                hamb.style.display = 'flex';
            });
        });
    }

    setupRemove() {
        this.hamburger();
        const del = document.querySelectorAll('.del');
        del.forEach((button) => {
            const removeFunc = () => {
                const index = parseInt(button.id.replace('del-', ''), 10);
                const newTasks = this.tasks.filter((t) => t.index !== index + 1);
                this.assignTasks(newTasks);
            };
            button.onclick = removeFunc;
        });

        const edit = document.querySelectorAll('.edit');
        edit.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.tasks[index].editable = true;
                this.assignTasks();
                const input = document.getElementById(`input-${index}`);
                input.addEventListener('change', (e) => {
                    e.preventDefault();
                    this.tasks[index].description = e.target.value;
                    this.tasks[index].editable = false;
                    this.assignTasks();
                });
            });
        });
    }

    setupComplete() {
        const checkboxList = document.querySelectorAll('.check');
        checkboxList.forEach((checkbox) => {
            checkbox.addEventListener('click', () => {
                this.tasks[parseInt(checkbox.id.replace('checkbox-', ''), 10)].completed = checkbox.checked;
                this.assignTasks();
            });
        });
    }

    newTask(description, completed) {
        const task = new _Tasks_js__WEBPACK_IMPORTED_MODULE_0__["default"](description, completed, this.tasks.length + 1);
        this.tasks.push(task);
        this.assignTasks();
        return task;
    }

    getBookList() {
        let containerHtml = '';
        this.tasks.forEach((task) => {
            containerHtml += task.getHtml();
        });
        return containerHtml;
    }

    setHtml() {
        const container = document.getElementById('tasks');
        container.innerHTML = this.getBookList();
        this.setupRemove();
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tasks);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza3NMaXN0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxlQUFlLElBQUksZ0NBQWdDO0FBQ2hILFVBQVUsb0NBQW9DLGlCQUFpQjtBQUMvRCxVQUFVLGlDQUFpQyxpQkFBaUIsY0FBYyxlQUFlLFVBQVU7QUFDbkcsd0JBQXdCLGVBQWU7QUFDdkMsdUNBQXVDLGVBQWU7QUFDdEQ7QUFDQTtBQUNBLHlDQUF5QyxlQUFlO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7VUN2Qm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsaURBQUk7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGlEQUFJO0FBQ2xDLFNBQVM7QUFDVDtBQUNBLHVGQUF1RixhQUFhO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELE1BQU07QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixpREFBSTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxLQUFLLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbW9kdWxlcy9UYXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL21vZHVsZXMvVGFza3NMaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBpbmRleCwgZWRpdGFibGUpIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQgfHwgZmFsc2U7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuZWRpdGFibGUgPSBlZGl0YWJsZSB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldEh0bWwoKSB7XG4gICAgcmV0dXJuIGAgPGxpIGNsYXNzPVwidGFza1wiIGRyYWdnYWJsZT1cInRydWVcIj5cbiAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNoZWNrXCIgIGlkPVwiY2hlY2tib3gtJHt0aGlzLmluZGV4IC0gMX1cIiAke3RoaXMuY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJyd9Lz5cbiAgICAgICAgJHshdGhpcy5lZGl0YWJsZSA/IGA8cCBjbGFzcz1cInRleHRcIj4ke3RoaXMuZGVzY3JpcHRpb259PC9wPmAgOiAnJ31cbiAgICAgICAgJHt0aGlzLmVkaXRhYmxlID8gYDxpbnB1dCB2YWx1ZT0nJHt0aGlzLmRlc2NyaXB0aW9ufScgaWQ9XCJpbnB1dC0ke3RoaXMuaW5kZXggLSAxfVwiLz5gIDogJyd9PC9kaXY+XG4gICAgIDxkaXYgaWQ9XCJteUxpbmtzLSR7dGhpcy5pbmRleCAtIDF9XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiBjbGFzcz1cImxpc3RcIiA+XG4gICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9J2RlbCcgaWQ9XCJkZWwtJHt0aGlzLmluZGV4IC0gMX1cIj5EZWxldGU8L2E+XG4gICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9J2VkaXQnPkVkaXQ8L2E+XG4gICA8L2Rpdj5cbiAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZVwiIGlkPVwicmVtb3ZlLSR7dGhpcy5pbmRleCAtIDF9XCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1lbGxpcHNpcy12ZXJ0aWNhbCBlbGxpcHNcIj48L2k+PC9idXR0b24+XG4gICAgIDwvbGk+YDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXNrOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrcy5qcyc7XHJcblxyXG5jbGFzcyBUYXNrcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBjb25zdCBzdG9yZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza0RhdGEnKTtcclxuICAgICAgICBpZiAoc3RvcmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza3MgPSBKU09OLnBhcnNlKHN0b3JlZClcclxuICAgICAgICAgICAgICAgIC5tYXAoKHRhc2ssIGluZGV4KSA9PiBuZXcgVGFzayh0YXNrLmRlc2NyaXB0aW9uLCB0YXNrLmNvbXBsZXRlZCwgaW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SHRtbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXAoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR1cFJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBDb21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBDbGVhckFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwQ2xlYXJBbGwoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXNzaWduVGFza3ModGhpcy50YXNrcy5maWx0ZXIoKHRhc2spID0+ICF0YXNrLmNvbXBsZXRlZCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnblRhc2tzKHRhc2tzID0gdGhpcy50YXNrcykge1xyXG4gICAgICAgIGNvbnN0IG5ld1Rhc2tzID0gW107XHJcbiAgICAgICAgdGFza3MuZm9yRWFjaCgodCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbmV3VGFza3MucHVzaChuZXcgVGFzayh0LmRlc2NyaXB0aW9uLCB0LmNvbXBsZXRlZCwgaW5kZXggKyAxLCB0LmVkaXRhYmxlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IG5ld1Rhc2tzO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrRGF0YScsIEpTT04uc3RyaW5naWZ5KHRoaXMudGFza3MubWFwKCh0LCBpbmRleCkgPT4gKHsuLi50LCBpbmRleCB9KSkpKTtcclxuICAgICAgICB0aGlzLnNldEh0bWwoKTtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcbiAgICBoYW1idXJnZXIoKSB7XHJcbiAgICAgICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlbW92ZScpO1xyXG4gICAgICAgIHJlbW92ZS5mb3JFYWNoKChybUJ0bikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoYW1iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm1CdG4uaWQucmVwbGFjZSgncmVtb3ZlJywgJ215TGlua3MnKSk7XHJcbiAgICAgICAgICAgIHJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcm1CdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGhhbWIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBSZW1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5oYW1idXJnZXIoKTtcclxuICAgICAgICBjb25zdCBkZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsJyk7XHJcbiAgICAgICAgZGVsLmZvckVhY2goKGJ1dHRvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZW1vdmVGdW5jID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBwYXJzZUludChidXR0b24uaWQucmVwbGFjZSgnZGVsLScsICcnKSwgMTApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcigodCkgPT4gdC5pbmRleCAhPT0gaW5kZXggKyAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXNzaWduVGFza3MobmV3VGFza3MpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBidXR0b24ub25jbGljayA9IHJlbW92ZUZ1bmM7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdCcpO1xyXG4gICAgICAgIGVkaXQuZm9yRWFjaCgoYnV0dG9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzW2luZGV4XS5lZGl0YWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2lnblRhc2tzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBpbnB1dC0ke2luZGV4fWApO1xyXG4gICAgICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YXNrc1tpbmRleF0uZGVzY3JpcHRpb24gPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tzW2luZGV4XS5lZGl0YWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXNzaWduVGFza3MoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXR1cENvbXBsZXRlKCkge1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVjaycpO1xyXG4gICAgICAgIGNoZWNrYm94TGlzdC5mb3JFYWNoKChjaGVja2JveCkgPT4ge1xyXG4gICAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza3NbcGFyc2VJbnQoY2hlY2tib3guaWQucmVwbGFjZSgnY2hlY2tib3gtJywgJycpLCAxMCldLmNvbXBsZXRlZCA9IGNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2lnblRhc2tzKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5ld1Rhc2soZGVzY3JpcHRpb24sIGNvbXBsZXRlZCkge1xyXG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayhkZXNjcmlwdGlvbiwgY29tcGxldGVkLCB0aGlzLnRhc2tzLmxlbmd0aCArIDEpO1xyXG4gICAgICAgIHRoaXMudGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgICB0aGlzLmFzc2lnblRhc2tzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRhc2s7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Qm9va0xpc3QoKSB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lckh0bWwgPSAnJztcclxuICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVySHRtbCArPSB0YXNrLmdldEh0bWwoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY29udGFpbmVySHRtbDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRIdG1sKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrcycpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSB0aGlzLmdldEJvb2tMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5zZXR1cFJlbW92ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYXNrczsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=