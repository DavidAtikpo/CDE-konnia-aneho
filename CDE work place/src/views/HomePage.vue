<template>
  <div>
    <component :is="NavigationComponent"></component>
    <component :is="TestimonialComponent"></component>
    <component :is="FooterComponent"></component>
  </div>
</template>

<script>
import NavigationComponent from '../components/NavigationComponent.vue'
import TestimonialComponent from '@/components/TestimonialComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';


export default {
  components:{
    NavigationComponent,
    TestimonialComponent,
    FooterComponent
  },
  data(){
    return{
      NavigationComponent,
      TestimonialComponent,
      FooterComponent
    }
  }
}
</script>

<style lang="css" scoped>
</style>

