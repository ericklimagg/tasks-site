document.addEventListener('DOMContentLoaded', () => {
  const novaTaskButton = document.getElementById('novaTaskButton');
  const newTaskContainer = document.querySelector('.new-task-container');
  
  if (novaTaskButton) {
    novaTaskButton.addEventListener('click', () => {
      novaTaskButton.style.display = 'none'; // Esconde o botão
  
      // Adiciona o formulário dinamicamente
      newTaskContainer.innerHTML = `
        <form id="newTaskForm">
          <div>
            <label for="taskName">Nome da Task:</label>
            <input type="text" id="taskName" name="taskName" required>
          </div>
          <div>
            <label for="taskDescription">Descrição:</label>
            <textarea id="taskDescription" name="taskDescription" required></textarea>
          </div>
          <div>
            <label for="taskDeadline">Data Limite:</label>
            <input type="date" id="taskDeadline" name="taskDeadline" required>
          </div>
          <button type="submit">Salvar Task</button>
        </form>
      `;
  
      // Agora que o formulário foi criado, adiciona o evento de submit
      const newTaskForm = document.getElementById('newTaskForm');
      newTaskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do formulário
  
        // Captura os dados do formulário
        const taskName = document.getElementById('taskName').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskDeadline = document.getElementById('taskDeadline').value;
  
        // Cria o objeto da task
        const task = {
          name: taskName,
          description: taskDescription,
          deadline: taskDeadline,
        };
  
        // Recupera as tasks já salvas no localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
        // Adiciona a nova task ao array de tasks
        tasks.push(task);
  
        // Salva novamente no localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
  
        // Limpa o formulário
        newTaskForm.reset();
      });
    });
  }
});
