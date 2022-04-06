<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      offset-y
      :min-width="$vuetify.breakpoint.xs ? 460 : 600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="handleReset('otherwise')"
        >
          Advanced Search
        </v-btn>
      </template>
      <v-card class="AdvancedSearch_Menu"
      :min-width="$vuetify.breakpoint.xs ? 460 : 600"
      
      >
        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
            <v-tab @click="formError=false,
            topHeadlineMessage='Search here in Top headline news'">
              Everything
            </v-tab>
            <v-tab @click="formError=false,everythingsMessage='Search here for all news'">Top Headlines</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
          <v-card-text :class="formError ? 'formError' : ''">{{everythingsMessage}}</v-card-text>
          <v-form @submit.prevent="handleSubmitEverythingForm">
             <v-layout row ma-2 pt-2 px-2>
              <v-flex>
                  <v-text-field
                  label="Exact Keyword"
                  dense
                  prepend-icon="mdi-keyboard-variant"
                  v-model="exactKeyword" />
              </v-flex>
          </v-layout>
          <v-layout row ma-2 px-2>
              <v-flex><v-select
              prepend-icon="mdi-web"
               :items="languageitems"
                label="Language"
                v-model="selectedLanguage">
            </v-select></v-flex>
          </v-layout>
          <v-layout row ma-2 px-2>
              <v-flex><v-select
              prepend-icon="mdi-flag-outline"
               :items="sortByitems"
                label="SortBy"
                v-model="sortBy">
            </v-select></v-flex>
          </v-layout>
          <v-layout row ma-2 px-2>
              <v-flex xs12 sm6>
                <v-menu
                 offset-y min-width="0"
                 v-model="fromDateMenu"
                 :close-on-content-click="false"
                 lazy
                 transition="scale-transition"
                 >
                    <template v-slot:activator="{ on }">
        
                    <v-text-field
                    v-on="on"
                      readonly
                     :value="FromDate"
                      label="From"
                      prepend-icon="mdi-calendar-range" />
                    </template>
                    <v-date-picker
                    v-model="FromDate"
                    @input="fromDateMenu = false"
                    no-title
                    locale="en-in"
                    ></v-date-picker>
                 </v-menu>
              </v-flex>
            <v-flex xs12 sm6>
                <v-menu offset-y min-width="0"
                 v-model="toDateMenu"
                 :close-on-content-click="false"
                 lazy
                 transition="scale-transition"
                >
                    <template v-slot:activator="{ on }">
                    <v-text-field
                    v-on="on"
                    :value="ToDate"
                    readonly
                     label="To" prepend-icon="mdi-calendar-range" />
                    </template>
                    <v-date-picker v-model="ToDate"
                    @input="toDateMenu = false"
                    no-title
                    locale="en-in"
                    ></v-date-picker>
                 </v-menu>
              </v-flex>
          </v-layout>
            <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn            
            text
            @click="handleReset('everything')"
          >
            Reset
          </v-btn>
          <v-btn
            color="primary"
            text
            type="submit">
            Search
          </v-btn>
        </v-card-actions>
        
            </v-form>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          color="basil"
          flat
        >
          <v-card-text :class="formError ? 'formError' : ''">{{topHeadlineMessage}}</v-card-text>
            <v-form @submit.prevent="handleSubmitTopHeadlineForm">
                   <v-layout row ma-2 pt-2 px-2>
              <v-flex>
                  <v-text-field
                  label="Exact Keyword"
                  dense
                  prepend-icon="mdi-keyboard-variant"
                  v-model="exactTopKeyword" />
              </v-flex>
          </v-layout>
              <v-layout row ma-2 px-2>
              <v-flex><v-select
              prepend-icon="mdi-newspaper"
               :items="Categories"
                label="Category"
                v-model="selectedCategory "/>
             </v-flex>
          </v-layout>
          <v-layout row ma-2 px-2>
              <v-flex><v-select
              prepend-icon="mdi-flag-outline"
               :items="countryitems"
                label="Country"
                v-model="selectedCountry" />
            </v-flex>
          </v-layout>
          <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn            
            text
            @click="handleReset('topHealine')"
          >
            Reset
          </v-btn>
          <v-btn
            color="primary"
            text
            type="submit">
            Search
          </v-btn>
        </v-card-actions>
              </v-form>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import { countryitems } from '@/assets/Country'
import { languageitems } from '@/assets/Language'
import { Categories } from '@/assets/Category'
export default {
    methods:{
        handleSubmitEverythingForm(){
          if(this.exactKeyword.trim()!='' || this.sortBy!='' ||
          this.selectedLanguage!='' || this.FromDate!='' || this.ToDate!=''){
            const params={
              q: this.exactKeyword,
              sortBy: this.sortBy,
              language: this.selectedLanguage,
              from: this.FromDate,
              to: this.ToDate
            }
            this.$store.dispatch('advancedsearchdata', {params : params, endpoint:"everything"})
            this.menu=!this.menu
          } 
          else{
            this.everythingsMessage='Select at least one search condition'
            this.formError=true
          }
        },
        handleSubmitTopHeadlineForm(){
          if(this.exactTopKeyword.trim()!='' || this.selectedCountry!='' ||
          this.selectedCategory!=''){
            const params={
              q: this.exactTopKeyword,
              category: this.selectedCategory,
              country: this.selectedCountry
            }
            this.$store.dispatch('advancedsearchdata', {params : params, endpoint:"topHeadline"})
            this.menu=!this.menu
          } else{
            this.topHeadlineMessage='Select at least one search condition'
            this.formError=true
          }
        },
        handleReset(formType='otherwise'){
          if(formType=='everything'){
            this.selectedLanguage=''
            this.exactKeyword=''
            this.sortBy=''
            this.FromDate='',
            this.ToDate='',
            this.everythingsMessage='Search here for all news',
            this.formError=false;
            }
          else if(formType=='topHealine'){
          this.exactTopKeyword='',
          this.selectedCategory='',
          this.selectedCountry='',
          this.topHeadlineMessage='Search here in Top headline news',
          this.formError=false;
          }
        else{
          this.formError=false;
        }
        }
    },
    data(){
        return{
      tab: null,
      FromDate:'',
      ToDate: '',
      menu: false,
      formError:false,
      selectedCountry:'',
      selectedCategory:'',
      selectedLanguage:'',
      exactKeyword:'',
      exactTopKeyword:'',
      sortBy:'',
      fromDateMenu:false,
      toDateMenu:false,
      topHeadlineMessage:'Search here in Top headline news',
      everythingsMessage:'Search here for all news',
      sortByitems:[{text: 'Relevancy', value:'relevancy'},
                  {text: 'Popularity', value:'popularity'},
                  {text: 'PublishedAt', value:'publishedAt'}],
      countryitems,
      Categories,
      languageitems
        }
    }
}
</script>

<style scoped>
.AdvancedSearch_Menu{
 
  width:811px
}

@media screen and (max-width: 1250px) {
.AdvancedSearch_Menu{
  width: 620px;
}
}
@media screen and (max-width: 800px) {
.AdvancedSearch_Menu{
  width: 611px;
}
}
@media screen and (max-width: 600px) {
  .AdvancedSearch_Menu{
  max-width: 280px;
  
  
}
}
.formError{
  color:red !important
}
</style>