<template>
  <div class="home">
    <img
      alt="Vue logo"
      class="img-fluid"
      src="../assets/logo_uow_blue.png"
      width="250"
    />
    <HelloWorld msg="Welcome to Talent Portfolio Digital Management System" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
