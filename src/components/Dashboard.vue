<template>
  <div>
    <h3>Dashboard</h3>
    <div class="row">
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Achievements</h5>
          <div class="text-danger">
            <h3>{{ this.Asize }} Achievements</h3>
          </div>
          <p class="card-text">
            Some Achievements such as awards that have been achieved over the
            years.
          </p>
          <router-link class="btn btn-primary" to="/dashboard/achievements">
            Add Achievements
          </router-link>
        </div>
      </div>
      <div class="card mx-auto" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Certificates</h5>
          <div class="text-danger">
            <h3>{{ this.Csize }} Certificates</h3>
          </div>
          <p class="card-text">
            Some certificates that have been achieved over the years.
          </p>
          <router-link class="btn btn-primary" to="/dashboard/certificates">
            Add Certificates
          </router-link>
        </div>
      </div>
      <div class="card" style="width: 18rem">
        <div class="card-body">
          <h5 class="card-title">Projects</h5>
          <div class="text-danger">
            <h3>{{ this.Psize }} Projects</h3>
          </div>
          <p class="card-text">
            Some projects that have been done on the side over the years.
          </p>
          <router-link class="btn btn-primary" to="/dashboard/projects">
            Add Projects
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { auth } from "../../firebase";
export default {
  name: "Dashboard",
  data() {
    return {
      key: "",
      Asize: "0",
      Csize: "0",
      Psize: "0",
      counter: "",
      achievements: [],
    };
  },
  created() {
    var self = this;
    const ref = firebase
      .firestore()
      .collection("profiles")
      .doc(firebase.auth().currentUser.uid);

    ref
      .collection("achievements")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          //console.log(doc.id, "=>", doc.data());
          self.Asize = querySnapshot.size;
          self.key = doc.id;
          self.achievements.push(doc.data());
          console.log(self.achievements);
        });
      }),
      ref
        .collection("certificates")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            //console.log(doc.id, "=>", doc.data());
            self.Csize = querySnapshot.size;
            self.key = doc.id;
            self.achievements.push(doc.data());
            console.log(self.achievements);
          });
        }),
      ref
        .collection("projects")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            //console.log(doc.id, "=>", doc.data());
            self.Psize = querySnapshot.size;
            self.key = doc.id;
            self.achievements.push(doc.data());
            console.log(self.achievements);
          });
        });
  },
};
</script>