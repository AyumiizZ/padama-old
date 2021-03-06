<template>
  <div>
    <v-card>
      <v-list-item>
        <v-row>
          <v-combobox
            v-model="diagnosisModel"
            :items="diagnosisItems"
            :search-input.sync="diagnosisSearch"
            hide-selected
            hint="Maximum of 5 tags"
            label="Diagnosis"
            multiple
            persistent-hint
            small-chips
            close
            outlined
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    No results matching "<strong>{{ diagnosisSearch }}</strong
                    >". Press <kbd>enter</kbd> to create a new one
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-combobox>
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
              <v-icon color="grey lighten-1" @click="queryPatient"
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
        <v-dialog v-model="EnableDialog" width="500" v-if="!adminMode">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              fab
              dark
              color="blue lighten-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark> mdi-account-cog </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Enable admin mode
            </v-card-title>

            <v-card-text>
              After turn on admin mode you can
              <li>Edit user data</li>
              <li>Permanent deleted user data</li>
              Once you delete a user, there is no going back. Please be certain.
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="primary" text @click="EnableDialog = false">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="red lighten-1"
                text
                @click="
                  EnableDialog = false;
                  adminMode = true;
                "
              >
                Enable
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="DisbaleDialog" width="500" v-if="adminMode">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-2"
              fab
              dark
              color="red lighten-2"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon dark> mdi-cancel </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Disable admin mode
            </v-card-title>

            <v-card-text>
              After turn off admin mode you can not
              <li>Edit user data</li>
              <li>Permanent deleted user data</li>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn color="red lighten-1" text @click="DisbaleDialog = false">
                Cancel
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color=" primary"
                text
                @click="
                  DisbaleDialog = false;
                  adminMode = false;
                "
              >
                Disable
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <add-patient-dialog />
      </v-card-title>

      <v-divider></v-divider>
      <v-data-table
        :headers="headers"
        :items="queryResults"
        multi-sort
        class="elevation-1"
      >
        <template v-slot:item="row">
          <router-link
            custom
            v-slot="{ navigate }"
            :to="{ name: 'Patient', params: { _id: row.item.patientID } }"
          >
            <tr @click="navigate">
              <td>{{ row.item.patientID }}</td>
              <td>{{ row.item.firstname }}</td>
              <td>{{ row.item.lastname }}</td>
              <td>{{ row.item.id }}</td>
              <!-- <td>{{ parseDiag(row.item.diagnosis) }}</td> -->
              <td >
                <!-- {{ parseDiag(row.item.diagnosis) }} -->
                <v-chip
                  v-for="item in parseDiag(row.item.diagnosis)"
                  :key="item.index"
                >
                  {{ item }}
                </v-chip>
              </td>
              <td>{{ parseDate(row.item.visitDate) }}</td>
              <td>{{ parseDate(row.item.operativeDate) }}</td>
            </tr>
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import DatabaseService from "@/services/DatabaseService";
import AddPatientDialog from "../components/AddPatientDialog.vue";
export default {
  components: { AddPatientDialog },
  data() {
    return {
      RegistrationNo: null,
      date: new Date(),
      range: null,
      masks: {
        input: "YYYY-MM-DD h:mm A",
      },
      headers: [
        {
          text: "Registration No.",
          value: "patientID",
        },
        {
          text: "First Name",
          value: "firstname",
        },
        {
          text: "Last Name",
          value: "lastname",
        },
        {
          text: "Case ID",
          value: "id",
        },

        {
          text: "Diagnosis",
          value: "diagnosis",
        },
        {
          text: "Visited Date",
          value: "visitDate",
        },
        {
          text: "Operative Date",
          value: "operativeDate",
        },
      ],
      queryResults: [],
      EnableDialog: false,
      DisbaleDialog: false,
      adminMode: false,
      diagnosisItems: [
        "Unspecified",
        "Cleft palate",
        "Cleft hard and soft palate with cleft lip",
        "Cleft soft palate",
        "Cleft lip",
        "Cleft hard palate",
      ],
      diagnosisModel: [],
      diagnosisSearch: null,
    };
  },
  methods: {
    queryRange: function () {
      console.log("query");
    },
    enableAdminMode: function (bool) {
      this.adminMode = bool;
      this.dialog = false;
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
    queryPatient: async function () {
      console.log(this.parseDiag2(this.diagnosisModel));
      this.queryResults = await DatabaseService.queryCase({
        taglist: this.parseDiag2(this.diagnosisModel),
      });
      console.log(this.queryResults);
    },
    parseDiag: function (diag) {
      var ret = [];
      if(diag === null){
        diag = ""
      }
      var diagList = diag.split(",");
      for (let i = 0; i < diagList.length; i++) {
        if(this.diagnosisItems[diagList[i]] != undefined){
        ret.push(this.diagnosisItems[diagList[i]]);}
      }
      return ret.sort();
    },
    parseDiag2(diag) {
      var ret = [];
      for (let i = 0; i < diag.length; i++) {
        ret.push(this.diagnosisItems.indexOf(diag[i]));
      }
      return ret.sort();
    },
    parseDate(date){
      if (date === null){
        return 'N/A'
      }
      var dmy = date.split('T')[0]
      var time = date.split('T')[1].split('.')[0]
      
      return dmy + ' ' + time
    }
  },
  async mounted() {
    // call backend to req data
    console.log(this.queryResults);
    this.queryResults = await DatabaseService.getCaseList();
    console.log("1234");
    console.log(this.queryResults);
  },
};
</script>
