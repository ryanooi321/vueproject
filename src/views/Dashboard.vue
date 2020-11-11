<template>
  <div class="row">
    <div class="col-sm-2 border-right">
      <div class="container">
        <div class="row">
          <ul class="nav flex-column">
            <li class="nav-item" style="text-align: left">
              <router-link
                @click="profile"
                class="nav-link text-secondary"
                to=""
                ><h3>Profile</h3></router-link
              >
            </li>
            <li class="nav-item" style="text-align: left">
              <router-link
                v-on:click="components = 'achievements'"
                class="nav-link text-secondary"
                to="#"
                ><h3>Achievements</h3></router-link
              >
            </li>
            <li class="nav-item" style="text-align: left">
              <router-link
                @click="certificates()"
                class="nav-link text-secondary"
                to="#"
                ><h3>Certificates</h3></router-link
              >
            </li>
            <li class="nav-item" style="text-align: left">
              <router-link
                @click="projects()"
                class="nav-link text-secondary"
                to="#"
                ><h3>Projects</h3></router-link
              >
            </li>
            <li class="nav-item" style="text-align: left">
              <router-link class="nav-link text-secondary" to="#"
                ><h3>Generate Report</h3></router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-10">
      <div class="container">
        <h2>This is dashboard</h2>
        <Profile></Profile>
        <Achievements></Achievements>
        <keep-alive>
          <component v-bind:is="component"></component>
        </keep-alive>
      </div>

      <!--<h1>This is the DashBoard</h1>
        <table class="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user">
              <td>
                {{ user.username }}
              </td>
              <td>
                {{ user.image }}
              </td>
            </tr>
          </tbody>
        </table>-->
    </div>
  </div>
  <!--<h1>This is the new DashBoard</h1>-->
</template>

<script>
import { db } from "../firebase";
import Profile from "../components/Profile";
import Achievements from "../components/Achievements";
import Certificates from "../components/Certificates";
import Projects from "../components/Projects";
export default {
  name: "Dashboard",
  components: {
    Profile,
    Achievements,
    Certificates,
    Projects,
  },
  data() {
    return {
      users: [],
    };
  },
  firestore() {
    return {
      users: db.collection("username"),
      component: "profile",
    };
  },
  methods: {
    profile() {
      this.component = Profile;
      console.log("profile");
    },
    achievements() {
      this.component = Achievements;
      console.log("Achievements");
    },
    certificates() {
      this.$$refs.Certificates.show();
    },
    projects() {
      this.$refs.Projects.show();
    },
  },
};
</script>