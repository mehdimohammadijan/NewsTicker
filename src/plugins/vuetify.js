import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/src/styles/main.sass'


Vue.use(Vuetify)

const vuetify = new Vuetify({
   
    icons: {
        iconfont: 'mdi', // default - only for display purposes
      },
  })
export default vuetify