<template>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-btn @click="navigateTo({name: 'Home'})">
            HOME
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <v-btn @click="navigateTo({name: 'Login'})">
        Login
      </v-btn>
      <v-btn @click="navigateTo({name: 'Register'})">
        Sign-Up
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        navigateTo (route) {
            this.$router.push(route)
        }
    }
}
</script>