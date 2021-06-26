<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center">
      <router-link to="/">
        <v-btn> Logo </v-btn>
      </router-link>
      <router-link to="/search">
        <v-btn> Search </v-btn>
      </router-link>
      <router-link to="/patient">
        <v-btn> Patient </v-btn>
      </router-link>
    </div>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn to="/login" v-if="!$store.state.isUserLoggedIn"> Login </v-btn>
      <v-btn to="/register" v-if="!$store.state.isUserLoggedIn"> Sign-Up </v-btn>
      <v-btn @click="logout" v-if="$store.state.isUserLoggedIn"> Logout</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({name: 'Home'})
    }
  },
};
</script>
