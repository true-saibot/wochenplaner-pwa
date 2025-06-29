if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

let currentWeek = new Date();

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    let weekDates = [];
    let firstDay = new Date(currentWeek);
    firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);

    for (let i = 0; i < 7; i++) {
        let day = new Date(firstDay);
        day.setDate(day.getDate() + i);
        weekDates.push(day);
    }

    weekDates.forEach(date => {
        const dayContainer = document.createElement('div');
        dayContainer.innerHTML = `
            <h3>${date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'numeric' })}</h3>
            <input type="text" placeholder="ToDo eingeben" id="todo-${date.toDateString()}">
            <button onclick="saveTodo('${date.toDateString()}')">Speichern</button>
            <div id="list-${date.toDateString()}"></div>
        `;
        calendar.appendChild(dayContainer);

        renderTodos(date.toDateString());
    });
}

function saveTodo(dateKey) {
    const input = document.getElementById(`todo-${dateKey}`);
    let todos = JSON.parse(localStorage.getItem(dateKey)) || [];
    todos.push(input.value);
    localStorage.setItem(dateKey, JSON.stringify(todos));
    input.value = '';
    renderTodos(dateKey);
}

function renderTodos(dateKey) {
    const listDiv = document.getElementById(`list-${dateKey}`);
    listDiv.innerHTML = '';
    let todos = JSON.parse(localStorage.getItem(dateKey)) || [];
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.innerHTML = `${todo} <button onclick="deleteTodo('${dateKey}', ${index})">Löschen</button>`;
        listDiv.appendChild(todoItem);
    });
}

function deleteTodo(dateKey, index) {
    let todos = JSON.parse(localStorage.getItem(dateKey)) || [];
    todos.splice(index, 1);
    localStorage.setItem(dateKey, JSON.stringify(todos));
    renderTodos(dateKey);
}

renderCalendar();