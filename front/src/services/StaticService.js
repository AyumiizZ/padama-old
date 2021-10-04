import API from "@/services/Api.js";

export default {
  getPDF() {
    return API().get("static/pdf1.pdf");
  },
  getVDO(case_id) {
    console.log(case_id);
    return [
      {
        src: "http://localhost:8081/static/video.mp4",
        // src: "//home/ayumiizz/med/padama/front/dist/vdo/video.mp4",
        type: "video/mp4",
      },
      {
        src: "http://localhost:8081/static/video2.mp4",
        // src: "//home/ayumiizz/med/padama/front/dist/vdo/video.mp4",
        type: "video/mp4",
      },
    ];
  },
};

// AuthenticationService.register({
//     email: 'aaa@gmail.com',
//     password: '1111'
// })
