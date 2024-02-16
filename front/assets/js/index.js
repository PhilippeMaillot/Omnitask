document.addEventListener("DOMContentLoaded", function () {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btns = document.querySelectorAll(".add-card-btn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btns.forEach(function (btn) {
    btn.onclick = function () {
      modal.style.display = "block";
      var categoryId = this.dataset.category; // Get category ID from data attribute of button
      document
        .getElementById("task-form")
        .setAttribute("data-category", categoryId); // Set category ID to form data attribute
    };
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Event listener for form submission
  document
    .getElementById("task-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      var formData = new FormData(this); // Create FormData object with form data
      var taskData = {
        id_cat: this.dataset.category, // Get category ID from data attribute of form
        intitule: formData.get("Intitulé"),
        contenu: formData.get("Description"),
      };
      console.log(taskData);

      // Send data to server

      fetch("http://localhost:8080/task/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((response) => {
          if (response.ok) {
            alert("Task added successfully!");
            modal.style.display = "none"; // Close the modal
            showList(); // Refresh the list
          } else {
            alert("Error adding task.");
          }
        })
        .catch((error) => {
          console.error("Error adding task:", error);
          alert("Error adding task. Please try again later.");
        });
    });
});

// Fonction pour afficher la liste avec des boutons de suppression
// Fonction pour afficher la liste avec des boutons de suppression et de modification
function showList() {
  fetch("http://localhost:8080/task")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Define object to map category IDs to their corresponding list IDs
      const categoryToListMap = {
        1: "it-list",
        2: "dev-list",
        3: "management-list",
        4: "business-list",
      };

      // Iterate through the fetched tasks and add them to their corresponding lists
      for (let categoryId in categoryToListMap) {
        const listId = categoryToListMap[categoryId];
        const list = document.getElementById(listId);
        if (list) {
          // Remove all existing task items from the list
          list.innerHTML = "";

          // Filter tasks for the current category
          const tasksForCategory = data.filter(
            (task) => task.id_cat == categoryId
          );

          // Add tasks to the list
          tasksForCategory.forEach((task) => {
            const taskItem = document.createElement("li");
            taskItem.textContent = task.intitule;

            // Add click event listener to show task content in popup
            taskItem.addEventListener("click", function () {
              showTaskContentPopup(task.intitule, task.contenu);
            });

            // Create delete button for each task
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = "❌";
            deleteButton.classList.add("delete-button");
            deleteButton.onclick = function (event) {
              event.stopPropagation();
              deleteTask(task.id);
            };

            // Create modify button for each task
            const modifyButton = document.createElement("button");
            modifyButton.innerHTML = "🔧";
            modifyButton.classList.add("modify-button");
            modifyButton.onclick = function (event) {
              event.stopPropagation();
              showModifyForm(task.id, task.intitule, task.contenu);
            };

            // Append buttons to the task item
            taskItem.appendChild(modifyButton);
            taskItem.appendChild(deleteButton);

            // Append task item to the list
            list.appendChild(taskItem);
          });
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching tasks:", error);
    });
}

// Fonction pour afficher le formulaire de modification
function showModifyForm(taskId, title, description) {
  // Populate form fields with task data
  document.getElementById("Intitulé").value = title;
  document.getElementById("Description").value = description;

  // Show modal
  modal.style.display = "block";

  // Set task ID as a data attribute in the form
  document.getElementById("task-form").setAttribute("data-task-id", taskId);
}

// Fonction pour afficher le contenu de la tâche dans un popup
function showTaskContentPopup(title, content) {
  // Display popup with task content
  alert(`Intitulé : ${title}\n\nContenu : ${content}`);
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the modify modal
  var modifyModal = document.getElementById("modifyModal");

  // Get the <span> element that closes the modify modal
  var modifyCloseSpan = document
    .getElementById("modifyModal")
    .getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modify modal
  modifyCloseSpan.onclick = function () {
    modifyModal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modify modal, close it
  window.onclick = function (event) {
    if (event.target == modifyModal) {
      modifyModal.style.display = "none";
    }
  };

  // Event listener for modification form submission
  document
    .getElementById("modify-task-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      var formData = new FormData(this); // Create FormData object with form data
      var taskId = this.dataset.taskId; // Get task ID from data attribute of form

      var modifiedTaskData = {
        id: taskId,
        intitule: formData.get("modify-title"),
        contenu: formData.get("modify-description"),
      };
      console.log(modifiedTaskData);

      // Send modified data to server
      fetch(`http://localhost:8080/task/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedTaskData),
      })
        .then((response) => {
          if (response.ok) {
            alert("Task modified successfully!");
            modifyModal.style.display = "none"; // Close the modify modal
            showList(); // Refresh the list
          } else {
            alert("Error modifying task.");
          }
        })
        .catch((error) => {
          console.error("Error modifying task:", error);
          alert("Error modifying task. Please try again later.");
        });
    });
});

// Function to show modify modal with task data
function showModifyForm(taskId, title, description) {
  // Populate form fields with task data
  document.getElementById("modify-title").value = title;
  document.getElementById("modify-description").value = description;

  // Show modify modal
  var modifyModal = document.getElementById("modifyModal");
  modifyModal.style.display = "block";

  // Set task ID as a data attribute in the form
  document
    .getElementById("modify-task-form")
    .setAttribute("data-task-id", taskId);
}

// Fonction pour supprimer une tâche
function deleteTask(taskId) {
  // Envoyer une requête au serveur pour supprimer la tâche avec l'identifiant taskId
  fetch(`http://localhost:8080/task/delete/${taskId}`, {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        alert("Task deleted successfully!");
        showList(); // Rafraîchir la liste après la suppression
      } else {
        alert("Error deleting task.");
      }
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      alert("Error deleting task. Please try again later.");
    });
}

showList(); // Appeler showList pour afficher la liste initiale
