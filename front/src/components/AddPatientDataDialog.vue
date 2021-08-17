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
        <v-card-text v-if="page == 1">
          <v-text-field
            v-model="caseID"
            label="caseID (for temporary use)"
            outlined
            required
          />
          <vc-date-picker v-model="visitedDate">
            <template v-slot="{ inputValue, inputEvents }">
              <v-text-field
                readonly
                :error-messages="visitedDateErrors"
                label="Visit Date"
                :value="inputValue"
                v-on="inputEvents"
                outlined
                required
                @input="$v.visitedDate.$touch()"
                @blur="$v.visitedDate.$touch()"
              ></v-text-field>
            </template>
          </vc-date-picker>
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
          <v-select :items="typeItems" label="Type" outlined></v-select>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="onset"
                :error-messages="onsetErrors"
                :counter="10"
                label="Onset"
                outlined
                required
                @input="$v.onset.$touch()"
                @blur="$v.onset.$touch()"
              >
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select :items="onsetItems" label="Type" outlined></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="phyExam"
                outlined
                clearable
                rows="1"
                no-resize
                clear-icon="mdi-close-circle"
                label="Physical Examination"
                auto-grow
              >
              </v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-if="page == 2">
          <v-checkbox v-model="noneOperation" label="None"></v-checkbox>
          <v-text-field v-model="operation" label="Operation" outlined required>
          </v-text-field>
          <vc-date-picker v-model="visitedDate">
            <template v-slot="{ inputValue, inputEvents }">
              <v-text-field
                readonly
                :error-messages="visitedDateErrors"
                label="Visit Date"
                :value="inputValue"
                v-on="inputEvents"
                outlined
                required
                @input="$v.visitedDate.$touch()"
                @blur="$v.visitedDate.$touch()"
              ></v-text-field>
            </template>
          </vc-date-picker>
          <v-textarea
            v-model="operativeNote"
            outlined
            clearable
            rows="1"
            no-resize
            clear-icon="mdi-close-circle"
            label="Operative Note"
            auto-grow
          />
          <v-text-field
            v-model="bloodLoss"
            label="Blood Loss"
            suffix="mL"
            outlined
            required
          />
          <v-text-field
            v-model="operativeTime"
            label="Operative Time"
            suffix="min"
            outlined
            required
          />
          <v-text-field
            v-model="complication"
            label="Complication"
            outlined
            required
          />
          <v-textarea
            v-model="operativeOthers"
            outlined
            clearable
            rows="1"
            no-resize
            clear-icon="mdi-close-circle"
            label="Others"
            auto-grow
          />
        </v-card-text>
        <v-card-text v-if="page == 3">
          <h3>Preoperative</h3>
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
          <v-file-input
            v-model="prePhoto"
            counter
            label="Preoperative Photo"
            multiple
            placeholder="Select your files"
            prepend-icon="mdi-image-multiple"
            outlined
            :show-size="1000"
          >
            <template v-slot:selection="{ text }">
              <v-chip color="deep-purple accent-4" dark label small>
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
          <h3>Intra-operative</h3>
          <v-file-input
            v-model="intraVDO"
            counter
            label="Intra-operative Video"
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

          <v-file-input
            v-model="intraPhoto"
            counter
            label="Intra-operative Photo"
            multiple
            placeholder="Select your files"
            prepend-icon="mdi-image-multiple"
            outlined
            :show-size="1000"
          >
            <template v-slot:selection="{ text }">
              <v-chip color="deep-purple accent-4" dark label small>
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
          <h3>Post-operative</h3>
          <v-file-input
            v-model="postVDO"
            counter
            label="Post-operative Video"
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

          <v-file-input
            v-model="postPhoto"
            counter
            label="Post-operative Photo"
            multiple
            placeholder="Select your files"
            prepend-icon="mdi-image-multiple"
            outlined
            :show-size="1000"
          >
            <template v-slot:selection="{ text }">
              <v-chip color="deep-purple accent-4" dark label small>
                {{ text }}
              </v-chip>
            </template>
          </v-file-input>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="red lighten-1" text @click="addPatientDialog = false">
            Cancel
          </v-btn>
           <v-btn color="red lighten-1" text v-if="page !== 1" @click="page -= 1;">
            Back
          </v-btn>
          <v-btn color="red lighten-1" text v-if="page === 1" disabled>
            Back
          </v-btn>
          <v-spacer></v-spacer
          ><v-btn color="black lighten-1" text @click="clear()"> Clear </v-btn
          ><v-spacer></v-spacer>
          <v-btn color=" primary" text disabled v-if="page === 3">
            Next
          </v-btn>
          <v-btn color=" primary" text @click="page += 1; temp()" v-if="page !== 3">
            Next
          </v-btn>
          <v-btn color=" primary" text @click="submit()" v-if="page === 3 || page === 1">
            Submit
          </v-btn>
          <v-btn color=" primary" text disabled v-if="page === 2">
            Submit
          </v-btn>
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
    regisID: { required, minLength: minLength(10), maxLength: maxLength(10) },
    firstname: { required },
    lastname: { required },
    visitedDate: { required },
    onset: { required, minLength: minLength(4), maxLength: maxLength(4) },
  },
  data() {
    return {
      addPatientDialog: false,
      addPatientDialog2: false,
      addPatientDialog3: false,
      patientAddedDialog: false,
      regisID: null,
      firstname: null,
      lastname: null,
      visitedDate: null,
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
      typeItems: ["Tumor", "Non-tumor", "Aesthetic", "Others"],
      onset: null,
      onsetItems: ["Hour", "Day", "Month", "Year"],
      phyExam: null,
      noneOperation: false,
      preVDO: [],
      prePhoto: [],
      intraVDO: [],
      intraPhoto: [],
      postVDO: [],
      postPhoto: [],
      page: 1,
      caseID: null
      // regisIDRules: [(v) => v.length <= 10 || "10 Digits only"],
    };
  },
  computed: {
    regisIDErrors() {
      const errors = [];
      if (!this.$v.regisID.$dirty) return errors;
      !this.$v.regisID.maxLength && errors.push("10 Digits only");
      !this.$v.regisID.minLength && errors.push("10 Digits only");
      !this.$v.regisID.required && errors.push("ID is required.");
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
    visitedDateErrors() {
      const errors = [];
      if (!this.$v.visitedDate.$dirty) return errors;
      !this.$v.visitedDate.required && errors.push("This is required");
      return errors;
    },
    onsetErrors() {
      const errors = [];
      if (!this.$v.onset.$dirty) return errors;
      !this.$v.onset.maxLength && errors.push("4 Digits only");
      !this.$v.onset.minLength && errors.push("4 Digits only");
      !this.$v.onset.required && errors.push("onset is required.");
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
      this.regisID = null;
      this.firstname = null;
      this.lastname = null;
      this.birthDate = null;
      this.page = 1;
    },
    async createPatient() {
      try {
        await DatabaseService.addCase({
          caseID: this.caseID,
          patientID: this.$route.params._id,
          visitDate: this.visitedDate,
          diagnosis: this.diagnosisModel,
          phyExam: this.phyExam,
        });
      } catch (err) {
        console.log(err);
      }
    },
    temp() {
      console.log(this.$route.params._id)
    }
  },
  watch: {
    diagnosisModel(val) {
      if (val.length > 5) {
        this.$nextTick(() => this.diagnosisModel.pop());
      }
    },
  },
};
</script>
