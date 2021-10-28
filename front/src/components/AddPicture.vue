<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          fab
          dark
          color="blue lighten-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Patient Form
        </v-card-title>
        <v-file-input
          v-model="photo"
          counter
          label="Photo"
          multiple
          placeholder="Select your files"
          prepend-icon="mdi-image-plus"
          outlined
          :show-size="1000"
          ><template v-slot:selection="{ text }">
            <v-chip color="deep-purple accent-4" dark label small>
              {{ text }}
            </v-chip>
          </template>
        </v-file-input>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red lighten-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="handleImage"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-btn @click="test">test</v-btn>
        <v-btn @click="handleImage">handleImage</v-btn>
        <v-btn @click="logimage">img</v-btn>
        <v-btn @click="upload">upload</v-btn>

        <img :src="image" /> -->
  </div>
</template>

<script>
import DatabaseService from "@/services/DatabaseService";
export default {
  data() {
    return {
      photo: [],
      image: "",
      error: "",
      dialog: false,
    };
  },
  methods: {
    test() {
      console.log(this.photo);
    },
    logimage() {
      console.log(this.image);
    },
    async handleImage() {
      var that = this;
      for (let i = 0; i < this.photo.length; i++) {
        await this.createBase64Image(this.photo[i]).then(function(){
          that.upload();
        });
      }
      this.dialog = false;
    },
    async createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },
    async upload() {
      try {
        const response = await DatabaseService.upload({
          image: this.image,
          real_filename: this.image.name,
        });
        console.log("ret link");
        console.log(response.data.url);
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  },
};
</script>
