import { createRouter,createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import userDashboard from '../views/userDashboard.vue';

const router = createRouter({
  history:createWebHistory(import.meta.env.BASE_URL),
  routes:[

    {
      path:'/',
      name: 'home',
      component:HomePage
    },
    {
      path: '/login',
      name:'LoginPge',
      component:Login
    },
    {
      path:'/user/signup',
      name:'Register',
      component:Register
    },
    {
      path:'/user/:id',
      name:'userDashboard',
      component:userDashboard
    },
  ]
})


export default router;
