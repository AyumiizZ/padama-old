<template>
  <v-card>
    <v-row>
      <v-col>
        <v-text-field v-model="id" label="Onset" outlined required disabled />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <vc-date-picker v-model="visitedDate">
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              readonly
              label="Visit Date"
              :value="inputValue"
              v-on="inputEvents"
              outlined
              required
            />
          </template>
        </vc-date-picker>
      </v-col>
      <v-col>
        <v-select v-model="type" :items="typeItems" label="Type" outlined />
      </v-col>
      <v-col>
        <v-text-field
          v-model="onset"
          :counter="10"
          label="Onset"
          outlined
          required
        />
      </v-col>
      <v-col>
        <v-select
          v-model="onsetSuffix"
          :items="onsetItems"
          label="Onset Suffix"
          outlined
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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
      </v-col>
      <v-col>
        <v-checkbox v-model="noneOperation" label="None Operation" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          v-model="phyExam"
          outlined
          clearable
          rows="1"
          no-resize
          clear-icon="mdi-close-circle"
          label="Physical Examination"
          auto-grow
        />
      </v-col>
    </v-row>
    <v-row v-if="!noneOperation">
      <v-col>
        <v-text-field v-model="operation" label="Operation" outlined required />
      </v-col>
      <v-col>
        <vc-date-picker v-model="operativeDate">
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              readonly
              label="Operative Date"
              :value="inputValue"
              v-on="inputEvents"
              outlined
              required
            ></v-text-field>
          </template>
        </vc-date-picker>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          v-if="!noneOperation"
          v-model="operativeNote"
          outlined
          clearable
          rows="1"
          no-resize
          clear-icon="mdi-close-circle"
          label="Operative Note"
          auto-grow
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-if="!noneOperation"
          v-model="bloodLoss"
          label="Blood Loss"
          suffix="mL"
          outlined
          required
        />
      </v-col>
      <v-col>
        <v-text-field
          v-if="!noneOperation"
          v-model="operativeTime"
          label="Operative Time"
          suffix="min"
          outlined
          required
        />
      </v-col>
      <v-col
        ><v-text-field
          v-if="!noneOperation"
          v-model="complication"
          label="Complication"
          outlined
          required
      /></v-col>
    </v-row>
    <v-row>
      <v-col>
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
      </v-col>
    </v-row>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn color="red lighten-1" text> Cancel </v-btn>
      <v-spacer />
      <v-btn color=" primary" text @click="submitCase"> Submit </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DatabaseService from "@/services/DatabaseService";
export default {
  data() {
    return {
      id: this.$route.params._id,
      // firstname: this.$route.params.firstname,
      // lastname: this.$route.params.lastname,
      visitedDate: null,
      noneOperation: false,
      operation: null,
      operativeDate: null,
      complication: null,
      operativeOthers: null,
      operativeTime: null,
      bloodLoss: null,
      operativeNote: null,
      type: null,
      typeItems: ["Tumor", "Non-tumor", "Aesthetic", "Others"],
      onset: null,
      onsetSuffix: null,
      diagnosisModel: [],
      diagnosisSearch: null,
      diagnosisItems: [
        "Unspecified",
        "Cleft palate",
        "Cleft hard and soft palate with cleft lip",
        "Cleft soft palate",
        "Cleft lip",
        "Cleft hard palate",
      ],
      onsetItems: ["Hour", "Day", "Month", "Year"],
      phyExam: null,
    };
  },
  methods: {
    submitCase() {
      // pass for validate
      this.createCase();
    },
    parseDiag (diag) {
      var ret = [];
      for (let i = 0; i < diag.length; i++) {
        ret.push(this.diagnosisItems.indexOf(diag[i]));
      }
      return ret.sort().join(',');
    },
    async createCase() {
      try {
        var caseBody;
        if (this.noneOperation === true) {
          caseBody = {
            patientID: this.$route.params._id,
            visitDate: this.visitedDate,
            diagnosis: this.parseDiag(this.diagnosisModel),
            type: this.type,
            onset: [this.onset, this.onsetSuffix].join(" "),
            phyExam: this.phyExam,
            other: this.operativeOthers,
          };
        } else {
          caseBody = {
            patientID: this.$route.params._id,
            visitDate: this.visitedDate,
            diagnosis: this.parseDiag(this.diagnosisModel),
            type: this.type,
            onset: [this.onset, this.onsetSuffix].join(" "),
            phyExam: this.phyExam,
            operation: this.operation,
            operativeDate: this.operativeDate,
            operativeNote: this.operativeNote,
            bloodloss: this.bloodLoss,
            operativeTime: this.operativeTime,
            complication: this.complication,
            other: this.operativeOthers,
          };
        }
        console.log(caseBody);
        await DatabaseService.addCase(caseBody);
      } catch (err) {
        console.log(err);
      }
    },
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
