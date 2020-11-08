<template>
  <div>
    <div class="row">
      <h3>Your Profile Details</h3>
    </div>
    <br />
    <form>
      <div class="form-group row">
        <label for="fname">Profile Picture :</label>
        <div class="custom-file w-25 mx-2">
          <input type="file" class="custom-file-input" id="inputGroupFile01" />
          <label class="custom-file-label" for="inputGroupFile01"
            >Choose file</label
          >
        </div>
      </div>
      <div class="form-group row w-50">
        <label for="fname">First Name :</label>
        <input
          type="name"
          class="form-control w-50 mx-2"
          id="fname"
          v-model="profile.fname"
          placeholder=""
        />
      </div>
      <div class="form-group row w-50">
        <label for="lname">Last Name :</label>
        <input
          type="name"
          class="form-control w-50 mx-2"
          id="lname"
          v-model="profile.lname"
          placeholder=""
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
          placeholder=""
        />
      </div>
      <div class="form-group row">
        <label for="bio">Bio :</label>
        <textarea
          class="form-control w-50 mx-2"
          id="bio"
          rows="3"
          v-model="profile.bio"
          placeholder=""
        ></textarea>
      </div>
      <div class="form-group row">
        <label for="fname">CV/Resume :</label>
        <div class="custom-file w-25 mx-2">
          <input
            type="file"
            class="custom-file-input w-25 mx-2"
            id="inputGroupFile01"
          />
          <label class="custom-file-label" for="inputGroupFile01"
            >Choose file</label
          >
        </div>
      </div>
    </form>
    <br />
    <div class="row">
      <button type="button" class="btn btn-primary">Update</button>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { db } from "../firebase";
export default {
  name: "profile",
  data() {
    return {
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
};
</script>