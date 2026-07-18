let tasks = [];

function addTask() {
  const input = document.getElementById('input-box');
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ id: Date.now(), text, completed: false });
  input.value = '';
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  render(id);
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function render(celebrateId) {
  const list = document.getElementById('list-container');
  list.innerHTML = '';

  if (tasks.length === 0) {
    const empty = document.createElement('div');
    empty.className = 'empty-msg';
    empty.textContent = "Nothing here yet — add your first task above.";
    list.appendChild(empty);
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    if (task.id === celebrateId && task.completed) {
      li.classList.add('celebrate');
    }

    const check = document.createElement('button');
    check.className = 'check-circle';
    check.innerHTML = task.completed ? '&#10003;' : '';
    check.onclick = () => toggleTask(task.id);

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    const del = document.createElement('button');
    del.className = 'delete-btn';
    del.innerHTML = '&times;';
    del.onclick = () => deleteTask(task.id);

    li.appendChild(check);
    li.appendChild(text);
    li.appendChild(del);
    list.appendChild(li);
  });

  const completed = tasks.filter(t => t.completed).length;
  document.getElementById('completed-counter').textContent = completed;
  document.getElementById('uncompleted-counter').textContent = tasks.length - completed;
}

document.getElementById('input-box').addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

render();