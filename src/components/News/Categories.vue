<template>
  <div v-if="news.lenght!=0">
<v-container fluid>
  <v-row>
    <v-col xs="12" md="4" v-for="(article,index) in news" :key="index">
      <Card :Article="article" />
      </v-col>
</v-row>
</v-container>
  </div>
</template>
<script>
import Card from '@/components/Cards/Card.vue'
export default {
     components:{Card},
    computed:{
      news(){
        return this.$store.getters.getNews;
      }
    },
    // updated() {
    //    this.$store.dispatch('fetchdata',this.$route.params.cat)
    //    console.log('updated runned')
    // },
    watch:{
        '$route' (to){
            this.$store.dispatch('fetchdata',to.params.cat)
            
        }
   },
      mounted(){
          //this.$store.dispatch('fetchdata','General')
          this.$store.dispatch('fetchdata',this.$route.params.cat)
         
      }

}
</script>

<style>

</style>