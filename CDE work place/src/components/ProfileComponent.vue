<!-- Profile.vue -->
<template>
    <div class="profile">
      <img :src="user.avatar" alt="Profile Picture">
      <h2>{{ user.name }}</h2>
    </div>
  </template>
  
  <script>
  export default {
    props: ['user']
  }
  </script>
  