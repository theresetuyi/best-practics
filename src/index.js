import './style.css';
import updateTodos from './modules/interactive.js';

// eslint-disable-next-line no-unused-vars
const newTodoForm = document.querySelector('#new-todo-form');
const todoList = document.querySelector('.todo-list');
// eslint-disable-next-line no-unused-vars
const clear = document.querySelector('.clearComplete');

function updateInputText(id, newText) {
  const todoListArray = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateTodoList = todoListArray.map((todo) => {
    if (todo.id === parseInt(id, 10)) {
      return { ...todo, description: newText };
    }
    return todo;
  });

  updateTodos(updateTodoList);
}

function toggleComplete(id) {
  const todoListArray = JSON.parse(localStorage.getItem('todos') || '[]');
  const updateTodoList = todoListArray.map((todo) => {
    if (todo.id === parseInt(id, 10)) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  updateTodos(updateTodoList);
}

const removeItems = (type, id) => {
  const todoListArr = JSON.parse(localStorage.getItem('todos') || '[]');

  let updateList;
  if (type === 'completed') {
    updateList = todoListArr.filter((todo) => todo.completed !== true);
  } else if (type === 'todo') {
    updateList = todoListArr.filter((todo) => todo.id !== id);
  } else {
    // handle invalid type
    return;
  }

  updateTodos(updateList);
};

// eslint-disable-next-line no-unused-vars
const removeCompleted = () => {
  removeItems('completed');
};

// eslint-disable-next-line no-unused-vars
function updateList(todos) {
  const description = todos
    .map(
      (todo) => `
            <li class="card todo-list-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
              <input type="checkbox" ${todo.completed ? 'checked' : ''} class="checkbox"/>
              <input type="text" value="${todo.description}" class="inputtext" id="${todo.id}"/>
              <button type="button">🗑</button>
            </li>
          `,
    )
    .join('');

  todoList.innerHTML = description;

  function attachEventListeners(selector, callback) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => callback(element));
  }

  attachEventListeners('.todo-list-item input[type="text"]', (input) => {
    input.addEventListener('change', (e) => updateInputText(input.id, e.target.value));
  });

  attachEventListeners('.todo-list-item button', (button) => {
    button.addEventListener('click', () => removeItems('todo', button.parentNode.getAttribute('data-id')));
  });

  attachEventListeners('.checkbox', (checkbox) => {
    checkbox.addEventListener('change', () => {
      toggleComplete(checkbox.parentNode.getAttribute('data-id'));
    });
  });
}
const completedCheckboxes = todoList.querySelectorAll('.todo-list-item input[type="checkbox"]');
completedCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', () => toggleComplete(checkbox.parentNode.getAttribute('data-id')));
});
