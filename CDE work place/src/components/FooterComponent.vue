<template>
  <footer class="footer-content">
    <div class="content">
      <div class="link">
        <h4>Links</h4>
        <a href="http://localhost:5173/login"><p>Singin</p></a>
        <a href="http://localhost:5173/user/signup"><p>Signup</p></a>
        <a href="https://library.maximnyansa.com/home"><p></p></a>
      </div>
      <div class="first-section">
        <div class="address">
          <h4>.ADDRESS</h4>
          <p>CDE KOINONIA TG 213, <br />Route internationale N2 – ANEHO NLESSI.</p>
          <p></p>
        </div>
      </div>

      <div class="socials">
        <h4>-FOLLOW US</h4>

        <a href=""><i class="fa-brands fa-facebook-f"></i></a>
        <a href=""><i class="fa-brands fa-square-instagram"></i></a>
        <a href="https://www.linkedin.com/company/maxim-nyansa-it-solutions/"
          ><i class="fa-brands fa-linkedin-in"></i
        ></a>
        <a href=""><i class="fa-brands fa-twitter"></i></a>
        <a href=""
          ><i class="fa-brands fa-youtube"></i
        ></a>
        <p>Phone: +228 90 70 74 35</p>
        <p>Email: davidatikpo44@gmail.com</p>
      </div>
    </div>
    <div class="copy-right">
      <p>&copy{{ getYear }} All Rights Reserved | Devoloped By David Atikpo</p>
    </div>
    <!-- <img class="footer-logo" src="../assets/images/logo.png" /> -->
  </footer>
</template>

<script>
export default {
  data() {
    return {
      year: ''
    }
  },
  computed: {
    getYear() {
      var date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<style scoped>
footer {
  background: #4d36ce;
  height: 184px;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.content {
  display: flex;
  justify-content: center;
  gap: 6rem;
  line-height: 2rem;
}
.content p {
  font-size: 14px;
}
a {
  text-decoration: none;
  color: rgb(247, 245, 245);
  /* display: flex; */
}
.copy-right {
  width: 100%;
  padding: 0.5rem 0;
  font-size: 0.8rem;
  text-align: center;
  background-color: #e5e4e4;
}
.socials a {
  margin-right: 10px;
}
.socials{
  color: #e5e4e4;
}
.address {
  color: #e5e4e4;
}
@media only screen and (max-width: 600px) {
  footer {
    display: flex;
    height: 184px;
    align-items: center;
    /* justify-content: center; */
    gap: 3rem;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    line-height: 1.5rem;
    padding-left: 0.5rem;
  }
  .link {
    padding-left: 0.5rem;
  }
  h4 {
    font-size: 0.9rem;
  }
  .content p {
    font-size: 10px;
  }
}
</style>
