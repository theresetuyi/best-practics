const todoList = document.querySelector('.todo-list');

export default function updateTodos(newTodos) {
  const updatedTodos = newTodos.map((todo, index) => ({ ...todo, id: index + 1 }));

  localStorage.setItem('todos', JSON.stringify(updatedTodos));

  const description = updatedTodos.map((todo) => `
  <li class="card todo-list-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
    <input type="checkbox" ${todo.completed ? 'checked' : ''} class="checkbox"/>
    <input type="text" value="${todo.description}" class="inputtext" id="${todo.id}"/>
    <button type="button">🗑</button>
  </li>
`).join('');

  todoList.innerHTML = description;
}