<template>
  <div>
    <h1>Login</h1>
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
    <button @click="login">Login</button>
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
      error:''
    };
  },
  methods: {
    async login() {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.error =  ''
      } catch (err) {
        this.error = err.response.data.error
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