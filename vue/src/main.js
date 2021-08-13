import Vue from 'vue';
import App from './App.vue';
import VueCompositionAPI from '@vue/composition-api';
import vuetify from './plugins/vuetify';
import router from '../src/router/routes';
import '@babel/polyfill';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount('#app');
