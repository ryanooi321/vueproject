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
    <h3>Add new user</h3>
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
        <button @click="addUser" class="btn btn-primary">Add User</button>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script>
var admin = require("firebase-admin");
export default {
  name: "addUser",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    addUser: function () {
      console.log("email" + this.email);
      admin
        .auth()
        .createUser({
          email: this.email,
          password: this.password,
        })
        .then(function (userRecord) {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log("Successfully created new user:", userRecord.uid);
        })
        .catch(function (error) {
          console.log("Error creating new user:", error);
        });
    },
  },
};
</script>