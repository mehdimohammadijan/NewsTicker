<template>
<v-footer app dark>
  <v-container ma-0 fluid pt-0>
   <VTextMarquee :key="parentKey" :animate="hover"
   @mouseover="hover = true"
    @mouseleave="hover = false"
    >
      <span v-for="(article,index) in news" :key="index">
        <a :href="article.url" target="_blank" class="ticker_link"
        @mouseover="hover = false" @mouseleave="hover = true">
        {{article.title}}
        </a>
        <span v-if="index<(news.length-1)">***</span>
        </span> 
  </VTextMarquee> 
  <!-- <marquee-text :paused="hover" :key="news.length"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    >
         <span v-for="(article,index) in news" :key="index">
        {{index}}<a :href="article.url" target="_blank" class="ticker_link"
        >
        {{article.title}}
        </a>
        ***
        </span> 
  </marquee-text> -->
  </v-container>
<v-container ml-0 fluid pt-0>
    <v-layout wrap>
        <v-flex class="d-flex justify-center">
            
                {{ new Date().getFullYear() }} — <span class="font-weight-light">MMH</span>
                <span class="font-weight-bold">NEWS</span>
        
        </v-flex>
    </v-layout>
</v-container>
</v-footer>
</template>

<script>
import { VTextMarquee } from 'vue-text-marquee';
//import MarqueeText from 'vue-marquee-text-component'
//import vue-marquee from 'vue-marquee-text-component'

export default {
    components: {
        VTextMarquee
    //MarqueeText
    //[Marquee.name]: Marquee,
    //[Slide.name]: Slide
  },
  computed:{
      news(){
          return this.$store.getters.getNews
      }
    },
    watch:{
        news(){
            this.parentKey=Math.random()
        }
    },
    /*  mounted(){
          this.$store.dispatch('fetchdata','General')
      },
*/
    data(){
        return{
            icons:['mdi-facebook','mdi-twitter','mdi-linkedin','mdi-instagram'],
            hover:true,
            parentKey: 'first'
        }
    }
}
</script>

<style scoped>
a:hover{
    text-decoration: underline !important;
    
}
.ticker_link{
    text-decoration: none;
    color: white;
    margin-right:5px;
    margin-left:5px;
    font-size: large;
}
</style>