/* eslint-disable max-len */
import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  // mutations are change the state, must be synchronous
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  // === computed()
  getters: {
    // getAuthModalShow: (state) => state.authModalShow,
  },
  // actions are perfom business logic and commit multiple mutations, asynchronous tasks
  actions: {
    async register(ctx, payload) {
      const { commit } = ctx;
      const userCredential = await auth.createUserWithEmailAndPassword(payload.email, payload.password);

      await usersCollection.doc(userCredential.user.uid).set({
        name: payload.name,
        email: payload.email,
        age: payload.age,
        country: payload.country,
      });

      // don't save in firebase, only update
      await userCredential.user.updateProfile({
        displayName: payload.name,
      });

      // in this store can't access key "this", so use "ctx" => this.$store.commit('toggleAuth')
      commit('toggleAuth');
    },
    async login(ctx, payload) {
      const { commit } = ctx;
      await auth.signInWithEmailAndPassword(payload.email, payload.password);
      commit('toggleAuth');
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    async logout({ commit }) {
      await auth.signOut();
      commit('toggleAuth');

      // if (payload.route.meta.requiresAuth) {
      //   payload.router.push({ name: 'home' });
      // }
    },
  },
  modules: {
  },
});
