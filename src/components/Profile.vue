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
          placeholder="John"
        />
      </div>
      <div class="form-group row w-50">
        <label for="lname">Last Name :</label>
        <input
          type="name"
          class="form-control w-50 mx-2"
          id="lname"
          placeholder="Doe"
        />
      </div>
      <div class="form-group row">
        <label for="exampleFormControlInput1">Email address :</label>
        <input
          type="email"
          class="form-control w-50 mx-2"
          id="email"
          placeholder="name@example.com"
        />
      </div>
      <div class="form-group row">
        <label for="phone">Phone Number :</label>
        <input
          class="form-control w-25 mx-2"
          id="phone"
          placeholder="0123456789"
        />
      </div>
      <div class="form-group row">
        <label for="bio">Bio :</label>
        <textarea class="form-control w-50 mx-2" id="bio" rows="3"></textarea>
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
export default {};
</script>