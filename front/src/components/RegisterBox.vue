<template>
  <div>
    <h1>Register</h1>
    <input type="email" name="email" v-model="email" placeholder="email" />
    <br />
    <input type="password" name="password" v-model="password" placeholder="password" />
    <br />
    <button>Register</button>
  </div>
</template>

<script>
export default {
  name: "RegisterBox",
  components: {},
  data() {
      return {
          email: '',
          password: ''
      }
  },
  watch: {
      
  }
};
</script>
