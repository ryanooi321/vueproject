<template>
  <div>
    <p>Hello</p>
    <input v-model="url" />
    <button v-on:click="submitUrl">DAMN</button>
    <p v-if="output != null">{{ this.output }}</p>
  </div>
</template>

<script>
export default {
  name: "HOW",
  data() {
    return {
      url: "",
      output: null,
    };
  },
  methods: {
    convertImgToBase64(url, callback, outputFormat) {
      var canvas = document.createElement("CANVAS");
      var ctx = canvas.getContext("2d");
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL(outputFormat || "image/png");
        callback.call(this, dataURL);
        // Clean up
        canvas = null;
      };
      img.src = url;
    },
    submitUrl() {
      console.log("oof");
      var imageUrl = this.url;
      console.log("imageUrl", imageUrl);
      this.convertImgToBase64(imageUrl, function (base64Img) {
        this.output = base64Img;
        console.log(base64Img);
      });
      event.preventDefault();
    },
  },
};
</script>