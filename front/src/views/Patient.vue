<template>
  <div>
    <v-card>
      <h1> {{pid}} {{name}} </h1>
      <!-- <h1>{{patientInfo.patientID}} {{patientInfo.firstname}} {{patientInfo.lastname}}</h1> -->
      <!-- <h1 ref="header"> test</h1> -->
      <!-- <h2>{{patientInfo.birthDate}} {{patientInfo.sex}}</h2>
      <h2>{{patientInfo.ud}} {{patientInfo.smoking}}</h2> -->
      <v-list-item>
        <v-row>
          <v-col>
            <v-text-field
              v-model="caseID"
              label="Case No."
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
                      readonly
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
                      readonly
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
      <v-card-title>
        Queries History
        <v-spacer></v-spacer>
        <add-patient-data-dialog></add-patient-data-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="queryResults"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item.visitDate }}</td>
            <td>{{ row.item.id }}</td>
            <td>{{row.item.diagnosis}}</td>
            <td>{{row.item.type}}</td>
            <!-- <td>{{ patientResults.first }}</td>
            <td>{{ patientResults.last }}</td> -->
            <td>{{ patientResults.age }}</td>
            <td>
              <router-link
                :to="{ name: 'PDF', params: { _id: patientResults._id } }"
              >
                <v-btn>Show PDF</v-btn>
              </router-link>
              <router-link
                :to="{ name: 'VDO', params: { _id: patientResults._id } }"
              >
                <v-btn>Show Video</v-btn>
              </router-link>
              <router-link
                :to="{ name: 'Pic', params: { _id: patientResults._id } }"
              >
                <v-btn>Show Picture</v-btn>
              </router-link>
              <v-dialog v-model="row.item.dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    More Info
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="text-h5 grey lighten-2">
                    Info
                  </v-card-title>

                  <v-card-text>
                    <li>
                      <strong>Diagnosis: </strong>
                      {{ parseDiag(row.item.diagnosis) }}
                    </li>
                    <li>
                      asdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddddddasddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    </li>
                    <li>
                      {{ row.item.visitDate }}
                    </li>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="row.item.dialog = false"
                    >
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
import DatabaseService from "@/services/DatabaseService";
import AddPatientDataDialog from "../components/AddPatientDataDialog.vue";
export default {
  components: { AddPatientDataDialog},
  // components: { VideoPlayer },
  data() {
    return {
      pid: null,
      name: 'testt',
      patientInfo: null,
      expanded: [],
      singleExpand: false,
      caseID: null,
      dialog: false,
      dialog2: false,
      RegistrationNo: null,
      date: new Date(),
      range: null,
      masks: {
        input: "YYYY-MM-DD h:mm A",
      },
      headers: [
        {
          text: "Visited Date",
          value: "aaa",
        },
        {
          text: "Case No.",
          value: "id",
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
        { text: "", value: "attach" },
      ],
      patientResults: {
        _id: this.$route.params._id,
        first: "Harry",
        last: "Potter",
        age: "112",
      },
      queryResults: [],
      diagnosisItems: [
        "Unspecified",
        "Cleft palate",
        "Cleft hard and soft palate with cleft lip",
        "Cleft soft palate",
        "Cleft lip",
        "Cleft hard palate",
      ],
    };
  },
  methods: {
    queryRange: function () {
      console.log("query");
    },
    calAge: function (birthDateString) {
      var today = new Date();
      var birthDate = new Date(birthDateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    parseDiag: function(diag){
      // var diagnosisItems = [
      //   "Unspecified",
      //   "Cleft palate",
      //   "Cleft hard and soft palate with cleft lip",
      //   "Cleft soft palate",
      //   "Cleft lip",
      //   "Cleft hard palate",
      // ]
        var ret = [];
      for (let i = 0; i < diag.length; i++) {
        ret.push(this.diagnosisItems[diag[i]]);
      }
      return ret.sort();
    },
  },
  async mounted() {
    this.queryResults = await DatabaseService.getCase({_id: this.$route.params._id})
    console.log(this.queryResults);
    var that = this
    this.patientInfo = await DatabaseService.getPatient({_id: this.$route.params._id}).then(function(data) {
      that.name = 'google'
      that.pid = data[0].patientID
      return data
    })
    console.log(this.name)
    console.log(this.patientInfo)
    this.queryResults.dialog = false;

  },
};
</script>
