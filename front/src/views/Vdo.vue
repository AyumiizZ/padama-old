<template>
  <v-row>
    <v-col cols="8">
      <video-player :options="videoOptions" ref="videoframe"></video-player>
    </v-col>
    <v-col cols="4">
      <v-row> <v-btn @click="changeSource(0)"> dbdl</v-btn> </v-row>
      <v-row> <v-btn @click="changeSource(1)"> farcry</v-btn> </v-row>
      <v-row>
        <v-file-input
          v-model="preVDO"
          counter
          label="Preoperative Video"
          multiple
          placeholder="Select your files"
          prepend-icon="mdi-video-plus"
          outlined
          :show-size="1000"
        >
          <template v-slot:selection="{ text }">
            <v-chip color="deep-purple accent-4" dark label small>
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
        <v-btn @click="upload(preVDO)"> Upload</v-btn> 
        </v-row
      >
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
        sources: null,
      },
      preVDO: []
    };
  },
  methods: {
    changeSource: function (index) {
      this.$refs.videoframe.player.src(this.all_sources[index]);
      this.$refs.videoframe.player.load();
    },
    upload: function(inp) {
      inp.forEach(element => {
        console.log(element)
      });
    }
  },
  mounted: function () {
    this.$refs.videoframe.player.src(this.all_sources[0]);
    this.$refs.videoframe.player.load();
  },
};
</script>
