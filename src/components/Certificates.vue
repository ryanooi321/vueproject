<template>
  <div>
    <div class="row">
      <h3>Your Certificate Details</h3>
    </div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Title</th>
          <th scope="col">Year</th>
          <th scope="col">FileName</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(certificate, counter) in certificates" v-bind:key="counter">
          <td>{{ counter + 1 }}</td>
          <td>{{ certificate.certificateTitle }}</td>
          <td>{{ certificate.certificateDate }}</td>
          <td>{{ certificate.certificateFileName }}</td>
          <td>
            <button
              @click="openModal(certificate.key)"
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
                      <label for="certificateTitle">Certificate Title :</label>
                      <input
                        type="name"
                        class="form-control w-50 mx-2"
                        v-model="modal.certificateTitle"
                        id="certificateTitle"
                        placeholder="Computer Forensics Certificate"
                      />
                    </div>
                    <div class="form-group row">
                      <label for="certificateDate">Year Of Certificate :</label>
                      <input
                        type="text"
                        required
                        id="certificateDate"
                        class="form-control w-25 mx-2"
                        placeholder="2020"
                        v-model="modal.certificateDate"
                      />
                    </div>

                    <div class="form-group row">
                      <label for="certificateUpload"
                        >Update Certificate :</label
                      >
                      <div class="mx-2">
                        <input
                          type="file"
                          id="updateFile"
                          @change="updateFile"
                        />
                      </div>

                      <p>Uploaded :</p>
                      <input
                        class="form-control w-50 mx-2"
                        placeholder="None"
                        v-model="modal.certificateFileName"
                        readonly
                      />

                      <input
                        class="form-control w-25 mx-2"
                        v-model="modal.certificateFile"
                        hidden
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <!--############################-->
                  <button
                    @click="updateCertificate(modal.id)"
                    type="button"
                    class="btn btn-primary"
                  >
                    Update
                  </button>
                  <button
                    @click="deleteCertificate(modal.id)"
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
      <h4>Add Certificate</h4>
    </div>
    <form>
      <div class="form-group row">
        <label for="certificateTitle">Certificate Title :</label>
        <input
          type="name"
          class="form-control w-50 mx-2"
          v-model="forms.certificateTitle"
          id="certificateTitle"
          placeholder="Computer Forensics Certificate"
        />
      </div>
      <div class="form-group row w-50">
        <label for="achievementDate">Year Of Certificate :</label>
        <input
          type="text"
          required
          id="certificateDate"
          class="form-control w-25 mx-2"
          placeholder="2020"
          v-model="forms.certificateDate"
        />
      </div>

      <div class="form-group row">
        <label for="fname">Upload Certificate</label>
        <div class="mx-2">
          <input type="file" @change="uploadFile" id="file" />
        </div>
      </div>
    </form>

    <br />
    <br />
    <div class="row">
      <button @click="addCertificate" type="button" class="btn btn-primary">
        Add Certificates
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { auth } from "../../firebase";
export default {
  name: "Certificate",
  data() {
    return {
      myModal: false,
      key: "",
      size: "",
      counter: 0,
      certificates: [],
      forms: {
        certificateTitle: "",
        certificateDate: "",
        certificateFile: "",
        certificateFileName: "",
      },
      modal: {
        certificateTitle: "",
        certificateDate: "",
        certificateFile: "",
        certificateFileName: "",
      },
    };
  },
  created() {
    var self = this;
    const ref = firebase
      .firestore()
      .collection("profiles")
      .doc(firebase.auth().currentUser.uid)
      .collection("certificates")
      .get()
      .then(function (querySnapshot) {
        self.certificates = [];
        querySnapshot.forEach(function (doc) {
          self.certificates.push({
            key: doc.id,
            certificateDate: doc.data().certificateDate,
            certificateFile: doc.data().certificateFile,
            certificateFileName: doc.data().certificateFileName,
            certificateTitle: doc.data().certificateTitle,
          });
        });
      });
  },
  methods: {
    deleteCertificate(id) {
      console.log("delete " + id);
      firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("certificates")
        .doc(id)
        .delete()
        /*.then(() => {
          router.push({
            name: "Certificates",
          });
        })*/
        .catch((error) => {
          alert("Error removing document: ", error);
        });
    },
    updateCertificate(id) {
      console.log("update " + id);
      const ref = firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("certificates")
        .doc(id)
        .set(
          {
            certificateDate: this.modal.certificateDate,
            certificateFile: this.modal.certificateFile,
            certificateFileName: this.modal.certificateFileName,
            certificateTitle: this.modal.certificateTitle,
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
        .collection("certificates")
        .doc(id)
        .get()
        .then((doc) => {
          this.modal.certificateTitle = doc.data().certificateTitle;
          this.modal.certificateDate = doc.data().certificateDate;
          this.modal.certificateFileName = doc.data().certificateFileName;
          this.modal.certificateFile = doc.data().certificateFile;
          this.modal.id = id;
        });
      this.myModal = true;
    },
    updateFile: function () {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#updateFile").files[0];
      const name = new Date() + "-" + file.name;
      const task = ref.child(name).put(file);
      this.modal.certificateFileName = file.name;
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          alert("File Uploaded Successful");
          this.modal.certificateFile = url;
        });
    },
    uploadFile: function () {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#file").files[0];
      const name = new Date() + "-" + file.name;
      const task = ref.child(name).put(file);
      this.forms.certificateFileName = file.name;
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          alert("File Uploaded Successful");
          this.forms.certificateFile = url;
        });
    },
    addCertificate: function () {
      firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .collection("certificates")
        .add(
          {
            certificateDate: this.forms.certificateDate,
            certificateTitle: this.forms.certificateTitle,
            certificateFile: this.forms.certificateFile,
            certificateFileName: this.forms.certificateFileName,
          },
          { merge: true }
        );
      /*.then(() => {
          router.push({
            name: "Certificates",
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