<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="uploadRef" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <composition-item v-for="(song, i) in songs" :key="song.docID" 
            :song="song"
            :updateSong="updateSong"
            :index="i"
            :removeSong="removeSong"
            :updateUnsavedFlag="updateUnsavedFlag" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import AppUpload from '@/components/Upload.vue';
import { auth, songsCollection } from '@/includes/firebase';
import CompositionItem from '@/components/CompositionItem.vue';

export default {
  name: 'ManagePage',
  data() {
    return {
      songs: [],
      unsavedFlag: false,
    };
  },
  components: {
    AppUpload,
    CompositionItem,
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
    snapshot.forEach(this.addSong);
    // snapshot.forEach((ss) => this.addSong(ss));
  },
  methods: {
    // all methods handle in UI
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre;
    }, 
    removeSong(i) {
      this.songs.splice(i, 1);
    },
    addSong(document) {
      // update list songs immediately when add songs
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-restricted-globals
      const leave = confirm('You have unsaved changes. Are you sure you want or leave?');
      next(leave);
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   beforeRouteLeave will run before beforeUnmount run in Upload component 
  //   => handle stop upload when navigate
  //   refs(reference) access DOM elements directly, not show in Vue Instance (vue developer tool)
  //   this.$refs.uploadRef.cancelUploads();
  //   next();
  // },
  // chay cai nay day dc nhung move qua router
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.userLoggedIn) {
  //     next();
  //   } else {
  //     next({ name: 'home' });
  //   }
  // },
};
</script>
