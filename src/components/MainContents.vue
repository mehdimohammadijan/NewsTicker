<template>
<div v-if="news.lenght!=0">
<v-container fluid>
  <v-row>
    <v-col xs="12" md="4" v-for="(article,index) in news" :key="index">
      <Card :Article="article" />
      </v-col>
</v-row>
</v-container>
  <!--
     <v-container fluid grid-list-sm>
      <v-layout row wrap>

        <v-flex d-flex xs12 sm4 child-flex>
          <v-card color="orange lighten-2" tile flat>
            <v-card-text>Card 1</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex d-flex xs12 sm2>
         
          <v-layout row wrap>
            <v-flex d-flex>
              <v-card color="indigo lighten-2" dark tile flat>
                <v-card-text>Card 2  Extended To fit</v-card-text>
              </v-card>
            </v-flex>
             <v-flex d-flex>
              <v-card color="indigo lighten-2" dark tile flat>
                <v-card-text>Card 3  Extended To fit</v-card-text>
              </v-card>
            </v-flex>
             <v-flex d-flex>
              <v-card color="indigo lighten-2" dark tile flat>
                <v-card-text>Card 4 Extended To fit</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex d-flex xs12 sm6>
          <v-card color="red lighten-2" dark tile flat>
            <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
          </v-card>
        </v-flex>
     
        
         <v-flex d-flex xs12 sm4 child-flex>
          <v-card color="purple lighten-1" tile flat>
            <v-card-text>{{lorem}}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm2 child-flex>
          <v-card color="green lighten-2" tile flat>
            <v-card-text>{{lorem}}</v-card-text>
          </v-card>
        </v-flex>
        
        <v-flex xs12 sm6 child-flex>
          <v-card color="blue lighten-2" tile flat>
            <v-card-text>{{lorem}} {{lorem}}</v-card-text>
          </v-card>
        </v-flex>
       
      </v-layout>
    </v-container>-->
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
mounted () {
this.$store.dispatch('fetchdata','General')
}
}
</script>

<style>

</style>