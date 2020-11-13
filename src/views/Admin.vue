<template>
  <div class="row">
    <div class="col-sm-2 border-right">
      <div class="container">
        <div class="row">
          <ul class="nav flex-column">
            <li class="nav-item" style="text-align: left">
              <router-link class="btn" to="/admin/admin">
                <h3>Dashboard</h3>
              </router-link>
            </li>
            <li class="nav-item" style="text-align: left">
              <router-link class="btn" to="/admin/report">
                <h3>Report</h3>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-sm-10">
      <div class="container">
        <router-view>
          <keep-alive>
            <component v-bind:is="dynamicComponent"></component> </keep-alive
        ></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { auth } from "../../firebase";
import adminComponent from "../components/Admin";
import Report from "../components/Report";
export default {
  components: {
    adminComponent,
    Report,
  },
  data() {
    return {
      dynamicComponent: adminComponent,
    };
  },
  methods: {
    adminComponent: function () {
      this.dynamicComponent = adminComponent;
    },
    Report: function () {
      console.log("report clicked");
      this.dynamicComponent = Report;
    },
  },
};
</script>