document.addEventListener('DOMContentLoaded', () => {
  const novaTaskButton = document.getElementById('novaTaskButton');
  const newTaskContainer = document.querySelector('.new-task-container');

  if (novaTaskButton) {
    novaTaskButton.addEventListener('click', () => {
      novaTaskButton.style.display = 'none'; 

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

      const taskDescription = document.getElementById('taskDescription');
      taskDescription.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); 
        }
      });

      const newTaskForm = document.getElementById('newTaskForm');
      newTaskForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const taskName = document.getElementById('taskName').value;
        const taskDescription = document.getElementById('taskDescription').value;
        const taskDeadline = document.getElementById('taskDeadline').value;

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); 
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];

        if (taskDeadline < formattedCurrentDate) {
          alert("A data limite não pode ser no passado.");
          return; 
        }

        const task = {
          name: taskName,
          description: taskDescription,
          deadline: taskDeadline,
        };

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));


        location.reload();
      });
    });
  }
});
