<template>
  <div>
    <v-dialog v-model="addPatientDialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          fab
          dark
          color="blue lighten-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon dark> mdi-account-plus </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Patient Form
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="patientID"
            :error-messages="regisIDErrors"
            :counter="10"
            label="Registration Number"
            outlined
            required
            @input="$v.patientID.$touch()"
            @blur="$v.patientID.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model="firstname"
            :error-messages="firstnameErrors"
            :counter="40"
            label="Firstname"
            outlined
            required
            @input="$v.firstname.$touch()"
            @blur="$v.firstname.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model="lastname"
            :error-messages="lastnameErrors"
            :counter="40"
            label="Lastname"
            outlined
            required
            @input="$v.lastname.$touch()"
            @blur="$v.lastname.$touch()"
          >
          </v-text-field>
          <vc-date-picker v-model="birthDate">
            <template v-slot="{ inputValue, inputEvents }">
              <v-text-field
                readonly
                :error-messages="birthDateErrors"
                label="Birth Date"
                :value="inputValue"
                v-on="inputEvents"
                outlined
                required
                @input="$v.birthDate.$touch()"
                @blur="$v.birthDate.$touch()"
              ></v-text-field>
            </template>
          </vc-date-picker>
          <v-radio-group v-model="sex" row>
            <template v-slot:label>
              <div>Sex</div>
            </template>
            <v-radio value="m">
              <template v-slot:label>
                <div>Male</div>
              </template>
            </v-radio>
            <v-radio value="f">
              <template v-slot:label>
                <div>Female</div>
              </template>
            </v-radio>
            <v-radio value="o">
              <template v-slot:label>
                <div>Rather not say</div>
              </template>
            </v-radio>
          </v-radio-group>
          <div>
            <p>Underlying disease</p>
            <v-row>
              <v-col>
                <v-checkbox
                  v-model="selected"
                  label="DM"
                  value="DM"
                ></v-checkbox>
              </v-col>
              <v-col>
                <v-checkbox
                  v-model="selected"
                  label="HT"
                  value="HT"
                ></v-checkbox> </v-col
              ><v-col>
                <v-checkbox
                  v-model="selected"
                  label="DLP"
                  value="DLP"
                ></v-checkbox> </v-col
              ><v-col>
                <v-checkbox
                  v-model="selected"
                  label="CKD"
                  value="CKD"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="1">
                <v-checkbox v-model="enabled" hide-details></v-checkbox>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="others"
                  :disabled="!enabled"
                  label="Others"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
          <v-radio-group v-model="smoking" row>
            <template v-slot:label>
              <div>Smoking</div>
            </template>
            <v-radio value="y">
              <template v-slot:label>
                <div>Yes</div>
              </template>
            </v-radio>
            <v-radio value="n">
              <template v-slot:label>
                <div>No</div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="red lighten-1" text @click="addPatientDialog = false">
            Cancel
          </v-btn>
          <v-spacer></v-spacer
          ><v-btn color="black lighten-1" text @click="clear()"> Clear </v-btn
          ><v-spacer></v-spacer>
          <v-btn color=" primary" text @click="submit()"> Add user </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="patientAddedDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> Status </v-card-title>

        <v-card-text> Patient Added </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="patientAddedDialog = false">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";
import DatabaseService from "@/services/DatabaseService";
export default {
  mixins: [validationMixin],
  validations: {
    patientID: { required, minLength: minLength(10), maxLength: maxLength(10) },
    firstname: { required },
    lastname: { required },
    birthDate: { required },
  },
  data() {
    return {
      addPatientDialog: false,
      patientAddedDialog: false,
      patientID: null,
      firstname: null,
      lastname: null,
      birthDate: null,
      sex: null,
      smoking: null,
      enabled: false,
      selected: [],
      others: null
      // regisIDRules: [(v) => v.length <= 10 || "10 Digits only"],
    };
  },
  computed: {
    regisIDErrors() {
      const errors = [];
      if (!this.$v.patientID.$dirty) return errors;
      !this.$v.patientID.maxLength && errors.push("10 Digits only");
      !this.$v.patientID.minLength && errors.push("10 Digits only");
      !this.$v.patientID.required && errors.push("ID is required.");
      return errors;
    },
    firstnameErrors() {
      const errors = [];
      if (!this.$v.firstname.$dirty) return errors;
      !this.$v.firstname.required && errors.push("This is required");
      return errors;
    },
    lastnameErrors() {
      const errors = [];
      if (!this.$v.lastname.$dirty) return errors;
      !this.$v.lastname.required && errors.push("This is required");
      return errors;
    },
    birthDateErrors() {
      const errors = [];
      if (!this.$v.birthDate.$dirty) return errors;
      !this.$v.birthDate.required && errors.push("This is required");
      return errors;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$anyError) {
        this.addPatientDialog = false;
        this.patientAddedDialog = true;
      }
      this.createPatient();
      this.clear();
    },
    clear() {
      this.$v.$reset();
      this.patientID = null;
      this.firstname = null;
      this.lastname = null;
      this.birthDate = null;
    },
    async createPatient() {
      try {
        var ud = this.selected.join(',')
        if (this.enabled){
          ud += ',' + this.others
        }
        console.log({
          sex: this.sex,
          selected: ud,
          smoking: this.smoking,
        })
        await DatabaseService.addPatient({
          patientID: this.patientID,
          firstname: this.firstname,
          lastname: this.lastname,
          birthDate: this.birthDate,
          sex: this.sex,
          ud: ud,
          smoking: this.smoking,
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
