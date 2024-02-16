document.addEventListener('DOMContentLoaded', function() {
  const todoTasks = document.getElementById('todo-tasks');
  const inProgressTasks = document.getElementById('inprogress-tasks');
  const doneTasks = document.getElementById('done-tasks');

  // Effectuer une requête HTTP GET vers votre API pour récupérer les tâches
  fetch('http://localhost:8080/task/')
      .then(response => response.json())
      .then(tasks => {
        console.log(tasks);
          tasks.forEach(task => {
            console.log(task);
              const taskElement = document.createElement('div');
              taskElement.classList.add('task');
              taskElement.textContent = task.intitule;

              switch (task.id_cat) {
                  case 'IT':
                      todoTasks.appendChild(taskElement);
                      break;
                  case 'DEV':
                      inProgressTasks.appendChild(taskElement);
                      break;
                  case 'MANAGEMENT':
                      doneTasks.appendChild(taskElement);
                      break;
                  case 'BUSINESS':
                      doneTasks.appendChild(taskElement);
                      break;
                  default:
                      console.error('Invalid task status:', task.id_cat);
              }
          });
      })
      .catch(error => {
          console.error('Error fetching tasks:', error);
      });
});
