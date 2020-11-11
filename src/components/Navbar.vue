<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand"
      ><img
        src="../assets/logo_uow_blue.png"
        alt="UOW LOGO"
        class="img-thumbnail float-left"
        width="180"
    /></router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>
      <ul class="navbar-nav ml-auto">
        <template v-if="user.loggedIn">
          <ul class="navbar-nav mr-auto">
            <form class="form-inline my-2 my-lg-0">
              <li><router-link class="nav-link" to="/">Home</router-link></li>
              <li>
                <router-link class="nav-link" to="/dashboard"
                  >Dashboard</router-link
                >
              </li>

              <li>
                <router-link class="nav-link" to="#"></router-link>
              </li>
              <li>
                <router-link class="nav-link" to="#"
                  ><div class="nav-item">
                    {{ user.data.email }}
                  </div></router-link
                >
              </li>
              <li>
                <router-link class="nav-link" to="#"></router-link>
              </li>
              <li>
                <button
                  @click.prevent="signOut"
                  class="btn btn-outline-primary my-2 my-sm-0"
                  to="/logout"
                >
                  Logout
                </button>
              </li>
            </form>
          </ul>
        </template>
        <template v-else>
          <ul class="navbar-nav mr-auto">
            <form class="form-inline my-2 my-lg-0">
              <router-link class="nav-link" to="/">Home</router-link>
              <router-link class="nav-link" to="/login">Login</router-link>
            </form>
          </ul>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user",
    }),
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            path: "/",
          });
        });
    },
  },
};
</script>