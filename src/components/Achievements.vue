<template>
  <div>
    <div class="row">
      <h3>Your Achievements Details</h3>
    </div>
    <br />

    <table class="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Type</th>
          <th scope="col">Title</th>
          <th scope="col">Year</th>
          <th scope="col">FileName</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(achievement, counter) in achievements" v-bind:key="counter">
          <td>{{ counter + 1 }}</td>
          <td>{{ achievement.achievementType }}</td>
          <td>{{ achievement.achievementTitle }}</td>
          <td>{{ achievement.achievementDate }}</td>
          <td>{{ achievement.achievementFileName }}</td>
          <td>
            <button
              @click="openModal(achievement.key)"
              type="button"
              class="btn btn-secondary"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="myModal">
      <transition name="model">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Edit It</h4>
                  <button type="button" class="close" @click="myModal = false">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <!--###############################-->
                  <form>
                    <div class="form-group row">
                      <label for="achievementType">Achievement Type :</label>
                      <select
                        class="form-control w-25 mx-2"
                        required
                        id="achievementType"
                        placeholder="Select"
                        v-model="modal.achievementType"
                      >
                        <option>Awards</option>
                        <option>Competition</option>
                        <option>Personal</option>
                        <option>Others</option>
                      </select>
                    </div>
                    <div class="form-group row">
                      <label for="achievementTitle">Achievement Title :</label>
                      <input
                        type="text"
                        class="form-control w-50 mx-2"
                        id="achievementTitle"
                        placeholder="Best Staff Award 2019"
                        v-model="modal.achievementTitle"
                        required
                      />
                    </div>
                    <div class="form-group row">
                      <label for="achievementDate">Year Of Achievement :</label>
                      <input
                        type="text"
                        required
                        id="achievementDate"
                        class="form-control w-25 mx-2"
                        placeholder="2020"
                        v-model="modal.achievementDate"
                      />
                    </div>

                    <div class="form-group row">
                      <label for="achievementUpload"
                        >Update Achievement :</label
                      >
                      <div class="mx-2">
                        <input
                          type="file"
                          @change="updateFile"
                          id="updateFile"
                        />
                      </div>
                      <p>Uploaded :</p>
                      <input
                        class="form-control w-25 mx-2"
                        placeholder="None"
                        v-model="modal.achievementFileName"
                        readonly
                      />
                      <input
                        class="form-control w-25 mx-2"
                        v-model="modal.achievementFile"
                        hidden
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    @click="updateAchievement(modal.id)"
                    type="button"
                    class="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteAchievement(modal.id)"
                    type="button"
                    class="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <br />
    <div class="row">
      <h4>Add Achievement</h4>
    </div>
    <br />
    <form>
      <div class="form-group row w-50">
        <label for="achievementType">Achievement Type :</label>
        <select
          class="form-control w-25 mx-2"
          required
          id="achievementType"
          placeholder="Select"
          v-model="forms.achievementType"
        >
          <option>Awards</option>
          <option>Competition</option>
          <option>Personal</option>
          <option>Others</option>
        </select>
      </div>
      <div class="form-group row">
        <label for="achievementTitle">Achievement Title :</label>
        <input
          type="text"
          class="form-control w-50 mx-2"
          id="achievementTitle"
          placeholder="Best Staff Award 2019"
          v-model="forms.achievementTitle"
          required
        />
      </div>
      <div class="form-group row w-50">
        <label for="achievementDate">Year Of Achievement :</label>
        <input
          type="text"
          required
          id="achievementDate"
          class="form-control w-25 mx-2"
          placeholder="2020"
          v-model="forms.achievementDate"
        />
      </div>

      <div class="form-group row">
        <label for="achievementUpload">Upload Achievement :</label>
        <div class="mx-2">
          <input type="file" @change="uploadFile" id="file" />
        </div>
      </div>
    </form>
    <br /><br />
    <div class="row">
      <button @click="addAchievement" type="button" class="btn btn-primary">
        Add Achievement
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { auth } from "../../firebase";
import router from "../router";
import Vue from "vue";

export default {
  name: "Achievements",
  data() {
    return {
      myModal: false,
      key: "",
      size: "",
      counter: 0,
      achievements: [],
      forms: {
        achievementType: "",
        achievementTitle: "",
        achievementDate: "",
        achievementFile: "",
        achievementFileName: "",
      },
      modal: {
        achievementType: "",
        achievementTitle: "",
        achievementDate: "",
        achievementFile: "",
        achievementFileName: "",
        id: "",
      },
    };
  },
  created() {
    var self = this;
    const ref = firebase
      .firestore()
      .collection("profiles")
      .doc(firebase.auth().currentUser.uid)
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
        });
      });
  },

  methods: {
    deleteAchievement(id) {
      console.log("delete " + id);
      firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("achievements")
        .doc(id)
        .delete()
        .then(() => {
          alert("Successfully Delete");
          //reload page
        })
        .catch((error) => {
          alert("Error removing document: ", error);
        });
      this.myModal = false;
    },
    updateAchievement(id) {
      console.log("update " + id);
      const ref = firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("achievements")
        .doc(id)
        .set(
          {
            achievementDate: this.modal.achievementDate,
            achievementFile: this.modal.achievementFile,
            achievementFileName: this.modal.achievementFileName,
            achievementTitle: this.modal.achievementTitle,
            achievementType: this.modal.achievementType,
          },
          { merge: true }
        )
        .then(() => {
          alert("Successfully Updated");
        });
      this.myModal = false;
    },
    openModal(id) {
      console.log("click " + id);
      const ref = firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("achievements")
        .doc(id)
        .get()
        .then((doc) => {
          this.modal.achievementTitle = doc.data().achievementTitle;
          this.modal.achievementType = doc.data().achievementType;
          this.modal.achievementDate = doc.data().achievementDate;
          this.modal.achievementFileName = doc.data().achievementFileName;
          this.modal.achievementFile = doc.data().achievementFile;
          this.modal.id = id;
        });
      this.myModal = true;
    },
    updateFile: function () {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#updateFile").files[0];
      const name = new Date() + "-" + file.name;
      const task = ref.child(name).put(file);
      this.modal.achievementFileName = file.name;
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          alert("File Uploaded Successful");
          this.modal.achievementFile = url;
        });
    },
    uploadFile: function () {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#file").files[0];
      const name = new Date() + "-" + file.name;
      const task = ref.child(name).put(file);
      this.forms.achievementFileName = file.name;
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          alert("File Uploaded Successful");
          this.forms.achievementFile = url;
        });
    },
    addAchievement: function () {
      firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("achievements")
        .add(
          {
            achievementDate: this.forms.achievementDate,
            achievementTitle: this.forms.achievementTitle,
            achievementType: this.forms.achievementType,
            achievementFile: this.forms.achievementFile,
            achievementFileName: this.forms.achievementFileName,
          },
          { merge: true }
        )
        .then(() => {
          alert("Successfully Added");
          Vue.forceUpdate();
          this.$forceUpdate();
        });
    },
  },
};
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>