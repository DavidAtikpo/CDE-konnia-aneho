<template>
  <div class="container">
    <div class="content">
      <h2>Remplir l'objectif de la journée</h2>
      <hr>
      <div class="input-group">
        <label for="arrivalTime">Temps d'arrivée au service:</label><br>
        <!-- Champ de saisie pour le temps d'arrivée -->
        <input type="text" id="arrivalTime" v-model="arrivalTime" readonly>
      </div>
      <div class="input-group">
        <label for="date">Date:</label><br>
        <!-- Date input that will be selected automatically -->
        <input type="date" id="date" v-model="date" readonly>
      </div>
      <div class="input-group">
        <label for="dailyGoal">Objectif de la journée:</label><br>
        <!-- Champ de saisie pour l'objectif de la journée avec une hauteur plus grande -->
        <textarea id="dailyGoal" v-model="dailyGoal" rows="4"></textarea>
      </div>
      <button @click="submitForm">Submit</button> <!-- Submit button -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      arrivalTime: '', // Temps d'arrivée au service
      date:'',
      dailyGoal: '' // Objectif de la journée
    };
  },
  mounted() {
    // Lorsque le composant est monté, récupérez l'heure actuelle et mettez-la dans le champ de saisie du temps d'arrivée
    this.arrivalTime = this.getCurrentTime();
    // Fetch current date
    this.fetchDate();
  },
  methods: {
    getCurrentTime() {
      // Fonction pour récupérer l'heure actuelle au format HH:MM
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    fetchDate() {
      // HTTP GET request to fetch the current date
      axios.get('http://localhost:8000/api/date')
        .then(response => {
          this.date = response.data.date;
        })
        .catch(error => {
          console.error('Error fetching date:', error);
        });
    },
    submitForm() {
      const formData = {
        arrivalTime: this.arrivalTime,
        date: this.date,
        dailyGoal: this.dailyGoal
      };
      axios.post('http://localhost:8000/user/entre', formData,{ headers: { token: this.token } })
        .then(response => {
          console.log('Form submitted successfully:', response.data);
          // Optionally, you can reset the form fields after successful submission
          this.arrivalTime = '';
          this.date = '';
          this.dailyGoal = '';
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });
    }
  }
};
</script>


<style>
.container {
  width: 100%;
  height: auto;
  position: relative;
  transform: skew(); /* Inclinaison vers la droite */
  background-color: #f0f0f0;
}

.content {
  padding: 20px;
  transform: skew(); /* Contre-inclinaison pour le contenu */
}

.input-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input,
textarea {
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  height: 70px;
}
</style>
