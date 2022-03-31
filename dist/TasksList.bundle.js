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
            return ` <li class="task">
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
        return task;
      }
      
    displayTask(description, completed) {
        this.newTask(description, completed);
        this.assignTasks();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza3NMaXN0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxlQUFlLElBQUksZ0NBQWdDO0FBQ2hILFVBQVUsb0NBQW9DLGlCQUFpQjtBQUMvRCxVQUFVLGlDQUFpQyxpQkFBaUIsY0FBYyxlQUFlLFVBQVU7QUFDbkcsd0JBQXdCLGVBQWU7QUFDdkMsdUNBQXVDLGVBQWU7QUFDdEQ7QUFDQTtBQUNBLHlDQUF5QyxlQUFlO0FBQ3hEO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJOzs7Ozs7VUN2Qm5CO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOOEI7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGlEQUFJO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixpREFBSTtBQUNsQyxTQUFTO0FBQ1Q7QUFDQSx1RkFBdUYsYUFBYTtBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsTUFBTTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBLHlCQUF5QixpREFBSTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLEtBQUssRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9tb2R1bGVzL1Rhc2tzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbW9kdWxlcy9UYXNrc0xpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgaW5kZXgsIGVkaXRhYmxlKSB7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5lZGl0YWJsZSA9IGVkaXRhYmxlIHx8IGZhbHNlO1xuICAgIH1cblxuICAgIGdldEh0bWwoKSB7XG4gICAgICAgICAgICByZXR1cm4gYCA8bGkgY2xhc3M9XCJ0YXNrXCI+XG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjaGVja1wiICBpZD1cImNoZWNrYm94LSR7dGhpcy5pbmRleCAtIDF9XCIgJHt0aGlzLmNvbXBsZXRlZCA/ICdjaGVja2VkJyA6ICcnfS8+XG4gICAgICAgICR7IXRoaXMuZWRpdGFibGUgPyBgPHAgY2xhc3M9XCJ0ZXh0XCI+JHt0aGlzLmRlc2NyaXB0aW9ufTwvcD5gIDogJyd9XG4gICAgICAgICR7dGhpcy5lZGl0YWJsZSA/IGA8aW5wdXQgdmFsdWU9JyR7dGhpcy5kZXNjcmlwdGlvbn0nIGlkPVwiaW5wdXQtJHt0aGlzLmluZGV4IC0gMX1cIi8+YCA6ICcnfTwvZGl2PlxuICAgICA8ZGl2IGlkPVwibXlMaW5rcy0ke3RoaXMuaW5kZXggLSAxfVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgY2xhc3M9XCJsaXN0XCIgPlxuICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPSdkZWwnIGlkPVwiZGVsLSR7dGhpcy5pbmRleCAtIDF9XCI+RGVsZXRlPC9hPlxuICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPSdlZGl0Jz5FZGl0PC9hPlxuICAgPC9kaXY+XG4gICAgIDxidXR0b24gY2xhc3M9XCJyZW1vdmVcIiBpZD1cInJlbW92ZS0ke3RoaXMuaW5kZXggLSAxfVwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtZWxsaXBzaXMtdmVydGljYWwgZWxsaXBzXCI+PC9pPjwvYnV0dG9uPlxuICAgICA8L2xpPmA7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFzazsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBUYXNrIGZyb20gJy4vVGFza3MuanMnO1xuXG5jbGFzcyBUYXNrcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudGFza3MgPSBbXTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplKCkge1xuICAgICAgICBjb25zdCBzdG9yZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza0RhdGEnKTtcbiAgICAgICAgaWYgKHN0b3JlZCkge1xuICAgICAgICAgICAgdGhpcy50YXNrcyA9IEpTT04ucGFyc2Uoc3RvcmVkKVxuICAgICAgICAgICAgICAgIC5tYXAoKHRhc2ssIGluZGV4KSA9PiBuZXcgVGFzayh0YXNrLmRlc2NyaXB0aW9uLCB0YXNrLmNvbXBsZXRlZCwgaW5kZXggKyAxKSk7XG4gICAgICAgICAgICB0aGlzLnNldEh0bWwoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldHVwKCk7XG4gICAgfVxuXG4gICAgc2V0dXAoKSB7XG4gICAgICAgIHRoaXMuc2V0dXBSZW1vdmUoKTtcbiAgICAgICAgdGhpcy5zZXR1cENvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMuc2V0dXBDbGVhckFsbCgpO1xuICAgIH1cblxuICAgIHNldHVwQ2xlYXJBbGwoKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hc3NpZ25UYXNrcyh0aGlzLnRhc2tzLmZpbHRlcigodGFzaykgPT4gIXRhc2suY29tcGxldGVkKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzc2lnblRhc2tzKHRhc2tzID0gdGhpcy50YXNrcykge1xuICAgICAgICBjb25zdCBuZXdUYXNrcyA9IFtdO1xuICAgICAgICB0YXNrcy5mb3JFYWNoKCh0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbmV3VGFza3MucHVzaChuZXcgVGFzayh0LmRlc2NyaXB0aW9uLCB0LmNvbXBsZXRlZCwgaW5kZXggKyAxLCB0LmVkaXRhYmxlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRhc2tzID0gbmV3VGFza3M7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrRGF0YScsIEpTT04uc3RyaW5naWZ5KHRoaXMudGFza3MubWFwKCh0LCBpbmRleCkgPT4gKHsuLi50LCBpbmRleCB9KSkpKTtcbiAgICAgICAgdGhpcy5zZXRIdG1sKCk7XG4gICAgICAgIHRoaXMuc2V0dXAoKTtcbiAgICB9XG4gICAgaGFtYnVyZ2VyKCkge1xuICAgICAgICBjb25zdCByZW1vdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmVtb3ZlJyk7XG4gICAgICAgIHJlbW92ZS5mb3JFYWNoKChybUJ0bikgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGFtYiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJtQnRuLmlkLnJlcGxhY2UoJ3JlbW92ZScsICdteUxpbmtzJykpO1xuICAgICAgICAgICAgcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcm1CdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBoYW1iLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0dXBSZW1vdmUoKSB7XG4gICAgICAgIHRoaXMuaGFtYnVyZ2VyKCk7XG4gICAgICAgIGNvbnN0IGRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWwnKTtcbiAgICAgICAgZGVsLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVtb3ZlRnVuYyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGJ1dHRvbi5pZC5yZXBsYWNlKCdkZWwtJywgJycpLCAxMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3VGFza3MgPSB0aGlzLnRhc2tzLmZpbHRlcigodCkgPT4gdC5pbmRleCAhPT0gaW5kZXggKyAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2lnblRhc2tzKG5ld1Rhc2tzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBidXR0b24ub25jbGljayA9IHJlbW92ZUZ1bmM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGVkaXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZWRpdCcpO1xuICAgICAgICBlZGl0LmZvckVhY2goKGJ1dHRvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tzW2luZGV4XS5lZGl0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hc3NpZ25UYXNrcygpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGlucHV0LSR7aW5kZXh9YCk7XG4gICAgICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tzW2luZGV4XS5kZXNjcmlwdGlvbiA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tzW2luZGV4XS5lZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFzc2lnblRhc2tzKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0dXBDb21wbGV0ZSgpIHtcbiAgICAgICAgY29uc3QgY2hlY2tib3hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrJyk7XG4gICAgICAgIGNoZWNrYm94TGlzdC5mb3JFYWNoKChjaGVja2JveCkgPT4ge1xuICAgICAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrc1twYXJzZUludChjaGVja2JveC5pZC5yZXBsYWNlKCdjaGVja2JveC0nLCAnJyksIDEwKV0uY29tcGxldGVkID0gY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgICAgICAgICB0aGlzLmFzc2lnblRhc2tzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV3VGFzayhkZXNjcmlwdGlvbiwgY29tcGxldGVkKSB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBuZXcgVGFzayhkZXNjcmlwdGlvbiwgY29tcGxldGVkLCB0aGlzLnRhc2tzLmxlbmd0aCArIDEpO1xuICAgICAgICB0aGlzLnRhc2tzLnB1c2godGFzayk7XG4gICAgICAgIHJldHVybiB0YXNrO1xuICAgICAgfVxuICAgICAgXG4gICAgZGlzcGxheVRhc2soZGVzY3JpcHRpb24sIGNvbXBsZXRlZCkge1xuICAgICAgICB0aGlzLm5ld1Rhc2soZGVzY3JpcHRpb24sIGNvbXBsZXRlZCk7XG4gICAgICAgIHRoaXMuYXNzaWduVGFza3MoKTtcbiAgICAgIH1cblxuICAgIGdldEJvb2tMaXN0KCkge1xuICAgICAgICBsZXQgY29udGFpbmVySHRtbCA9ICcnO1xuICAgICAgICB0aGlzLnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICAgIGNvbnRhaW5lckh0bWwgKz0gdGFzay5nZXRIdG1sKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29udGFpbmVySHRtbDtcbiAgICB9XG5cbiAgICBzZXRIdG1sKCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza3MnKTtcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IHRoaXMuZ2V0Qm9va0xpc3QoKTtcbiAgICAgICAgdGhpcy5zZXR1cFJlbW92ZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFza3M7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9