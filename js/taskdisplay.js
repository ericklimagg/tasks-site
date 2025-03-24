// Função para carregar as tarefas do localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Recupera as tarefas ou cria um array vazio
  console.log('Tarefas carregadas do localStorage:', tasks);
  displayTasks(tasks);  // Exibe as tarefas
}

// Função para exibir as tarefas na página
function displayTasks(tasks) {
  const tasksDisplay = document.getElementById('tasks-display');
  tasksDisplay.innerHTML = ''; // Limpa a div antes de renderizar

  if (tasks.length === 0) {
    tasksDisplay.innerHTML = '<p>Não há tarefas salvas.</p>';
    return;
  }

  tasks.forEach((task, index) => {
    const taskDeadline = new Date(task.deadline);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);  // Zera a hora da data atual para comparação

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    // Adiciona a classe "completed" se a tarefa estiver concluída
    if (task.completed) {
      taskElement.classList.add('completed');
    }

    taskElement.innerHTML = `
      <h4>${task.name}</h4>
      <p>${task.description}</p>
      <p>Data Limite: ${task.deadline}</p>
    `;

    // Criando o botão de exclusão (lixeira)
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-task');
    deleteButton.innerHTML = '🗑️';
    deleteButton.setAttribute('title', 'Excluir tarefa');

    // Evento para excluir a tarefa
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation();  // Impede que o clique na lixeira também dispare o clique na tarefa
      removeTask(index, tasks);  // Remove a tarefa do localStorage e da interface
      window.location.reload();  // Recarrega a página para atualizar a interface
    });

    // Adiciona o botão de lixeira ao elemento da tarefa
    taskElement.appendChild(deleteButton);

    // Evento de clique para alternar o estado de concluído
    taskElement.addEventListener('click', function () {
      task.completed = !task.completed;  // Alterna o estado concluído
      localStorage.setItem('tasks', JSON.stringify(tasks));  // Salva as mudanças no localStorage
      taskElement.classList.toggle('completed');  // Altera o estilo visualmente
    });

    // Determina em qual coluna colocar a tarefa com base na data
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

    // Adiciona a tarefa à coluna específica
    document.getElementById(taskColumn).appendChild(taskElement);
  });
}

// Função para remover a tarefa do localStorage e da interface
function removeTask(index, tasks) {
  tasks.splice(index, 1);  // Remove a tarefa com base no índice
  localStorage.setItem('tasks', JSON.stringify(tasks));  // Atualiza o localStorage
}

// Função para adicionar dias a uma data
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Chama a função ao carregar a página
window.onload = loadTasks;
