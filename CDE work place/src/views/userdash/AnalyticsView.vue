<template>
  <div class="stud-dash">
    <div class="welcome">
      <div class="right">
        <p class="up-welcome">
          Bienvenue <span>{{ firstName }}</span>
        </p>
        <p class="under-welcome">
          N'oubliez pas de parcourir chaque aspect du tableau de bord et essayez d'écrire d'abord l'objectif du jour
          <!-- <span class="explore">Explore!!!</span> -->
        </p>
        <div class="blue"></div>
      </div>
      <div class="left">
        <img class="welcome-img" src="../../assets/images/micky.png" alt="dashboard" />
      </div>
    </div>

    <div class="exam-stats">
      <table>
        <thead>
          <tr>
            <th class="available" colspan="4"></th>
          </tr>
          <tr>
            <th>ID</th>
            <th class="exam-title">DAYS</th>
            <th>Incoming</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="disabled">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="disabled">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr class="disabled">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div class="middle-with-graph">
        <div class="bar-section">
          <Bar
            ref="Ref"
            v-if="loaded"
            style="height: 22rem"
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
          />
        </div>
      </div>
    </div>

    <div class="first-dash">
      <div class="cont cont-3 cont1a">
        <img class="books" src="../../assets/images/books.png" alt="books" />
        <div class="library">
          <h1 class="study">Prepare!</h1>
          <p>Visit the digital library for resources</p>
          <button>See now</button>
        </div>
      </div>
      <div class="cont-1 cont-2">
        <div>
          <p>
            {{ currentDate() }}
          </p>
        </div>
      </div>
      <div class="cont cont-2 cont1a">
        <div><img class="svg-icon" src="../../assets/images/trial-stat-icon.svg" alt="" /></div>
        <div>
          <p class="bigger">{{ examTotal }}</p>
          <p></p>
        </div>
      </div>
    </div>
    <!-- <div class="btm-group">
      <div class="btm-box">
        <div class="bttt">
          <img class="btm-svg" src="../../assets/images/exam-icon.svg" alt="" />
          <div class="btm-txt-small">
    
          </div>
        </div>
        <div class="txt-btm"><p>Introduction to UI/UX</p></div>
    
      </div>
      <div class="btm-box">
        <div class="bttt">
          <img class="btm-svg" src="../../assets/images/exam-icon.svg" alt="" />
          <div class="btm-txt-small">
  
          </div>
        </div>
        <div class="txt-btm"><p>Advanced Data Science</p></div>
        
      </div>
      <div class="btm-box">
        <div class="bttt">
          <img class="btm-svg" src="../../assets/images/exam-icon.svg" alt="" />
          <div class="btm-txt-small">

          </div>
        </div>
        <div class="txt-btm"><p>Introduction to Java</p></div>
  
      </div>
      <div class="btm-box">
        <div class="bttt">
          <img class="btm-svg" src="../../assets/images/exam-icon.svg" alt="" />
          <div class="btm-txt-small">
          </div>
        </div>
        <div class="txt-btm"><p>Computer Literacy 1</p></div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
// import { Bar } from 'vue-chartjs'
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale
// } from 'chart.js'

// ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: {  },

  data() {
    return {
      // subjectScores: [],
      loaded: false,
      examTotal: '',
      firstName: '',
      someresult: [],
      chartData: null,
      // chartOptions: null,
      resultDataPercent: [],
      resultDataExam: [],
      options: {},
      name: '',
      token: '',
      availableExam: []
    }
  },
  created() {
    this.loaded = false
    this.token = localStorage.getItem('token')
    this.firstName = localStorage.getItem('user');
    axios
      .get('http://localhost:8000/user/performance', { headers: { token: this.token } })
      .then((response) => {
        this.examTotal = response.data.message
        this.name = response.data.userName
        for (let exam = 0; exam < response.data.examResults.length; exam++) {
          this.resultDataExam.push(response.data.examResults[exam].examName)
          this.resultDataPercent.push(response.data.examResults[exam].percentage)
        }

        let resultforchart = []
        resultforchart = [
          {
            label: 'Subject Scores',
            data: this.resultDataPercent,
            barPercentage: 50,
            barThickness: 20,
            maxBarThickness: 50,
            minBarLength: 2,
            backgroundColor: 'rgb(136,204,0)'
          }
        ]
        this.chartData = {
          labels: this.resultDataExam,
          datasets: resultforchart
        }
        ;(this.chartOptions = {
          elements: {
            bar: {
              barThickness: 6
            }
          },
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }),
          (this.loaded = true)
        console.log(response)
      })
      .catch((error) => {
        console.log('Error fetching data:', error)
      })
    axios
      .get('http://localhost:8000/user/penddingExams', { headers: { token: this.token } })
      .then((res) => {
        console.log(res)
        this.availableExam = res.data.pendingExams
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
  
    // const formattedDate = useDateFormat(useNow(), "ddd, MMMM D, YYYY"),
    currentDate() {
      const current = new Date()
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }
      return current.toLocaleDateString('en-US', options)
    },

    goToAllExams() {
      this.$router.push('/student/exams')
    }
  }
}
</script>

