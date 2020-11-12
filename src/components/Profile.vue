<template>
  <div>
    <div class="row">
      <h3>Your Profile Details</h3>
    </div>
    <br />
    <form>
      <div class="form-group row">
        <label for="fname">Profile Picture :</label>
        <div class="mx-2">
          <input
            type="file"
            @change="uploadImage"
            id="photo"
            accept="image/*"
          />
        </div>
        <p>Uploaded :</p>
        <img id="imageUrl" style="width: 60px" />
      </div>
      <input v-model="this.link" class="form-control w-50 mx-2" type="hidden" />
      <div class="form-group row w-50">
        <label for="fname">First Name :</label>
        <input
          type="name"
          class="form-control w-50 mx-2"
          id="fname"
          v-model="profile.fname"
          placeholder="First Name"
        />
      </div>
      <div class="form-group row w-50">
        <label for="lname">Last Name :</label>
        <input
          type="name"
          class="form-control w-50 mx-2"
          id="lname"
          v-model="profile.lname"
          placeholder="Last Name"
        />
      </div>
      <div class="form-group row">
        <label for="exampleFormControlInput1">Email address :</label>
        <input
          type="email"
          class="form-control w-50 mx-2"
          id="email"
          v-model="profile.email"
          placeholder=""
          readonly
        />
      </div>
      <div class="form-group row">
        <label for="phone">Phone Number :</label>
        <input
          class="form-control w-25 mx-2"
          id="phone"
          v-model="profile.phoneNum"
          placeholder="Phone Number"
        />
      </div>
      <div class="form-group row">
        <label for="bio">Bio :</label>
        <textarea
          class="form-control w-50 mx-2"
          id="bio"
          rows="3"
          v-model="profile.bio"
          placeholder="Bio"
        ></textarea>
      </div>
      <div class="form-group row">
        <label for="fname">CV/Resume :</label>
        <div class="mx-2">
          <input type="file" @change="uploadFile" id="file" />
        </div>
        <p>Uploaded :</p>
        <input
          class="form-control w-25 mx-2"
          placeholder="None"
          v-model="this.resumeFileName"
          readonly
        />
        <input
          v-model="this.resumeUrl"
          class="form-control w-50 mx-2"
          type="hidden"
        />
      </div>
    </form>
    <br />
    <div class="row">
      <button @click="update" class="btn btn-primary">Update</button>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { auth } from "../../firebase";
export default {
  name: "profile",
  data() {
    return {
      selectedFile: null,
      link: "",
      profileFileName: "",
      resumeUrl: "",
      resumeFileName: "",
      profile: {
        fname: "",
        lname: "",
        bio: "",
        email: "",
        phoneNum: "",
      },
    };
  },
  created() {
    const ref = firebase
      .firestore()
      .collection("profiles")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.profile.fname = doc.data().fname;
          this.profile.lname = doc.data().lname;
          this.profile.bio = doc.data().bio;
          this.profile.email = doc.data().email;
          this.profile.phoneNum = doc.data().phoneNum;
          this.resumeFileName = doc.data().resumeFileName;
          this.resumeUrl = doc.data().resumeUrl;
          this.profileFileName = doc.data().profileFileName;
          this.link = doc.data().profileUrl;
          if (this.link != "") {
            const image = document.querySelector("#imageUrl");
            image.src = this.link;
          }
        }
      });
    /*ref.get().then((doc) => {
      if (doc.exists) {
        this.fname = doc.data().fname;
        this.lname = doc.data().lname;
        this.bio = doc.data().bio;
        this.email = doc.data().email;
        this.phoneNum = doc.data().phoneNum;
      }
    });*/
  },
  methods: {
    uploadFile: function () {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#file").files[0];
      const name = new Date() + "-" + file.name;
      const task = ref.child(name).put(file);
      this.resumeFileName = file.name;
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          alert("CV/Resume Uploaded Successful");
          this.resumeUrl = url;
        });
    },
    uploadImage: function () {
      const ref = firebase.storage().ref();
      const file = document.querySelector("#photo").files[0];
      const name = new Date() + "-" + file.name;
      const task = ref.child(name).put(file);
      this.profileFileName = file.name;
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          console.log(url);
          this.link = url;
          //alert("Image Upload Successful");
          const image = document.querySelector("#imageUrl");
          image.src = url;
        });
    },
    update: function () {
      console.log("fname " + this.profile.fname);
      firebase
        .firestore()
        .collection("profiles")
        .doc(firebase.auth().currentUser.uid)
        .set(
          {
            fname: this.profile.fname,
            lname: this.profile.lname,
            phoneNum: this.profile.phoneNum,
            bio: this.profile.bio,
            profileUrl: this.link,
            resumeUrl: this.resumeUrl,
            profileFileName: this.profileFileName,
            resumeFileName: this.resumeFileName,
          },
          { merge: true }
        )
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        })
        .then(() => {
          alert("Updated Successfully!");
        });
    },
  },
};
</script>