<template>
  <div>
    <v-card> aaa </v-card>
    <v-card>
      <v-card-title>
        Picture List
        <v-spacer></v-spacer>
        <AddPicture></AddPicture>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="queryResults"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:item="row">
          <tr @click="showPicture(row.item)">
            <td>{{ row.item.filename }}</td>
            <td>{{ row.item.tag }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ pictureInfo.filename }}
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="dialog = false"> x </v-btn>
        </v-card-title>

        <v-card-text>
          <v-img :src="pictureInfo.location" max-height="600">
            
          </v-img>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import DatabaseService from "@/services/DatabaseService";
import AddPicture from '@/components/AddPicture'
export default {
  components: {AddPicture},
  data() {
    return {
      headers: [
        { text: "filename", align: "start", value: "filename" },
        { text: "tag", align: "start", value: "tag" },
      ],
      queryResults: [],
      dialog: false,
      pictureInfo: {
        filename: "",
        location: "",
      },
      fileLocation: "",
    };
  },
  methods: {
    showPicture(data) {
      console.log(data);
      this.fileLocation = data.location;
      this.pictureInfo = {
        filename: data.filename,
        location: 'http://localhost:8081' + data.location,
      };
      this.dialog = true;
    },
  },
  async mounted() {
    // call backend to req data
    var tempQueryResults = await DatabaseService.getPhotoList();
    console.log(tempQueryResults);
    for (var key in tempQueryResults) {
      console.log(tempQueryResults[key]);
      var parsedData = {
        filename: tempQueryResults[key]["fileID"],
        tag: "Pre",
        location: tempQueryResults[key]["fileLocation"],
      };
      this.queryResults.push(parsedData);
    }
    // for (var key in tempQueryResults) {
    //   console.log("----");
    //   console.log(tempQueryResults[key]["patientID"]);
    //   console.log(this.patientResults._id);
    //   console.log("----");
    //   if (tempQueryResults[key]["patientID"] === this.patientResults._id) {
    //     this.queryResults.push(tempQueryResults[key]);
    //   } else {
    //     console.log("aaa");
    //   }
    // }
    // console.log(this.queryResults);
    // this.queryResults.dialog = false;
  },
};
</script>
