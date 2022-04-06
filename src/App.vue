<template>
<v-container class="scroll-y" style="background: #E3E3EE; padding: 0px;" fluid>
  <v-app>
    <Navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <go-top bg-color="#272727" :right="70" :max-width="200"></go-top>
    <Footer />
  </v-app>
  </v-container>
</template>

<script>
import Navbar from '@/Layout/Navbar'
import Footer from '@/Layout/Footer'
import GoTop from '@inotom/vue-go-top';
export default {
  name: 'App',
 
  data(){
    return{
      
    }
  },
  methods:{
 
  },
  computed:{
    
  },
  components:{
    Navbar,
    Footer,
    GoTop
  }
};
</script>
<style>
.fade-enter-active, .fade-leave-active{
  transition-property: opacity;
  transition-duration: 0.25s;

}
.fade-enter-active{
  transition-delay: 0.25s;
}
.fade-enter, .fade-leave-active{
  opacity: 0;
}
</style>