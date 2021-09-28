const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");
const DatabaseController = require("./controllers/DatabaseController");
const base64Img = require('base64-img');
const path = require('path')

module.exports = (app) => {
  app.post(
    "/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );
  app.post("/login", AuthenticationController.login);
  app.get("/patient", DatabaseController.getPatient);
  app.post("/patient", DatabaseController.addPatient);
  app.get("/case", DatabaseController.getCase);
  app.post("/case", DatabaseController.addCase);
  // app.post("/upload", (req,res) => {
  //   const { image } = req.body;
  //   // console.log(req.body)
  //   // console.log(image)
  //   base64Img.img(image, path.join(__dirname, 'public'), Date.now(), function(err, filepath) {
  //     const pathArr = filepath.split('/')
  //     const filename = pathArr[pathArr.length -1];
  //     // console.log(`http://localhost:8081/static/${filename}`)
  //     res.status(200).json({
  //       success: true,
  //       url: `http://localhost:8081/static/${filename}`
  //     })
      
  //   });
  // })
  app.post("/upload", DatabaseController.addPhoto);
  app.get("/photoList", DatabaseController.listPhoto)
};
