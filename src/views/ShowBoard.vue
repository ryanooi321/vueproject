<template>
  <b-row>
    <b-col cols="12">
      <h2>Profile</h2>
      <b-jumbotron>
        <template slot="header">
          {{ board.fname + " " + board.lname }}
        </template>
        <template slot="lead">
          Email: {{ board.email }}<br />
          Talent: {{ board.achievemens }}<br />
        </template>
        <hr class="my-4" />
        <b-btn @click.stop="createPdf()">Create Report</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "../firebase";
import router from "../router";
import { auth } from "../firebase";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: "ShowBoard",
  data() {
    return {
      key: "",
      board: [],
      achievements: [],
      achievementType: "",
      achievementTitle: "",
      achievementDate: "",
      achievementFileName: "",
      achievementFile: "",
      counter: 0,
      cert: [],
      certificateTitle: "",
      certificateDate: "",
      counter1: 0,
      proj: [],
      projectTitle: "",
      projectDate: "",
      projectType: "",
      counter2: 0,
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("profiles")
      .doc(this.$route.params.id);

    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.board = doc.data();
      } else {
        alert("No such document!");
      }
    });

    var self = this;
    const ref1 = firebase
      .firestore()
      .collection("profiles")
      .doc(this.$route.params.id)
      .collection("achievements")
      .get()
      .then(function (querySnapshot) {
        self.achievements = [];
        querySnapshot.forEach(function (doc) {
          //console.log(doc.id, "=>", doc.data());
          //this.key = doc.id;
          //self.achievements.push(doc.data());
          //console.log(self.achievements);
          self.achievements.push({
            key: doc.id,
            achievementTitle: doc.data().achievementTitle,
            achievementDate: doc.data().achievementDate,
            achievementType: doc.data().achievementType,
            achievementFileName: doc.data().achievementFileName,
            achievementFile: doc.data().achievementFile,
          });

          self.counter++;
        });
      });

    const ref2 = firebase
      .firestore()
      .collection("profiles")
      .doc(this.$route.params.id)
      .collection("certificates")
      .get()
      .then(function (querySnapshot) {
        self.cert = [];
        querySnapshot.forEach(function (doc) {
          //console.log(doc.id, "=>", doc.data());
          //this.key = doc.id;
          //self.achievements.push(doc.data());
          //console.log(self.achievements);
          self.cert.push({
            key: doc.id,
            certificateTitle: doc.data().certificateTitle,
            certificateDate: doc.data().certificateDate,
          });
          self.counter1++;
        });
      });

    const ref3 = firebase
      .firestore()
      .collection("profiles")
      .doc(this.$route.params.id)
      .collection("projects")
      .get()
      .then(function (querySnapshot) {
        self.proj = [];
        querySnapshot.forEach(function (doc) {
          //console.log(doc.id, "=>", doc.data());
          //this.key = doc.id;
          //self.achievements.push(doc.data());
          //console.log(self.achievements);
          self.proj.push({
            key: doc.id,
            projectTitle: doc.data().projectTitle,
            projectType: doc.data().projectType,
            projectDate: doc.data().projectDate,
          });

          self.counter2++;
          console.log(self.proj);
        });
      });
  },
  methods: {
    editboard(id) {
      router.push({
        name: "EditBoard",
        params: { id: id },
      });
    },

    createPdf() {
      let PdfPrinter = require("pdfmake");

      var name = this.board.fname + " " + this.board.lname;
      var email = this.board.email;
      var ph = this.board.phoneNum;
      var bio = this.board.bio;
      var ach = [];
      for (var i = 0; i < this.counter; i++) {
        ach.push([i + 1 + ". " + this.achievements[i].achievementTitle]);
        var x = [];
        x = Object.values(ach);
      }
      for (i = 0; i < this.counter; i++) {
        ach.push([this.achievements[i].achievementType]);
        var xt = [];
        xt = Object.values(ach);
      }
      for (i = 0; i < this.counter; i++) {
        ach.push([this.achievements[i].achievementDate]);
        var xd = [];
        xd = Object.values(ach);
      }
      for (i = 0; i < this.counter1; i++) {
        ach.push([i + 1 + ". " + this.cert[i].certificateTitle]);
        var ct = [];
        ct = Object.values(ach);
      }
      for (i = 0; i < this.counter1; i++) {
        ach.push([this.cert[i].certificateDate]);
        var cy = [];
        cy = Object.values(ach);
      }
      for (i = 0; i < this.counter2; i++) {
        ach.push([i + 1 + ". " + this.proj[i].projectTitle]);
        var pt = [];
        pt = Object.values(ach);
      }
      for (i = 0; i < this.counter2; i++) {
        ach.push([this.proj[i].projectType]);
        var pty = [];
        pty = Object.values(ach);
      }
      for (i = 0; i < this.counter2; i++) {
        ach.push([this.proj[i].projectDate]);
        var pd = [];
        pd = Object.values(ach);
      }
      var dd = {
        content: [
          {
            text: `${name}`,
            style: "header",
          },
          {
            text: [`\nEmail: ${email}\t Phone Number: ${ph}`],
            style: "detail",
          },
          {
            text:
              "____________________________________________________________________________________________________________________________________________________________________________________________",
            decoration: "underline",
            decorationColor: "#f2c839",
            color: "#f2c839",
            margin: [0, 0, 0, 5],
            fontSize: 6,
          },
          { text: "Bio", style: "title" },
          {
            text: ` ${bio}`,
            style: "para",
          },

          { text: "Achivements", style: "Achtitle" },
          {
            margin: [20, 0],
            table: {
              widths: [200, 200, "*"],
              body: [
                [
                  { text: "Title", style: "tableHeader" },
                  { text: "Type", style: "tableHeader" },
                  { text: "Year", style: "tableHeader" },
                ],
                [[x], [xt], [xd]],
              ],
            },
            layout: "noBorders",
          },
          { text: "Certificates", style: "Achtitle" },
          {
            margin: [20, 0],
            table: {
              widths: [200, 200, "*"],
              body: [
                [
                  { text: "Title", style: "tableHeader" },
                  { text: "", style: "tableHeader" },
                  { text: "Year", style: "tableHeader" },
                ],
                [[ct], [], [cy]],
              ],
            },
            layout: "noBorders",
          },
          { text: "Project", style: "Achtitle" },
          {
            margin: [20, 0],
            table: {
              widths: [200, 200, "*"],
              body: [
                [
                  { text: "Title", style: "tableHeader" },
                  { text: "Type", style: "tableHeader" },
                  { text: "Year", style: "tableHeader" },
                ],
                [[pt], [pty], [pd]],
              ],
            },
            layout: "noBorders",
          },
        ],
        styles: {
          header: {
            fontSize: 27,
            bold: true,
            alignment: "center",
          },
          detail: {
            fontSize: 8,
            alignment: "center",
          },
          title: {
            fontSize: 18,
            bold: true,
            margin: [20, 10],
          },
          Achtitle: {
            fontSize: 18,
            bold: true,
            margin: [20, 20],
          },
          para: {
            fontSize: 11,
            margin: [20, 5],
          },
          tableHeader: {
            fontSize: 13,
            bold: true,
          },
        },
      };
      PdfPrinter.createPdf(dd).open();
    },
    /* deleteboard(id) {
      firebase
        .firestore()
        .collection("boards")
        .doc(id)
        .delete()
        .then(() => {
          router.push({
            name: "BoardList",
          });
        })
        .catch((error) => {
          alert("Error removing document: ", error);
        });
    },*/
  },
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
.edit-btn {
  margin-right: 20px;
  width: 70px;
}
</style>
