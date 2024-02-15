<!-- UserDashboard.vue -->
<template>
    <div>
    <userDashLayout>
    <template #sidebar>
    <UserDashSidebarComponent></UserDashSidebarComponent>
    </template>
    <template #topbar>
    <UserDashNavbarComponent></UserDashNavbarComponent>
    </template>
    <template #dashboard>
      <component :is="CurrentView"></component>
    </template>
     </userDashLayout>
    </div>
  </template>
  
  <script>
  
  import userDashLayout from '@/layouts/userDashLayout.vue';
  import UserDashNavbarComponent from '../components/UserDashNavbarComponent.vue'
  import UserDashSidebarComponent from '../components/UserDashSidebarComponent.vue'
  import childRegInfo from '../components/childRegInfo.vue';
  import suiviComponent from '../components/suiviComponent.vue';
  import AnalyticsView from './userdash/AnalyticsView.vue';
  
  export default {
    components:{
      userDashLayout,
      UserDashSidebarComponent,
      UserDashNavbarComponent,
      analytics: AnalyticsView,
      inscription : childRegInfo,
      suivi : suiviComponent
},
    data() {
    return{
      userDashLayout,
      UserDashSidebarComponent,
      UserDashNavbarComponent,
      CurrentView:'analytics',
    }
  },
  watch:{
    $route(to) {
      this.CurrentView = to.params.id
    }
  },
    // methods: {
    //   saveData() {
    //     // Save the data to a database or perform any required action
    //   }
    // }
  }
  </script>
  <style lang="scss" scoped>
</style>
  
  