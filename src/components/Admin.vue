<template>
  <div>
    <div class="row">
      <h3>Admin Overview</h3>
    </div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">User</th>
          <th scope="col">Achievements</th>
          <th scope="col">Certificates</th>
          <th scope="col">Projects</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, counter) in users" v-bind:key="counter">
          <td>{{ counter + 1 }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.achievements }}</td>
          <td>{{ user.certificates }}</td>
          <td>{{ user.projects }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from "../firebase";
export default {
  name: "adminComponent",
  data() {
    return {
      key: "",
      //achievements: "0",
      //certificates: "0",
      //projects: "0",
      counter: 0,
      users: [],
    };
  },
  created() {
    let self = this;
    const ref = firebase.firestore().collection("profiles");
    ref.get().then(function (querySnapshot) {
      self.users = [];
      querySnapshot.forEach(function (doc) {
        ref
          .doc(doc.id)
          .collection("achievements")
          .get()
          .then(function (querySnapshot1) {
            ref
              .doc(doc.id)
              .collection("certificates")
              .get()
              .then(function (querySnapshot2) {
                ref
                  .doc(doc.id)
                  .collection("projects")
                  .get()
                  .then(function (querySnapshot3) {
                    self.users.push({
                      achievements: querySnapshot1.size,
                      certificates: querySnapshot2.size,
                      email: doc.data().email,
                      projects: querySnapshot3.size,
                    });
                  });
              });
          });
      });
    });
  },
};
</script>