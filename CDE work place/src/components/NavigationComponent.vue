<template>
  <header class="header">
    <a href="" class="logo"
      ><img src="../assets/images/logo.jpeg" class="logoimage" alt="CDE koinonia"
    /></a>
    <input class="menu-btn" type="checkbox" id="menu-btn" />
    <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
    <ul class="menu">
      <li class="Home"><a href="#" class="Home">Home</a></li>
      <li><a href="" @click="signIn">Sign In</a></li>
      <li><a href="" @click="register">Sign Up</a></li>
    </ul>
  </header>
</template>

<script>
export default {
  methods: {
    signIn() {
      this.$router.push('/login')
    },
    register() {
      this.$router.push('/user/signup')
    }
  }
}
</script>

<style scoped>
/* header */

.header {
  background-color: #f5f0ee;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
  width: 95%;
  z-index: 3;
  margin-left: 2.5%;
  margin-top: 0%;
  position: fixed;
}

.header ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  background-color: #f7f1f0;
  margin-right: 100px;
}

.header li a {
  display: block;
  padding: 20px 20px;
  text-decoration: none;
  font-weight: bold;
  color: #2323e9;
}

.header li a:hover,
.header .menu-btn:hover {
  color: #88cc00;
}

.header .logo {
  display: block;
  float: left;
  font-size: 1em;
  padding: 10px 10px;
  text-decoration: none;
}

/* menu */

.header .menu {
  clear: both;
  max-height: 0;
  transition: max-height 0.2s ease-out;
}

/* menu icon */

.header .menu-icon {
  cursor: pointer;
  display: inline-block;
  float: right;
  padding: 28px 20px;
  position: relative;
  user-select: none;
}

.header .menu-icon .navicon {
  background: #333;
  display: block;
  height: 2px;
  position: relative;
  transition: background 0.2s ease-out;
  width: 18px;
}

.header .menu-icon .navicon:before,
.header .menu-icon .navicon:after {
  background: #333;
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  transition: all 0.2s ease-out;
  width: 100%;
}

.header .menu-icon .navicon:before {
  top: 5px;
}

.header .menu-icon .navicon:after {
  top: -5px;
}

/* menu btn */

.header .menu-btn {
  display: none;
}

.header .menu-btn:checked ~ .menu {
  max-height: 240px;
}

.header .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.header .menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.header .menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}
.logoimage {
  width: 50px;
  
}

/* 48em = 768px */

@media (min-width: 48em) {
  .header li {
    float: left;
  }
  .header li a {
    padding: 20px 30px;
  }
  .header .menu {
    clear: none;
    float: right;
    max-height: none;
  }
  .header .menu-icon {
    display: none;
  }
  .Home {
    order: 1;
  }
  .projects {
    order: 2;
  }
  .aboutme {
    order: 3;
  }
  .contactme {
    order: 4;
  }
}

@media only screen and (max-width: 600px) {
  .menu {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
