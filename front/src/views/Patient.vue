<template>
  <div>
    <v-card>
      <patient-header v-bind:pid="this.$route.params._id"></patient-header>
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
        <router-link
          :to="{
            name: 'addCase',
            params: {
              _id: patientResults._id,
              firstname: patientResults.firstname,
              lastname: patientResults.lastname,
            },
          }"
          ><v-btn>Add Case</v-btn>
        </router-link>
        <!-- <add-patient-data-dialog></add-patient-data-dialog> -->
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="queryResults"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ parseDate(row.item.visitDate) }}</td>
            <td>{{ row.item.id }}</td>
            <td>
              <v-chip
                v-for="item in parseDiag(row.item.diagnosis)"
                :key="item.index"
              >
                {{ item }}
              </v-chip>
            </td>
            <td>{{ row.item.type }}</td>
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
// import AddPatientDataDialog from "../components/AddPatientDataDialog.vue";
import PatientHeader from "../components/patientHeader.vue";
export default {
  name: "patient",
  components: { PatientHeader },
  // components: { VideoPlayer },
  data() {
    return {
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
    parseDiag: function (diag) {
      var ret = [];
      var diagList = diag.split(",");
      for (let i = 0; i < diagList.length; i++) {
        if(this.diagnosisItems[diagList[i]] != undefined){
        ret.push(this.diagnosisItems[diagList[i]]);}
      }
      return ret.sort();
    },
    parseDate(date) {
      var dmy = date.split("T")[0];
      var time = date.split("T")[1].split(".")[0];

      return dmy + " " + time;
    },
  },
  async mounted() {
    this.queryResults = await DatabaseService.getCase({
      _id: this.$route.params._id,
    });
    // await DatabaseService.getPatient({_id: this.pid}).then(function(data) {
    //         that.firstname = data[0].firstname
    //         that.lastname = data[0].lastname
    //         that.sex = data[0].sex
    //         that.ud = data[0].ud
    //         that.smoking = data[0].smoking
    //     })
    console.log(this.queryResults);
    this.queryResults.dialog = false;
  },
};
</script>
