<template>
  <div class="container">
    <a>
      <img
        src="../../src/assets/logo_uow_blue.png"
        alt="UOW LOGO"
        class="img-fluid"
        width="300"
    /></a>
    <br />
    <br />
    <h2>Talent Portfolio Digital Management System</h2>
    <br />
    <h4>Register</h4>
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="fullName"
            required
            placeholder="Full Name"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="email"
            required
            v-model="email"
            aria-describedby="emailHelp"
            placeholder="Email Address"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="password"
            required
            v-model="password"
            placeholder="Password"
          />
        </div>
        <div
          v-if="password.length > 1 && password.length < 6"
          class="text-danger"
        >
          Password length should be greater than 6
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="reenterPassword"
            required
            v-model="reenterPassword"
            placeholder="Re-enter Password"
          />
          <div v-if="password != reenterPassword" class="text-danger">
            Passwords do not match!
          </div>
        </div>
        <button @click="register" class="btn btn-primary">Register</button>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      reenterPassword: "",
    };
  },
  mounted: function () {
    if (firebase.auth().currentUser) this.$router.replace("dashboard");
  },
  methods: {
    register: function () {
      console.log("Email: " + this.email);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user.user);
        })
        .catch(function (error) {
          alert("Unable to register user : " + error.message);
        });
    },
  },
};
</script>