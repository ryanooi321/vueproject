<template>
  <div class="row">
    <div class="col-sm-2 border-right">
      <div class="container">
        <div class="row">
          <ul class="nav flex-column">
            <li class="nav-item" style="text-align: left">
              <button @click="dashboard" class="btn" to="">
                <h3>Dashboard</h3>
              </button>
            </li>
            <li class="nav-item" style="text-align: left">
              <button @click="profile" class="btn" to="">
                <h3>Profile</h3>
              </button>
            </li>
            <li class="nav-item" style="text-align: left">
              <button @click="achievements" class="btn" to="">
                <h3>Achievements</h3>
              </button>
            </li>
            <li class="nav-item" style="text-align: left">
              <button @click="certificates" class="btn" to="">
                <h3>Certificates</h3>
              </button>
            </li>
            <li class="nav-item" style="text-align: left">
              <button @click="projects" class="btn" to="">
                <h3>Projects</h3>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-10">
      <div class="container">
        <keep-alive>
          <component v-bind:is="dynamicComponent"></component>
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
import Dashboard from "../components/Dashboard";
export default {
  components: {
    Profile,
    Achievements,
    Certificates,
    Projects,
    Dashboard,
  },
  data() {
    return {
      users: [],
      dynamicComponent: Dashboard,
    };
  },
  methods: {
    dashboard: function () {
      this.dynamicComponent = Dashboard;
    },
    achievements: function () {
      console.log("achievements clicked");
      this.dynamicComponent = Achievements;
    },
    profile: function () {
      console.log("profile clicked");
      this.dynamicComponent = Profile;
    },
    certificates: function () {
      this.dynamicComponent = Certificates;
    },
    projects: function () {
      this.dynamicComponent = Projects;
    },
  },
};
</script>