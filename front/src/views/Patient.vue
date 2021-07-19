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
              <router-link :to="{ name: 'PDF', params : {_id: row.item._id}}">
                <v-btn>Show PDF</v-btn>
              </router-link>
              <router-link :to="{ name: 'VDO', params : {_id: row.item._id}}">
                <v-btn >Show Video</v-btn>
              </router-link>
              <router-link :to="{ name: 'Pic', params : {_id: row.item._id}}">
                <v-btn>Show Picture</v-btn>
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
  // components: { VideoPlayer },
  data() {
    return {
      expanded: [],
      singleExpand: false,
      
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
        { text: '', value: 'attach' },
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
