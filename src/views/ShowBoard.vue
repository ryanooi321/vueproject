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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
  name: "ShowBoard",
  data() {
    return {
      key: "",
      board: [],
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("profiles")
      .doc(this.$route.params.id).collection("achievements");
    ref.get().then((doc) => {
      if (doc.exists) {
        this.key = doc.id;
        this.board = doc.data();
      } else {
        alert("No such document!");
      } 
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

      var dd = {
        content: [
          "First paragraph",

          `${{}}Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines`,
        ],
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