<style scoped>
body {
  background-color: white;
  padding-top: 5rem;
}
.stud-dash {
  background-color: rgb(254, 254, 254);
  height: 91.5vh;
  width: 90%;
  margin-bottom: 1rem;
  margin-left: 2.5rem;
  margin-top: 1rem;
}
.welcome {
  height: 10rem;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-bottom: 2px solid rgb(215, 213, 213);
  /* box-shadow: 0 0 3px 3px rgb(233, 232, 232); */
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.welcome-img {
  width: 11.5rem;
}
.up-welcome {
  color: #2e1c6c;
  font-weight: bolder;
  font-size: 3rem;
  padding-top: 1rem;
}
.under-welcome {
  color: #737372;
  font-size: 1rem;
  width: 45rem;
}
.blue {
  margin-top: 0.7rem;
  background-color: #2e1c6c;
  height: 0.5rem;
  width: 20rem;
  border-radius: 0.5rem;
}
.explore {
  color: #5727f5;
}
.first-dash {
  display: flex;
  flex-direction: start;
  gap: 1rem;
  height: 7rem;
  margin-top: 1rem;
}

.cont-1 {
  border: none;
  width: 25%;
  border-radius: 0.5rem;
  background-color: #2e1c6c;
  color: white;
  font-size: 1.5rem;
  margin-left: 15px;
}

.cont1a {
  width: 30%;
  border-radius: 0.5rem;
  background-color: #88cc00;
}
.cont-1 p {
  font-weight: 800;
  font-size: 1.2rem;
}

.cont-2 {
  box-shadow: 0 0 3px 3px rgb(240, 239, 239);
  display: flex;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 7rem;
  border-radius: 10% / 50%;
}

.cont-3 {
  height: 9rem;
  width: 40%;
  background: white;
  overflow: hidden;
  border-radius: 90% 80% 50% 10%;
}

.available {
  font-size: 26px;
  text-align: center;
}

.study {
  font-style: italic;
  font-size: 38px;
}

.library {
  text-align: center;
  margin-right: 20px;
}

.library p {
  color: gray;
  font-size: 13px;
}

.books {
  width: 300px;
  margin-left: -120px;
}

.mid-right {
  width: 30%;
  /* display: none; */
}
.bigger {
  font-size: 2.5rem;
  font-weight: bolder;
}
.svg-icon {
  fill: #88cc00;
}
.middle-with-graph {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cont-3 {
  box-shadow: 0 0 3px 3px rgb(240, 239, 239);
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 1rem;
  padding-top: 1rem;
}
.middle-below {
  display: flex;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.bigger {
  font-size: 2.5rem;
  font-weight: bolder;
}
.svg-icon {
  fill: #88cc00;
}
.middle-with-graph {
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  align-items: center;
}
.cont-3 {
  box-shadow: 0 0 3px 3px rgb(240, 239, 239);
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 1rem;
  padding-top: 1rem;
}
.middle-below {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
}

.exam-stats {
  display: flex;
}

.view-all {
  text-decoration: underline;
}
.view-all:hover {
  cursor: pointer;
  color: red;
}

*,
*:before,
*:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

table {
  background: #2e1c6c;
  border-radius: 0.25em;
  border-collapse: collapse;
  margin: 1em;
}
th {
  border-bottom: 1px solid #364043;
  color: #fff;
  font-size: 0.85em;
  font-weight: 600;
  padding: 0.5em 1em;
  text-align: left;
}
td {
  color: #fff;
  font-weight: 400;
  padding: 0.65em 1em;
}
.disabled td {
  color: #4f5f64;
}
tbody tr {
  transition: background 0.25s ease;
}
tbody tr:hover {
  background: #88cc00;
}
</style>
