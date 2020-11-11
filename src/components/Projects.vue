<template>
  <div>
    <div class="row">
      <h3>Your Project Details</h3>
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
        <tr v-for="(project, counter) in projects" v-bind:key="counter">
          <td>{{ counter + 1 }}</td>
          <td>{{ project.projectType }}</td>
          <td>{{ project.projectTitle }}</td>
          <td>{{ project.projectDate }}</td>
          <td>{{ project.projectFileName }}</td>
          <td>
            <button
              @click="openModal(project.key)"
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
                      <label for="projectType">Project Type :</label>
                      <select
                        class="form-control w-25 mx-2"
                        id="projectType"
                        v-model="modal.projectType"
                      >
                        <option>Charity</option>
                        <option>CSR</option>
                        <option>Volunteering</option>
                        <option>Others</option>
                      </select>
                    </div>
                    <div class="form-group row">
                      <label for="projectTitle">Project Title :</label>
                      <input
                        type="name"
                        class="form-control w-50 mx-2"
                        id="projectTitle"
                        placeholder="CSR Project 2019"
                        v-model="modal.projectTitle"
                      />
                    </div>
                    <div class="form-group row">
                      <label for="projectDate">Year Of Project :</label>
                      <input
                        type="text"
                        required
                        id="projectDate"
                        class="form-control w-25 mx-2"
                        placeholder="2020"
                        v-model="modal.projectDate"
                      />
                    </div>

                    <div class="form-group row">
                      <label for="projectUpload">Update Project details</label>
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
                        v-model="modal.projectFileName"
                        readonly
                      />
                      <input
                        class="form-control w-25 mx-2"
                        v-model="modal.projectFile"
                        hidden
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    @click="updateProject(modal.id)"
                    type="button"
                    class="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteProject(modal.id)"
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
      <h4>Add Project</h4>
    </div>
    <form>
      <div class="form-group row w-50">
        <label for="projectType">Project Type :</label>
        <select
          class="form-control w-25 mx-2"
          id="achievementType"
          v-model="forms.projectType"
        >
          <option>Charity</option>
          <option>CSR</option>
          <option>Volunteering</option>
          <option>Others</option>
        </select>
      </div>
      <div class="form-group row">
        <label for="projectTitle">Project Title :</label>
        <input
          type="name"
          class="form-control w-50 mx-2"
          id="projectTitle"
          placeholder="CSR Project 2019"
          v-model="forms.projectTitle"
        />
      </div>
      <div class="form-group row w-50">
        <label for="projectDate">Year Of Project :</label>
        <input
          type="text"
          required
          id="projectDate"
          class="form-control w-25 mx-2"
          placeholder="2020"
          v-model="forms.projectDate"
        />
      </div>

      <div class="form-group row">
        <label for="fname">Upload Project details</label>
        <div class="mx-2">
          <input type="file" @change="uploadFile" id="file" />
        </div>
      </div>
    </form>
    <br />
    <br />
    <div class="row">
      <button @click="addProject" type="button" class="btn btn-primary">
        Add Project
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { auth } from "../firebase";
import router from "../router";
import Vue from "vue";
export default {
  name: "Project",
  data() {
    return {
      projects: [],
      myModal: false,
      key: "",
      size: "",
      counter: 0,
      forms: {
        projectType: "",
        projectTitle: "",
        projectDate: "",
        projectFile: "",
        projectFileName: "",
      },
      modal: {
        projectType: "",
        projectTitle: "",
        projectDate: "",
        projectFile: "",
        projectFileName: "",
      },
    };
  },
  created() {
    var self = this;
    const ref = firebase
      .firestore()
      .collection("profiles")
      .doc(firebase.auth().currentUser.uid)
      .collection("projects")
      .get()
      .then(function (querySnapshot) {
        self.projects = [];
        querySnapshot.forEach(function (doc) {
          self.projects.push({
            key: doc.id,
            projectTitle: doc.data().projectTitle,
            projectDate: doc.data().projectDate,
            projectType: doc.data().projectType,
            projectFileName: doc.data().projectFileName,
            projectFile: doc.data().projectFile,
          });
        });
      });
  },
  methods: {
    deleteProject(id) {
      console.log("delete " + id);
      firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("projects")
        .doc(id)
        .delete()
        /*.then(() => {
          router.push({
            name: "projects",
          });
        })*/
        .catch((error) => {
          alert("Error removing document: ", error);
        });
    },
    updateProject(id) {
      console.log("update " + id);
      const ref = firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("projects")
        .doc(id)
        .set(
          {
            projectDate: this.modal.projectDate,
            projectFile: this.modal.projectFile,
            projectFileName: this.modal.projectFileName,
            projectTitle: this.modal.projectTitle,
            projectType: this.modal.projectType,
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
        .collection("projects")
        .doc(id)
        .get()
        .then((doc) => {
          this.modal.projectTitle = doc.data().projectTitle;
          this.modal.projectType = doc.data().projectType;
          this.modal.projectDate = doc.data().projectDate;
          this.modal.projectFileName = doc.data().projectFileName;
          this.modal.projectFile = doc.data().projectFile;
          this.modal.id = id;
        });
      this.myModal = true;
    },
    updateFile: function () {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#updateFile").files[0];
      const name = new Date() + "-" + file.name;
      const task = ref.child(name).put(file);
      this.modal.projectFileName = file.name;
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          alert("File Uploaded Successful");
          this.modal.projectFile = url;
        });
    },
    uploadFile: function () {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#file").files[0];
      const name = new Date() + "-" + file.name;
      const task = ref.child(name).put(file);
      this.forms.projectFileName = file.name;
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          alert("File Uploaded Successful");
          this.forms.projectFile = url;
        });
    },
    addProject: function () {
      firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("projects")
        .add(
          {
            projectDate: this.forms.projectDate,
            projectTitle: this.forms.projectTitle,
            projectType: this.forms.projectType,
            projectFile: this.forms.projectFile,
            projectFileName: this.forms.projectFileName,
          },
          { merge: true }
        );
      /*.then(() => {
          router.push({
            name: "projects",
          });
        });*/
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