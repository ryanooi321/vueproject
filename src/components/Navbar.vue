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
              <template v-if="user.data.email == 'admin@gmail.com'">
                <li><router-link class="nav-link" to="/">Home</router-link></li>
                <li>
                  <router-link class="nav-link" to="/admin/admin"
                    >Admin</router-link
                  >
                </li>
              </template>
              <template v-else>
                <li><router-link class="nav-link" to="/">Home</router-link></li>
                <li>
                  <router-link class="nav-link" to="/dashboard/dashboard"
                    >Dashboard</router-link
                  >
                </li>
              </template>
              <li>
                <router-link class="nav-link" to="#"></router-link>
              </li>
              <li>
                <router-link
                  v-on:click.native="openModal"
                  class="nav-link"
                  to=""
                  ><div class="nav-item">
                    {{ user.data.email }}
                  </div></router-link
                >
              </li>
              <div v-if="myModal">
                <transition name="model">
                  <div class="modal-mask">
                    <div class="modal-wrapper">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h4 class="modal-title">Account Settings</h4>
                            <button
                              type="button"
                              class="close"
                              @click="myModal = false"
                            >
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-body">
                            <!--###############################-->
                            <h4>Change Password :</h4>
                            <div class="form-group" row>
                              <label>Enter new password : </label>
                              <input
                                type="password"
                                class="form-control w-50 mx-2"
                                placeholder="New Password"
                                v-model="newPassword"
                              />
                              <div
                                v-if="
                                  newPassword.length > 1 &&
                                  newPassword.length < 6
                                "
                                class="text-danger"
                              >
                                Password length should be greater than 6
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              @click="updatePassword()"
                              type="button"
                              class="btn btn-primary"
                            >
                              Update Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
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
  data() {
    return {
      myModal: false,
      newPassword: "",
    };
  },
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
    openModal: function () {
      this.myModal = true;
    },
    updatePassword: function () {
      var user = firebase.auth().currentUser;
      var newPassword = this.newPassword;

      user
        .updatePassword(newPassword)
        .then(function () {
          alert("Successfully Changed!");
        })
        .catch(function (error) {
          alert("Error Occurred!");
        });

      this.myModal = false;
    },
  },
};
</script>