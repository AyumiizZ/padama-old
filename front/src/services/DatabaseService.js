import API from "@/services/Api.js";

export default {
  getAllPatient() {
    return API()
      .get("patient")
      .then((result) => {
        return result.data;
      });
  },
  addPatient(user_info) {
    return API().post("patient", user_info)
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
