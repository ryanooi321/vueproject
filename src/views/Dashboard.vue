<template>
  <div class="row">
    <div class="col-sm-3 border-right">
      <h2>Side Bar</h2>
      <sideBar></sideBar>
    </div>
    <div class="col-sm-9">
      <div class="container">
        <h1>This is the DashBoard</h1>
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
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import sideBar from "../components/sideBar";
export default {
  name: "Dashboard",
  components: {
    sideBar,
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