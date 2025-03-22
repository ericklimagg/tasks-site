// Função para carregar as tarefas do localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Recupera as tarefas ou cria um array vazio
  console.log(tasks); // Para verificar no console se está funcionando
}

// Chama a função quando a página carregar
window.onload = loadTasks;
