<template>
  <div class="side-bar">
    <div class="content">
      <div class="logo">
        <img class="logo-rr" src="../assets/images/logo.jpeg" alt="CDE koinonia" />
      </div>
      <div class="side-buttons">
        <router-link
          to="/user/analytics"
          :active-class="'active'"
          :exact-active-class="'exact-active'"
          class="default-link"
        >
          <div class="dashboard">
            <img class="svgs" src="../assets/images/download (1).png" alt="Home icon" />Dashboard
          </div></router-link
        >
        <!-- <router-link to="/student/trials"
          ><div class="trial-exam">
            <img class="svgs" src="../assets/images/trial-icon.svg" alt="" />Trial Exam
          </div></router-link
        > -->
        <router-link
          to="/user/review"
          :active-class="'active'"
          :exact-active-class="'exact-active'"
          class="default-link"
          ><div class="exam">
            <img class="svgs" src="../assets/images/feedback.svg" alt="Review icon" />Review
          </div></router-link
        >
        <router-link
          to="/user/feedback"
          :active-class="'active'"
          :exact-active-class="'exact-active'"
          class="default-link"
          ><div class="result">
            <img class="svgs" src="../assets/images/download (2).png" alt="feedback icon" />feedback
          </div></router-link
        >
        <router-link
          to="/user/calandrier"
          :active-class="'active'"
          :exact-active-class="'exact-active'"
          class="default-link"
          ><div class="result">
            <img class="svgs" src="" alt="calandrier icon" />Calandrier
          </div></router-link
        >
        <router-link
          to="/user/analytique"
          :active-class="'active'"
          :exact-active-class="'exact-active'"
          class="default-link"
          ><div class="result">
            <img class="svgs" src="" alt="statistique icon" />Statistique
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}
.side-bar {

  width:100%;
  background-color: rgb(249, 248, 252);
  border-right: 1.5px solid rgb(225, 219, 219);
}
.side-buttons {
  width: 100%;
  height: 100vh;
  padding-top: 3rem;
}
.logo-rr {
  height: 2.5rem;
  margin-left: 2rem;
  margin-top: 0.3rem;
}
.svgs {
  margin-right: 1.5rem;
  margin-left: 1rem;
}
.default-link {
  color: black;
  text-decoration: none;
  
}
.dashboard {
  height: 4rem;
  font-size: 1rem;
 /* color: black*/; 
  padding: 1.5rem;
  vertical-align: middle;
  display: flex;
  align-items: center;
}
.dashboard:hover {
  background-color: #88cc00;
}

.active,
.exact-active {
  background-color: #88cc00;
}

.courses {
  height: 4rem;
  font-size: 1rem;
  text-decoration: none;
  /* color: black; */
  padding: 1.5rem;
  display: flex;
  align-items: center;
}
.courses:hover {
  background-color: #88cc00;
}
.trial-exam {
  height: 4rem;
  font-size: 1rem;
  text-decoration: none;
  color: black;
  padding: 1.5rem;
  display: flex;
  align-items: center;
}
.trial-exam:hover {
  background-color: #88cc00;
}
.exam {
  height: 4rem;
  font-size: 1rem;
  text-decoration: none;
  /* color: black; */
  padding: 1.5rem;
  display: flex;
  align-items: center;
}
.exam:hover {
  background-color: #88cc00;
}
.result {
  height: 4rem;
  font-size: 1rem;
  text-decoration: none;
  /* color: black; */
  padding: 1.5rem;
  display: flex;
  align-items: center;
}
.result:hover {
  background-color: #88cc00;
}
.stats {
  height: 4rem;
  font-size: 1rem;
  text-decoration: none;
  color: black;
  padding: 1.5rem;
  display: flex;
  align-items: center;
}
.stats:hover {
  background-color: rgb(121, 160, 10);
}
.settings {
  height: 4rem;
  font-size: 1rem;
  text-decoration: none;
  color: black;
  padding: 1.5rem;
}
.settings:hover {
  background-color: #88cc00;
}
.exam.router-link-active {
  background-color: #88cc00;
}
</style>
