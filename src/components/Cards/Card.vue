<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      max-height="200px"
      :src="Article.urlToImage"
      alt=""
    >
    </v-img>
    <v-card-title>{{ Article.title.substring(0,70)+'...' }}</v-card-title>
  
    <v-card-text class="text--primary">
      {{Article.content.substring(0,200)+'...'}}
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
        :href="Article.url"
         target="_blank"
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>  
</template>
<script>
export default {
    props:['Article']

}
</script>

<style>

</style>