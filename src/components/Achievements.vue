<template>
  <div>
    <div class="row">
      <h3>Your Achievements Details</h3>
    </div>
    <br />
    <div
      class="achievement"
      v-for="(achievement, counter) in achievements"
      v-bind:key="counter"
    >
      <br />
      <div class="row">
        <h4>
          <label for="achievementCounter"> Achievement {{ counter + 1 }}</label>
        </h4>
      </div>
      <form>
        <div class="form-group row w-50">
          <label for="achievementType">Achievement Type :</label>
          <select
            class="form-control w-25 mx-2"
            id="achievementType"
            v-model="achievement.achievementType"
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
            v-model="achievement.achievementTitle"
          />
        </div>
        <div class="row">
          <label for="achievementDate">Achieved date :</label>
          <b-form-datepicker
            id="achievementDate"
            class="mb-2 w-25 mx-2"
            v-model="achievement.achievementDate"
          ></b-form-datepicker>
          <!--<p>Value: '{{ value }}'</p>-->
        </div>

        <div class="form-group row">
          <label for="fname">Upload Achievement :</label>
          <div class="custom-file w-25 mx-2">
            <input
              type="file"
              class="custom-file-input w-25 mx-2"
              id="achievementFile"
            />
            <label class="custom-file-label" for="inputGroupFile01"
              >Choose file</label
            >
          </div>
        </div>
      </form>
      <div class="row">
        <button
          @click="deleteAchievement(counter)"
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
        @click="addAchievement()"
        type="button"
        class="btn btn-success mx-2"
      >
        Add Another Achievement
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Achievement",
  data() {
    return {
      achievements: [
        {
          achievementType: "",
          achievementTitle: "",
          achievementDate: "",
          achievementFile: "",
        },
      ],
    };
  },
  methods: {
    addAchievement() {
      this.achievements.push({
        achievementType: "",
        achievementTitle: "",
        achievementDate: "",
        achievementFile: "",
      });
    },
    deleteAchievement(counter) {
      this.achievements.splice(counter, 1);
    },
  },
};
</script>