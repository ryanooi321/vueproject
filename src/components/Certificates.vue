<template>
  <div>
    <div class="row">
      <h3>Your Certificate Details</h3>
    </div>
    <br />
    <div
      class="certificate"
      v-for="(certificate, counter) in certificates"
      v-bind:key="counter"
    >
      <br />
      <div class="row">
        <h4>
          <label for="certificateCounter"> Certificate {{ counter + 1 }}</label>
        </h4>
      </div>
      <form>
        <div class="form-group row">
          <label for="certificateTitle">Certificate Title :</label>
          <input
            type="name"
            class="form-control w-50 mx-2"
            v-model="certificate.certificateTitle"
            id="certificateTitle"
            placeholder="Computer Forensics Certificate"
          />
        </div>
        <div class="row">
          <label for="example-datepicker">Achieved date :</label>
          <b-form-datepicker
            id="example-datepicker"
            v-model="certificate.certificateDate"
            class="mb-2 w-25 mx-2"
          ></b-form-datepicker>
          <!--<p>Value: '{{ value }}'</p>-->
        </div>

        <div class="form-group row">
          <label for="fname">Upload Certificate</label>
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
      <div class="row">
        <button
          @click="deleteCertificates(counter)"
          type="button"
          class="btn btn-danger"
        >
          Remove
        </button>
      </div>
    </div>
    <br />
    <br />
    <div class="row">
      <button type="button" class="btn btn-primary">Update</button
      ><button
        @click="addCertificate()"
        type="button"
        class="btn btn-success mx-2"
      >
        Add Another Certificate
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Certificate",
  data() {
    return {
      certificates: [
        {
          certificateTitle: "",
          certificateDate: "",
          certificateFile: "",
        },
      ],
    };
  },
  methods: {
    addCertificate() {
      this.certificates.push({
        certificateTitle: "",
        certificateDate: "",
        certificateFile: "",
      });
    },
    deleteCertificates(counter) {
      this.certificates.splice(counter, 1);
    },
  },
};
</script>