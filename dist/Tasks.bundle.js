/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!**************************!*\
  !*** ./modules/Tasks.js ***!
  \**************************/
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza3MuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7O1VBQUE7VUFDQTs7Ozs7V0NEQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGVBQWUsSUFBSSxnQ0FBZ0M7QUFDaEgsVUFBVSxvQ0FBb0MsaUJBQWlCO0FBQy9ELFVBQVUsaUNBQWlDLGlCQUFpQixjQUFjLGVBQWUsVUFBVTtBQUNuRyx3QkFBd0IsZUFBZTtBQUN2Qyx1Q0FBdUMsZUFBZTtBQUN0RDtBQUNBO0FBQ0EseUNBQXlDLGVBQWU7QUFDeEQ7QUFDQTtBQUNBOztBQUVBLGlFQUFlLElBQUksRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbW9kdWxlcy9UYXNrcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNsYXNzIFRhc2sge1xuICBjb25zdHJ1Y3RvcihkZXNjcmlwdGlvbiwgY29tcGxldGVkLCBpbmRleCwgZWRpdGFibGUpIHtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQgfHwgZmFsc2U7XG4gICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgIHRoaXMuZWRpdGFibGUgPSBlZGl0YWJsZSB8fCBmYWxzZTtcbiAgfVxuXG4gIGdldEh0bWwoKSB7XG4gICAgcmV0dXJuIGAgPGxpIGNsYXNzPVwidGFza1wiIGRyYWdnYWJsZT1cInRydWVcIj5cbiAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNoZWNrXCIgIGlkPVwiY2hlY2tib3gtJHt0aGlzLmluZGV4IC0gMX1cIiAke3RoaXMuY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJyd9Lz5cbiAgICAgICAgJHshdGhpcy5lZGl0YWJsZSA/IGA8cCBjbGFzcz1cInRleHRcIj4ke3RoaXMuZGVzY3JpcHRpb259PC9wPmAgOiAnJ31cbiAgICAgICAgJHt0aGlzLmVkaXRhYmxlID8gYDxpbnB1dCB2YWx1ZT0nJHt0aGlzLmRlc2NyaXB0aW9ufScgaWQ9XCJpbnB1dC0ke3RoaXMuaW5kZXggLSAxfVwiLz5gIDogJyd9PC9kaXY+XG4gICAgIDxkaXYgaWQ9XCJteUxpbmtzLSR7dGhpcy5pbmRleCAtIDF9XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiBjbGFzcz1cImxpc3RcIiA+XG4gICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9J2RlbCcgaWQ9XCJkZWwtJHt0aGlzLmluZGV4IC0gMX1cIj5EZWxldGU8L2E+XG4gICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9J2VkaXQnPkVkaXQ8L2E+XG4gICA8L2Rpdj5cbiAgICAgPGJ1dHRvbiBjbGFzcz1cInJlbW92ZVwiIGlkPVwicmVtb3ZlLSR7dGhpcy5pbmRleCAtIDF9XCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1lbGxpcHNpcy12ZXJ0aWNhbCBlbGxpcHNcIj48L2k+PC9idXR0b24+XG4gICAgIDwvbGk+YDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUYXNrOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==