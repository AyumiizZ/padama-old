<template>
  <div id="frame">
    <v-card>
      {{ currentPage }} / {{ pageCount }}
      <v-btn @click="dec" :disabled="currentPage===1">Last</v-btn>
      <v-btn @click="inc" :disabled="currentPage===pageCount">Next</v-btn>
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          label="PDF Name"
          outlined
        ></v-select>
      </v-col>
    </v-card>
    <v-card>    
    <pdf
      src="http://localhost:8081/static/pdf1.pdf"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
      :page="page"
    ></pdf></v-card>
  </div>
</template>

<script>
import pdf from "vue-pdf";

export default {
  components: {
    pdf,
  },
  data() {
    return {
      page: 1,
      currentPage: 0,
      pageCount: 0,
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      
    };
  },
  methods: {
    inc: function () {
      if (this.page < this.pageCount) this.page++;
    },
    dec: function () {
      if (this.page > 1) this.page--;
    },
  },
};
</script>

<style scoped>
#frame {
  height:100vh;
}
</style>