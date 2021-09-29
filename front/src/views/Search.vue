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
            :to="{ name: 'Patient', params: { _id: row.item.regisID } }"
          >
            <tr @click="navigate">
              <td>{{ row.item.regisID }}</td>
              <td>{{ row.item.firstname }}</td>
              <td>{{ row.item.lastname }}</td>
              <td>{{ row.item.sex }}</td>
              <td>{{ calAge(row.item.birthDate) }}</td>
              <td>{{row.item.ud}}</td>
              <td>{{ row.item.smoking }}</td>
              <!-- <td>
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
                      <strong>Underlying Disease: </strong>
                      {{row.item.ud}}
                    </li>
                    <li>
                      <strong>Smoking: </strong>
                      {{ row.item.smoking }}
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
              </td> -->
            </tr>
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import DatabaseService from "@/services/DatabaseService";
import AddPatientDialog from '../components/AddPatientDialog.vue';
export default {
  components: {AddPatientDialog},
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
          value: "regisID",
        },
        {
          text: "First Name",
          value: "firstname",
        },
        {
          text: "Last Name",
          value: "lastname",
        },
        // {
        //   text: "Birth Date",
        //   value: "birthDate",
        // },
        {
          text: "Sex",
          value: "sex",
        },
        {
          text: "Age",
          value: "age",
        },
        {
          text: "Underlying Disease",
          value: "ud",
        },
        {
          text: "Smoke",
          value: "smoke",
        },
        // { text: "", align:"center", value: "attach" },
      ],
      queryResults: [],
      EnableDialog: false,
      DisbaleDialog: false,
      adminMode: false,
      // queryResults: [
      //   {
      //     _id: "1234567890",
      //     first: "Harry",
      //     last: "Potter",
      //     age: "112",
      //   },
      // ],
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
    calAge: function(birthDateString) {
      var today = new Date()
      var birthDate = new Date(birthDateString)
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      return age;
    }
  },
  async mounted() {
    // call backend to req data
    console.log(this.queryResults);
    this.queryResults = await DatabaseService.getAllPatient();
    console.log(this.queryResults);
  },

};
</script>
