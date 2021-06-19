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
            <td>{{row.item._id}}</td>
            <td>{{row.item.first}}</td>
            <td>{{row.item.last}}</td>
            <td>{{row.item.age}}</td>
            <td>
              <router-link to="/patient">
                <v-btn class="mx-2" fab dark small color="pink" >
                    <v-icon dark>mdi-heart</v-icon>
                </v-btn>
                </router-link>
            </td>
          </tr>
      </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
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
        {
          text: "Info",
          value: "info"
        }
      ],
      queryResults: [{
          _id: "1234567890",
          first: "Harry",
          last: "Potter",
          age: "112",
          info: "/patient"
      }],
    };
  },
  methods: {
    queryRange: function () {
      console.log("query");
    },
  },
};
</script>
