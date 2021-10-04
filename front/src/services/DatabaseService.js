import API from "@/services/Api.js";

export default {
  getAllPatient() {
    return API()
      .get("patientList")
      .then((result) => {
        return result.data;
      });
  },
  getPatient(patientID) {
    return API()
      .get("patient", { params: patientID })
      .then((result) => {
        return result.data;
      });
  },
  queryPatient(patientID) {
    return API()
      .get("query-patient", { params: patientID })
      .then((result) => {
        return result.data;
      });
  },
  addPatient(user_info) {
    return API().post("patient", user_info);
  },
  getCaseList() {
    return API()
      .get("case-list")
      .then((result) => {
        return result.data;
      });
  },
  getCase(patientID) {
    console.log(patientID);
    return API()
      .get("case", { params: patientID })
      .then((result) => {
        return result.data;
      });
  },
  queryCase(tagList){
    return API()
      .get("query-tag", { params: tagList })
      .then((result) => {
        return result.data;
      });
  },
  addCase(case_info) {
    return API().post("case", case_info);
  },
  upload(image) {
    return API().post("upload", image);
  },
  getPhotoList() {
    return API()
      .get("photoList")
      .then((result) => {
        return result.data;
      });
  },
  //   getPDF() {
  //     API().get("static/pdf1.pdf", {
  //         params: {
  //           product: this.product
  //         }
  //     })
  //   },
};

// AuthenticationService.register({
//     email: 'aaa@gmail.com',
//     password: '1111'
// })
