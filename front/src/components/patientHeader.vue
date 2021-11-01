<template>
  <div>
    <h1>{{ pid }} {{ firstname }} {{ lastname }}</h1>
    <h2>{{ parseSex(sex) }} smoking: {{ parseYN(smoking) }}</h2>
    <v-chip v-for="item in ud.split(',')" :key="item.index">
      {{ item }}
    </v-chip>
  </div>
</template>

<script>
import DatabaseService from "@/services/DatabaseService";
export default {
  name: "patientHeader",
  props: ["pid"],
  data() {
    return {
      firstname: null,
      lastname: null,
      sex: null,
      ud: null,
      smoking: null,
    };
  },
  methods: {
    parseSex: function (sexShortForm) {
      if (sexShortForm == "m") {
        return "Male";
      }
      if (sexShortForm == "f") {
        return "Female";
      }
      return "Other";
    },
    parseYN: function (shortForm) {
      if (shortForm == "y") {
        return "Yes";
      } else if (shortForm == "n") {
        return "No";
      } else "Invalid Input";
    },
  },
  async mounted() {
    var that = this;
    await DatabaseService.getPatient({ _id: this.pid }).then(function (data) {
      that.firstname = data[0].firstname;
      that.lastname = data[0].lastname;
      that.sex = data[0].sex;
      that.ud = data[0].ud;
      that.smoking = data[0].smoking;
    });
  },
};
</script>
