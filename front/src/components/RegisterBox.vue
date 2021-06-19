<template>
  <div>
    <h1>Register</h1>
    <input type="email" name="email" v-model="email" placeholder="email" />
    <br />
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
    />
    <div class="error" v-html="error"></div>
    <br />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "RegisterBox",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
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
