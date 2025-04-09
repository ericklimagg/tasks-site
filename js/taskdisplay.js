function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];  
  console.log('Tarefas carregadas do localStorage:', tasks);
  displayTasks(tasks);  
}

function displayTasks(tasks) {
  const tasksDisplay = document.getElementById('tasks-display');
  tasksDisplay.innerHTML = ''; 

  if (tasks.length === 0) {
    tasksDisplay.innerHTML = '<p>Não há tarefas salvas.</p>';
    return;
  }

  tasks.forEach((task, index) => {
    const taskDeadline = new Date(task.deadline);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);  

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    if (task.completed) {
      taskElement.classList.add('completed');
    }

    taskElement.innerHTML = `
      <h4>${task.name}</h4>
      <p>${task.description}</p>
      <p>Data Limite: ${task.deadline}</p>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    deleteButton.innerHTML = '🗑️';
    deleteButton.setAttribute('title', 'Excluir tarefa');

    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();  
      removeTask(index, tasks);  
      window.location.reload();  
    });

    taskElement.appendChild(deleteButton);

    taskElement.addEventListener('click', function () {
      task.completed = !task.completed;  
      localStorage.setItem('tasks', JSON.stringify(tasks));  
      taskElement.classList.toggle('completed');  
    });

    let taskColumn = '';
    if (taskDeadline < addDays(currentDate, -1)) {
      taskColumn = 'expired';
    } else if (taskDeadline <= addDays(currentDate, 6)) {
      taskColumn = '6-dias';
    } else if (taskDeadline <= addDays(currentDate, 30)) {
      taskColumn = '30-dias';
    } else {
      taskColumn = 'mais-30-dias';
    }

    document.getElementById(taskColumn).appendChild(taskElement);
  });
}

function removeTask(index, tasks) {
  tasks.splice(index, 1);  
  localStorage.setItem('tasks', JSON.stringify(tasks));  
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

window.onload = loadTasks;
