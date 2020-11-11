<template>
  <b-row>
    <b-col cols="12">
      <h2>Report</h2>
      <b-table striped hover :items="boards" :fields="fields">
        <template v-slot:cell(actions)="row">
          <b-button size="sm" @click.stop="details(row.item)">Details</b-button>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import firebase from "../firebase";
import router from "../router";

export default {
  name: "BoardList",
  data() {
    return {
      fields: [
        {
          title: { label: "Name", sortable: true, class: "text-left" },
        },
        {
          actions: { label: "Action", class: "text-center" },
        },
      ],
      boards: [],
      errors: [],
      ref: firebase.firestore().collection("profiles"),
    };
  },
  created() {
    this.ref.onSnapshot((querySnapshot) => {
      this.boards = [];
      querySnapshot.forEach((doc) => {
        this.boards.push({
          key: doc.id,
          title: doc.data().fname + " " + doc.data().lname,
        });
      });
    });
  },
  methods: {
    details(board) {
      router.push({ name: "ShowBoard", params: { id: board.key } });
    },
  },
};
</script>

<style>
.table {
  width: 96%;
  margin: 0 auto;
}
</style>
