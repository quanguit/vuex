import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import './assets/main.css';
import { auth } from './includes/firebase';
import VeeValidatePlugin from './includes/validation';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
  
    app.mount('#app');
  }
});
