<template>
  <div class="home">
    <HelloWorld msg="Welcome to Talent Portfolio Digital Management System" />
    <img src="../assets/uow5.jpg" class="img-fluid" alt="Responsive image" />
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
