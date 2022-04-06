<template>
  <v-card
    class="mx-auto d-flex flex-column"
    height="100%"
    elevation="0"
    style="position: relative"
  >
    <v-card-text class="pt-0">
      <v-card-title class="pa-0 justify-start">
        <a :href="Article.url" target="_blank">
        {{ Article.title }}
        </a>
      </v-card-title>
      
      <div class="text--primary justify-start pa-1">
        {{Article.description}}
      </div>
    </v-card-text>
    <v-spacer></v-spacer>
      <div class="text--primary justify-start pl-4">{{new Date(Article.publishedAt).toDateString()}}</div>
  </v-card>
</template>

<script>
export default {
props:['Article'],
data: () => ({
      reveal: false,
      
    })
}
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  position: absolute;
  width: 100%;
}
a{
  text-decoration: none;
  color: black !important;
}
a:hover{
  text-decoration: underline;
  
}
</style>