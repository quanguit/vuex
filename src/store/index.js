/* eslint-disable max-len */
import { createStore } from 'vuex';
import { auth, usersCollection } from '@/includes/firebase';
import { Howl } from 'howler';
import helper from '@/includes/helper';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgess: '0%',
  },
  // mutations are change the state, must be synchronous
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
    playSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
      state.playerProgess = `${(state.sound.seek() / state.sound.duration()) * 100}%`;
    },
  },
  // === computed()
  getters: {
    // getAuthModalShow: (state) => state.authModalShow,
    // change icon when play or pause music
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
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
    async playSong({ commit, state, dispatch }, payload) {
      // reload song, avoid duplicate song when click 2 times
      if (state.sound instanceof Howl) {
        state.sound.unload();
      }

      commit('playSong', payload);

      state.sound.play();

      // update position in duration
      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      commit('updatePosition');

      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
    updateSeek({ state, dispatch }, payload) {
      if (state.sound.playing) {
        return;
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect();
      // Document = 2000, Timeline = 1000, Click = 500, Distance = 500
      const clickX = payload.clientX - x;
      const percentage = clickX / width;
      const seconds = state.sound.duration() * percentage;

      state.sound.seek(seconds);

      state.sound.once('seek', () => {
        dispatch('progress');
      });
    },
  },
  modules: {
  },
});
