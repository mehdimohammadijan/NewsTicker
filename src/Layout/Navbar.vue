<template>
<div>
<v-navigation-drawer app fixed temporary v-model="drawer">
  <v-toolbar color="blue darken-4" dark flat>
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    <router-link tag="span" to="/" style="cursor: pointer">
          <div class="title pl-3"><span class="font-weight-light">MMH</span>
          <span class="font-weight-bold">NEWS</span></div>
    </router-link>
  </v-toolbar>
  <v-divider></v-divider>
        <v-list >
          <v-list-item ripple v-for="(item,index) in MainMenu" :key="index" 
          :to="{ name: 'Categories', params : {cat : item.Name}}"
          >
            <v-list-item-action>
              <v-icon>mdi-newspaper</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.Name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
  <v-toolbar text dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
      <!--<v-toolbar-title class="text-uppercase white--text"
      :to="{ name: 'Home'}"      >-->
      <router-link tag="span" to="/" style="cursor: pointer">
          <span class="font-weight-light">MMH</span>
          <span class="font-weight-bold">NEWS</span>
      </router-link>
     <!-- </v-toolbar-title> -->
      
      <v-toolbar-items class="hidden-sm-and-down ml-4">
            
              <v-btn v-for="(item,index) in MainMenu" :key="index"
            :to="{ name: 'Categories', params : {cat : item.Name}}">
              {{item.Name}}
              </v-btn>
        
          
      </v-toolbar-items>
      <v-spacer></v-spacer>
      
     <v-text-field
     v-if="this.$route.name!='Search'"
     @focus="searchClose=false"
     @blur="searchClose=true"
        placeholder="Search"
        v-model="search"
        filled
        prepend-inner-icon="mdi-magnify"
        class="mt-5"
        :class="{'mobile' : searchClose && !search}"
        dense
        clearable
        v-on:keyup.enter="onEnter"
      ></v-text-field>
      
      
  </v-toolbar>
</div>
</template>

<script>

export default {
  methods:{
    onEnter() {
       this.$router.push({ name: 'Search', params: { q: this.search } })
    }
  },
    data(){
        return{
            MainMenu:[{Name:'General',URL:'/general'},
            {Name:'Business',URL:'/business'},
            {Name:'Entertainment',URL:'/entertainment'},
            {Name:'Health',URL:'/health'},
            {Name:'Science',URL:'/science'},
            {Name:'Sports',URL:'/sports'},
            {Name:'Technology',URL:'/technology'}],
            drawer:false,
            searchClose:true,
            search:''
        }
    }
}
</script>

<style>
.mobile {max-width: 45px !important;
transition: 0.3s;
background: transparent !important;
  }
.v-input__slot{
    cursor: pointer !important;
    background: transparent !important;
}
.v-btn a{
  color: white !important;
  text-decoration: none;
}
.v-btn--active{
  background-color: lightslategray;
}
</style>