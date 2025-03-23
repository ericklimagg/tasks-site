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
            <input type="text" id="taskName" name="taskName" required maxlength="50">
          </div>
          <div>
            <label for="taskDescription">Descrição:</label>
            <textarea id="taskDescription" name="taskDescription" required maxlength="170"></textarea>
          </div>
          <div class="form-row">
            <div class="date-field">
              <label for="taskDeadline">Data Limite:</label>
              <input type="date" id="taskDeadline" name="taskDeadline" required>
            </div>
            <div class="submit-button">
              <button class="submit-button" type="submit">Salvar Task</button>
            </div>
          </div>
        </form>
      `;

      // Previne o Enter dentro da área de descrição
      const taskDescription = document.getElementById('taskDescription');
      taskDescription.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Impede a quebra de linha
        }
      });

      // Agora que o formulário foi criado, adiciona o evento de submit
      const newTaskForm = document.getElementById('newTaskForm');
      newTaskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o comportamento padrão do formulário

        // Captura os dados do formulário
        const taskName = document.getElementById('taskName').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskDeadline = document.getElementById('taskDeadline').value;

        // Verifica se a data limite é no passado
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Zera as horas, minutos, segundos e milissegundos
        const formattedCurrentDate = currentDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        if (taskDeadline < formattedCurrentDate) {
          alert("A data limite não pode ser no passado.");
          return; // Impede o envio do formulário
        }

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

        // Recarrega a página para exibir a task salva
        location.reload();
      });
    });
  }
});
