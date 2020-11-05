<template>
  <div class="row">
    <div class="col-sm-2 border-right">
      <div class="container">
        <h2></h2>
        <sideBar></sideBar>
      </div>
    </div>
    <div class="col-sm-10">
      <div class="container">
        <Profile></Profile>
        <Achievements></Achievements>
        <Certificates></Certificates>
        <Projects></Projects>
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
</template>

<script>
import { db } from "../firebase";
import sideBar from "../components/sideBar";
import Profile from "../components/Profile";
import Achievements from "../components/Achievements";
import Certificates from "../components/Certificates";
import Projects from "../components/Projects";
export default {
  name: "Dashboard",
  components: {
    sideBar,
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
    };
  },
};
</script>