function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
  console.log(tasks); 
}

window.onload = loadTasks;
