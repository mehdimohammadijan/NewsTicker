<template>
  <v-container class="parent-container">
  <div class="searchbox">
    <v-text-field
    v-model="search_value"
      class="shrink"
      color="Normal"
      @keypress.enter="show"
      >
       <template v-slot:append>
          <v-btn
      outlined
      x-small
      fab
      color="black"
      @click="show"
    >
      <v-icon class="mdi-rotate-90">mdi-magnify</v-icon>
    </v-btn>
      </template>
 <template v-slot:prepend-inner>
          <AdvancedSearch />
      </template>
    </v-text-field>
    </div> 
    <div class="searchresult">
      <v-container class="grey lighten-5 mb-6" v-if="news.length!=0">
      <v-layout row v-for="(article,index) in news" :key="index" mb-1 >
        <v-flex xs12 sm6 pa-0 ma-0>
          <img
           :src="article.urlToImage"
           class="grey darken-4 card-img"
           contain
           alt="image not loaded"
            />
           
        </v-flex>
        <v-flex xs12 sm6 pa-0 ma-0>
        
          <SearchCard :Article="article" />

        </v-flex>
        <v-divider></v-divider>
      </v-layout>
    </v-container>
    <v-container v-if="news.length==0 && !loading" class="grey lighten-5 mb-6">
      <v-layout row mb-1>
        <v-flex>
          <v-card>
            <v-card-title>
              No result found with this criteria.
            </v-card-title>
          </v-card>
        </v-flex>
        </v-layout>
    </v-container>
    <v-container>
      <div class="text-center">
        <v-pagination
        v-if="news.length!=0"
          v-model="page"
          :length="paginationLen"
          :total-visible="6"
        ></v-pagination>
        
      </div>
    </v-container>
    </div>     
  </v-container>
</template>
<script>
import SearchCard from '@/components/Cards/SearchCard.vue'
import AdvancedSearch from '@/components/News/AdvancedSearch.vue'
import { mapGetters } from 'vuex'
export default {
  components:{SearchCard, AdvancedSearch},
  computed:{
    ...mapGetters(['paginationLen','loading','news']),
    page:{
      get(){
        return this.$store.getters.page
      },
      set(newVal){
        this.$store.commit('setPage',newVal)
      }
    }
    },

    watch:{
      page(newVal){
        this.$store.dispatch('setPage',{page:newVal})
        this.$store.dispatch('paginateData')
        
      }
    },
  data: () => ({
      alignments: [
        'start',
        'center',
        'end',
      ],
      search_value:'',
      fav: true,
      menu: false,
      message: false,
      hints: true
    }),
    methods:{
      show(){
        if(this.search_value!='')
        this.$store.dispatch('searchdata',this.search_value)
      }
      },
      created(){
          this.$store.dispatch('searchdata',this.$route.params.q)
      }
   }

</script>
<style scoped>
.parent-container{
  
  height: max-content;
}
.searchbox{
  width: 70%;
  margin: 0 auto;
}
.searchresult{
  width: 70%;
  margin: 0 auto;
}
@media screen and (max-width: 960px) {
  .searchbox{
  width: 80%;
}
.searchresult{
  width: 80%;
}
}
@media screen and (max-width: 600px) {
  .searchbox{
  width: 90%;
}
.searchresult{
  width: 90%;
}
}
.card-img{
  max-width: 100%;
  max-height:100%;
  min-width: 100%;
  min-height:100%;
}
</style>
