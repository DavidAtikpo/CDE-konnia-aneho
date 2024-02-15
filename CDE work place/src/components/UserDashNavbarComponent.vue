<template>
  <div class="navbar">
    <div class="navbar-container">
      <!-- Recherche -->
      <div class="search">
        <input v-if="isActive" type="text" v-model="searchTerm" @input="search">
        <div @click="toggleSearch" v-if="!isActive">🔍</div>
      </div>

      <!-- Liens de navigation -->
    
      <router-link
        to="/user/inscription"
        :active-class="'active'"
        :exact-active-class="'exact-active'"
        class="default-link"
      >
        <div class="inscri">Inscription</div>
      </router-link>

      <router-link
        to="/user/suivi"
        :active-class="'active'"
        :exact-active-class="'exact-active'"
        class="default-link"
      >
        <div class="suivi">Suivi<br>quotidien</div>
      </router-link>

      <router-link
        to="/user/programmme"
        :active-class="'active'"
        :exact-active-class="'exact-active'"
        class="default-link"
      >
        <div class="prog">Programme</div>
      </router-link>
      <!-- Dropdown 1 -->
      <div class="dropdown-anchor">
        <div @click="toggleDropdown1" class="dropdown">
          <div class="dropdown-icon">...</div>
        </div>
        <div class="dropp">
          <ul v-if="isDropdownOpen1" class="dropdown-menu">
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      </div>

      <!-- Avatar et dropdown menu -->
      <div class="profile-section">
        <img class="notification-icon" src="../components/icons/notification-icon.svg" />
        <img class="profile-icon" src="../components/icons/profile-icon.svg" @click="toggleDropDown" />
      </div>
    </div>

    <!-- Dropdown menu utilisateur -->
    <div class="drop-container" v-if="showDropDown">
      <div class="drop-down">
        <ul>
          <router-link to="/student/info">
            <li class="link">My Info</li>
          </router-link>
          <li @click="logout">Logout</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      showDropDown: false,
      token: '',
      searchTerm:'',
      isActive:false,
      isDropdownOpen1:false,
    }
  },
  methods: {
    toggleDropDown() {
      this.showDropDown = !this.showDropDown
    },
   
    toggleSearch(){
     this.isActive = !this.isActive
    },
    toggleDropdown1(){
      this.isDropdownOpen1 = !this.isDropdownOpen1
    },
    
    logout() {
      this.token = localStorage.getItem('token')
      axios
        .post('http://localhot:8000/user/logout', {},{ headers: { token: this.token } })
        .then((res) => {
          console.log(res)
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
}
.navbar {
  width: 100%;
  background-color: rgb(240, 52, 5);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Pour aligner horizontalement les éléments */
  padding: 0 3.5rem 0;
}

.user-greeting {
  font-size: 1.5rem;
}

.profile-section {
  align-items: center;
}

.profile-icon {
  margin-left: 16px;
  justify-self: center;
  padding-top: 2px;
  cursor: pointer;
}

.drop-container {
  display: flex;
  justify-content: end;
}

.drop-down {
  width: 10rem;
  z-index: 1000;
  background-color: rgb(247, 243, 243);
  position:absolute;
  top: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 3px 3px rgb(176, 175, 175);
  overflow: hidden;
  margin-right: 1rem;
}

ul {
  list-style-type: none;
}

ul li {
  text-align: center;
  height: 2.5rem;
  width: 100%;
  font-size: 1rem;
  padding-top: 0.8rem;
  border-bottom: #88cc00 1px solid;
  color: black;
  text-decoration: none;
}

li:hover {
  color: white;
  cursor: pointer;
  background-color: #88cc00;
  font-weight: bolder;
  font-size: 1.05rem;
  transition: 0.2s ease-out;
}

/* Style pour le dropdown menu */
.dropdown-menu {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style-type: none;
}

/* Style pour les options du dropdown menu */
.dropdown-menu li {
  cursor: pointer;
}

/* Style pour le dropdown de trois points */
.dropdown {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.dropdown-icon {
  font-size: 30px;
  padding-top: 10px;
  transform: rotate(90deg);
  color:#fff
  
  /* Pour ajouter de l'espace entre les trois points et les autres éléments */
}
.dropp{
  margin-right:0px;
}

/* Styles pour le positionnement absolu */

.dropdown {
  position: absolute; /* Positionnement absolu pour les points */
  top: 0;
  right:2px; /* Alignement à droite */
}
.dropdown-menu {
   /* Positionnement absolu pour le dropdown menu */
  top: 5%; /* Le dropdown s'affichera en dessous des points */
  right:0; /* Alignement à droite */
}
.prog{
  font-size: 20px;
  color: #fff;
  
}
.inscri{
  color: #fff;
}
.suivi{
  color: #fff;
}
</style>
