<template>
  <div>
    <v-card>
      <v-card-title>
       Register
      </v-card-title>
      <v-card-text> <v-text-field
            v-model="username"
            label="username"
            type="username"
            name="username"
            outlined
      />
      <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="password"
            label="password"
            outlined
            @click:append="show1 = !show1"
          />
          <div class="error" v-html="error"></div>
          <v-btn @click="register">Register</v-btn>
          </v-card-text>
     
    </v-card>
    <!-- <h1>Register</h1>
    <input type="text" name="username" v-model="username" placeholder="username" />
    <br />
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
    />
    <div class="error" v-html="error"></div>
    <br />
    <button @click="register">Register</button> -->
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "RegisterBox",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          username: this.username,
          password: this.password,
          role: "guest"
        });
        this.error = "";
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
      } catch (err) {
        this.error = err.response.data.error;
      }
    },
  },
};
</script>

<style scoped>
.error {
  color: black;
}
</style>
