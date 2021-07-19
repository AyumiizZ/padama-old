<template>
  <v-row>
    <v-col cols="8">
      <video-player :options="videoOptions" ref="videoframe"></video-player>
    </v-col>
    <v-col cols="4">
      <v-row> <v-btn @click="changeSource(0)"> dbdl</v-btn> </v-row>
      <v-row> <v-btn @click="changeSource(1)"> farcry</v-btn> </v-row>
      <v-row> aaa </v-row>
    </v-col>
  </v-row>
</template>

<script>
import StaticService from "@/services/StaticService";
import VideoPlayer from "@/components/VideoPlayer.vue";
import "video.js/dist/video-js.css";
export default {
  components: { VideoPlayer },
  data() {
    return {
      all_sources: StaticService.getVDO(this.$route.params._id),
      videoOptions: {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: null
      },
    };
  },
  methods: {
    changeSource: function (index) {
      this.$refs.videoframe.player.src(this.all_sources[index]);
      this.$refs.videoframe.player.load();
    },
  },
  mounted: function (){
    this.$refs.videoframe.player.src(this.all_sources[0]);
    this.$refs.videoframe.player.load();
  },
};
</script>
