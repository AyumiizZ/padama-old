<template>
  <div>
    <v-card>
      <v-list-item>
        <v-row>
          <v-col>
            <v-text-field
              v-model="RegistrationNo"
              label="Registration No."
              outlined
              clearable
            />
          </v-col>
          <v-col cols="auto">
            <vc-date-picker
              v-model="range"
              mode="dateTime"
              :masks="masks"
              is-range
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-row>
                  <v-col cols="auto">
                    <v-text-field
                      label="From"
                      :value="inputValue.start"
                      v-on="inputEvents.start"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="auto">
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-col>
                  <v-col cols="auto">
                    <v-text-field
                      label="To"
                      :value="inputValue.end"
                      v-on="inputEvents.end"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </template>
            </vc-date-picker>
          </v-col>
          <v-col cols="auto">
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-filter</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn icon>
              <v-icon color="grey lighten-1" @click="queryRange"
                >mdi-magnify</v-icon
              >
            </v-btn>
          </v-col>
          <v-col> </v-col>
        </v-row>
      </v-list-item>
    </v-card>
    <v-card>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">
            Queries History
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-data-table
        :headers="headers"
        :items="queryResults"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item._id }}</td>
            <td>{{ row.item.first }}</td>
            <td>{{ row.item.last }}</td>
            <td>{{ row.item.age }}</td>
            <td>
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                    Click Me
                  </v-btn>
                </template>

                <v-card>
                  <video-player :options="videoOptions"></video-player>
                  <v-card-title class="text-h5 grey lighten-2">
                    Vedio List
                  </v-card-title>

                  <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </v-card-text>
                  <v-list dense>
                    <v-subheader>REPORTS</v-subheader>
                    <v-list-item-group color="primary">
                      <v-list-item v-for="(it, i) in row.item.vdo" :key="i">
                        <v-list-item-icon>
                          <v-icon>mdi-video</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="it"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">
                      I accept
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer.vue";
import "video.js/dist/video-js.css";
export default {
  components: { VideoPlayer },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: true,
        responsive: true,
        breakpoints: {
  tiny: 300,
  xsmall: 400,
  small: 500,
  medium: 600,
  large: 700,
  xlarge: 800,
  huge: 900
},
        sources: [
          {
            src: "http://localhost:8081/static/video.mp4",
            // src: "//home/ayumiizz/med/padama/front/dist/vdo/video.mp4",
            type: "video/mp4",
          },
        ],
      },
      dialog: false,
      RegistrationNo: null,
      date: new Date(),
      range: null,
      masks: {
        input: "YYYY-MM-DD h:mm A",
      },
      headers: [
        {
          text: "Registration No.",
          value: "_id",
        },
        {
          text: "First Name",
          value: "first",
        },
        {
          text: "Last Name",
          value: "last",
        },
        {
          text: "Age",
          value: "age",
        },
      ],
      queryResults: [
        {
          _id: "1234567890",
          first: "Harry",
          last: "Potter",
          age: "112",
          vdo: [
            {
              filename: "abc.mp4",
              label: "Lorem ipstum",
              created: "21 June 2021",
            },
            {
              filename: "010203.mp4",
              label: "Lorem ipstum",
              created: "21 June 2021",
            },
            {
              filename: "qwery.mp4",
              label: "Lorem ipstum",
              created: "21 June 2021",
            },
            {
              filename: "important.mp4",
              label: "Lorem ipstum",
              created: "21 June 2021",
            },
          ],
          photo: [
            {
              filename: "abc.mp4",
              label: "Lorem ipstum",
              created: "21 June 2021",
            },
            {
              filename: "010203.mp4",
              label: "Lorem ipstum",
              created: "21 June 2021",
            },
            {
              filename: "qwery.mp4",
              label: "Lorem ipstum",
              created: "21 June 2021",
            },
            {
              filename: "important.mp4",
              label: "Lorem ipstum",
              created: "21 June 2021",
            },
          ],
        },
      ],
    };
  },
  methods: {
    queryRange: function () {
      console.log("query");
    },
  },
};
</script>
