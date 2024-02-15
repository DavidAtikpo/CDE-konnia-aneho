<template>
  <div>
    <!-- Step 1: Information about the child -->
    <div class="container">
     <div class="info1">
      <div v-if="currentStep === 1">
        <h2>Step 1: Child Information</h2>
        <div class="form-group">
          <label class="" for="Nom">Nom </label><br>

          <input type="text" v-model="child.name" class="input-field">
        </div>
        <div class="form-group">
          <label>Prenom:</label><br>
          <input type="text" v-model="child.firstNames" class="input-field">
        </div>
        <div class="form-group">
          <label>Classe</label><br>
          <input type="text" v-model="child.class" class="input-field">
        </div>
        <div class="form-group">
          <label>Date de naissance:</label><br>
          <input type="text" v-model="child.birthDate" class="input-field">
        </div>
        <div class="form-group">
          <label>Lieu de naissance:</label><br>
          <input type="text" v-model="child.birthPlace" class="input-field">
        </div>
        <!-- Other fields for child information -->
        <button class="button" @click="nextStep">Next</button>
      </div>
     </div>
    

    <!-- Step 2: Information about the parents -->
    <div class="info2">
      <div v-if="currentStep === 2">
        <h2>Step 2: Parent Information</h2>
        <div class="form-group">
          <label>Nom du père:</label><br>
          <input type="text" v-model="parent.fathersName" class="input-field">
        </div>
        <div class="form-group">
          <label>Nom de la mère:</label><br>
          <input type="text" v-model="parent.mothersName" class="input-field">
        </div>
        <div class="form-group">
          <label>Téléphone:</label><br>
          <input type="text" v-model="parent.phoneNumber" class="input-field">
        </div>
        <!-- Other fields for parent information -->
        <button @click="submit">Submit</button>
      </div>
    </div>

    <!-- Step 3: Add a photo (optional) -->
    <div class="info3">
      <div v-if="currentStep === 3">
        <h2>Step 3: Add a Photo (Optional)</h2>
        <button @click="skipStep">Skip</button>
        <!-- Photo upload functionality -->
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      child: {
        name: '',
        firstNames: '',
        class: '',
        birthDate: '',
        birthPlace: ''
        // Other child fields
      },
      parent: {
        fathersName: '',
        mothersName: '',
        phoneNumber: ''
        // Other parent fields
      },
    };
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    submit() {
      // Submit data to backend
      console.log('Submitted child and parent information:', this.child, this.parent);
      // Assuming backend submission is successful, move to the next step
      this.nextStep();
    },
    skipStep() {
      // Move to the next step (in this case, step 3)
      this.nextStep();
    },
  },
};
</script>

<style scoped>
.info1, .info2, .info3 {
  margin-left:30%;

}
.container{
  background-color: rgb(253, 251, 251);
  padding-top:45px;
  width: 70%;
  height: 500px;

}
.button{
  position:absolute;
  margin-left: 250px;
  width: 80px;
}

.input-field {
  width: 250px; /* Ajustez la largeur selon vos besoins */
  height: 30px; /* Ajustez la hauteur selon vos besoins */
  margin-bottom: 10px; /* Ajoute un espace entre les champs */
  margin-left: 20px;
}
</style>
