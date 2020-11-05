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
    <h3>Log In</h3>
    <br />
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            required
            aria-describedby="emailHelp"
            placeholder="Email Address"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
            placeholder="Password"
          />
          <div
            v-if="password.length > 1 && password.length < 6"
            class="text-danger"
          >
            Password length should be greater than 6
          </div>
        </div>
        <button @click="login" class="btn btn-primary">Login</button>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      console.log("Email: " + this.email);
      console.log("Password: " + this.password);
      if (this.email == "admin@gmail.com" && this.password == "password") {
        console.log("this is admin");
        this.$router.push("/admin");
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user.user);
        })
        .catch(function (error) {
          alert("Unable to login : " + error.message);
        })
        .then(() => {
          this.$router.replace({
            path: "/dashboard",
          });
        });
    },
  },
};
</script>