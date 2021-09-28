<template>
  <div>
    <v-card>
      <v-card-title>
        Login
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
          <v-btn @click="login">Login</v-btn>
          </v-card-text>
     
    </v-card>
    <!-- <h1>Login</h1>
    <input type="username" name="username" v-model="username" placeholder="username" />
    <br />
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
    />
    <div class="error" v-html="error"></div>
    <br /> -->
    <!-- <button @click="login">Login</button> -->
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
      error:'',
      show1:false
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
        if (this.$route.query.redirect){
          console.log('aaa')
          this.$router.push({path: this.$route.query.redirect})
          
        }
        else{
          this.$router.push(({name: 'Home'}))
        }
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