<template>
  <div>
    <div class="row">
      <h3>Your Project Details</h3>
    </div>
    <br />
    <div
      class="project"
      v-for="(project, counter) in projects"
      v-bind:key="counter"
    >
      <br />
      <div class="row">
        <h4>
          <label for="projectCounter"> Project {{ counter + 1 }}</label>
        </h4>
      </div>
      <form>
        <div class="form-group row w-50">
          <label for="projectType">Project Type :</label>
          <select
            class="form-control w-25 mx-2"
            id="achievementType"
            v-model="project.projectType"
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
            v-model="project.projectTitle"
          />
        </div>
        <div class="row">
          <label for="example-datepicker">Project date :</label>
          <b-form-datepicker
            id="example-datepicker"
            v-model="project.projectDate"
            class="mb-2 w-25 mx-2"
          ></b-form-datepicker>
          <!--<p>Value: '{{ value }}'</p>-->
        </div>

        <div class="form-group row">
          <label for="fname">Upload Project details</label>
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
          @click="deleteProjects(counter)"
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
      ><button @click="addProject()" type="button" class="btn btn-success mx-2">
        Add Another Project
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      projects: [
        {
          projectType: "",
          projectTitle: "",
          projectDate: "",
          projectFile: "",
        },
      ],
    };
  },
  methods: {
    addProject() {
      this.projects.push({
        projectType: "",
        projectTitle: "",
        projectDate: "",
        projectFile: "",
      });
    },
    deleteProjects(counter) {
      this.projects.splice(counter, 1);
    },
  },
};
</script>