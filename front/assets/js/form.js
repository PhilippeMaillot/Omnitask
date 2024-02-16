document.addEventListener('DOMContentLoaded', function() {
  // Récupération des catégories depuis l'API et les mettre dans le select
  fetch('http://localhost:8080/cat')
      .then(response => response.json())
      .then(categories => {
          const selectElement = document.getElementById('cat'); // Sélection du select avec l'ID 'cat'
          categories.forEach(category => {
              const option = document.createElement('option');
              option.value = category.id_cat;
              option.textContent = category.intitule;
              selectElement.appendChild(option);
          });
      })
      .catch(error => {
          console.error('Error fetching categories:', error);
      });

  // Écoute de la soumission du formulaire
  document.getElementById('task-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Empêche la soumission par défaut du formulaire

      const formData = new FormData(this); // Création d'un objet FormData avec les données du formulaire
      const taskData = {
          id_cat: formData.get('category'),
          intitule: formData.get('title'),
          contenu: formData.get('content')
      };

      // Envoi de la requête POST à l'API pour enregistrer la tâche
      fetch('http://localhost:8080/task/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
      })
      .then(response => {
          if (response.ok) {
              alert('Task added successfully!');
              // Vous pouvez effectuer d'autres actions ici si nécessaire
          } else {
              alert('Error adding task.');
          }
      })
      .catch(error => {
          console.error('Error adding task:', error);
          alert('Error adding task. Please try again later.');
      });
  });
});
