<template>
  <div>
    <h1>Login</h1>
    <input type="username" name="username" v-model="username" placeholder="username" />
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
  name: "LoginBox",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      error:''
    };
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          username: this.username,
          password: this.password,
        });
        this.error =  ''
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
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