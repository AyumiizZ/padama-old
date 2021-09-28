<template>
    <div>
        <v-btn @click="test">test</v-btn>
        <v-btn @click="handleImage">handleImage</v-btn>
        <v-btn @click="logimage">img</v-btn>
        <v-btn @click="upload">upload</v-btn>
        <v-file-input
            v-model="preVDO"
            counter
            label="Preoperative Video"
            multiple
            placeholder="Select your files"
            prepend-icon="mdi-video-plus"
            outlined
            :show-size="1000"
        />
        <img :src="image" />
    </div>
</template>

<script>
import DatabaseService from "@/services/DatabaseService";
export default {
  data() {
    return {
      preVDO: [],
      image: ""
    };
  },
  methods: {
      test() {
          console.log(this.preVDO)
      },
      logimage() {
          console.log(this.image)
      },
      handleImage(){
        this.createBase64Image(this.preVDO[0]);
      },
      createBase64Image(fileObject){
          const reader = new FileReader();
          reader.onload = (e) =>{
              this.image = e.target.result;
          }
          reader.readAsDataURL(fileObject);
      },
      async upload() {
      try {
        const response = await DatabaseService.upload({
          image: this.image
        });
        // this.error = "";
        // this.$store.dispatch("setToken", response.data.token);
        // this.$store.dispatch("setUser", response.data.user);
        console.log('ret link')
        console.log(response.data.url)
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  }
}
</script>