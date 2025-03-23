// Função para carregar as tarefas do localStorage
function loadTasks() {
  // Recupera as tarefas do localStorage ou cria um array vazio se não houver nada
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  console.log('Tarefas carregadas do localStorage:', tasks);

  // Exibe as tarefas na tela
  displayTasks(tasks);
}

// Função para exibir as tarefas na página
function displayTasks(tasks) {
  const tasksDisplay = document.getElementById('tasks-display');
  tasksDisplay.innerHTML = ''; // Limpa o conteúdo atual da div

  // Verifica se não há tarefas
  if (tasks.length === 0) {
    tasksDisplay.innerHTML = '<p>Não há tarefas salvas.</p>';
    return;
  }

  // Para cada tarefa no array, cria um elemento para exibir na tela
  tasks.forEach(task => {
    console.log('Exibindo tarefa:', task); // Verifica se cada tarefa está sendo processada

    const taskDeadline = new Date(task.deadline); // Converte a string da data da tarefa para um objeto Date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Zera as horas da data atual para comparar apenas com a data (sem a hora)

    const taskElement = document.createElement('div');
    taskElement.classList.add('task'); // Adiciona uma classe para estilo

    // Verifica em qual coluna a tarefa deve ser colocada
    let taskColumn = '';

    // Verifica se a data da tarefa é anterior a data atual
    if (taskDeadline < currentDate) {
      taskColumn = 'Expirates';  // Tarefa já passou da data limite
    } 
    // Verifica se a tarefa está dentro dos próximos 6 dias
    else if (taskDeadline <= addDays(currentDate, 6)) {
      taskColumn = 'next-days';  // Tarefa dentro dos próximos 6 dias
    } 
    // Verifica se a tarefa está dentro do mês atual, incluindo o ano
    else if (taskDeadline.getFullYear() === currentDate.getFullYear() && taskDeadline.getMonth() === currentDate.getMonth()) {
      taskColumn = 'this-month';  // Tarefa dentro do mês atual
    } 
    // Se a tarefa é de um mês futuro
    else {
      taskColumn = 'next-months';  // Tarefa para os próximos meses
    }

    // Adiciona o conteúdo da tarefa
    taskElement.innerHTML = `
      <h4>${task.name}</h4>
      <p>${task.description}</p>
      <p>Data Limite: ${task.deadline}</p>
    `;

    // Adiciona a tarefa à coluna correta
    const taskColumnElement = document.getElementById(taskColumn);
    taskColumnElement.appendChild(taskElement); // Adiciona a tarefa na coluna específica
  });
}

// Função para adicionar dias a uma data (usado para calcular os próximos 6 dias)
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Chama a função para carregar as tarefas quando a página carregar
window.onload = loadTasks;
