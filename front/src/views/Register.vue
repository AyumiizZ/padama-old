<template>
  <div class="home">
    <RegisterBox></RegisterBox>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterBox from "@/components/RegisterBox.vue";

export default {
  name: "Home",
  components: {
    RegisterBox: RegisterBox,
  },
};
</script>
