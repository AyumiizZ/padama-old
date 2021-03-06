const { Patient, File, Case } = require("../models");
const { register } = require("./AuthenticationController");
const Sequelize = require("sequelize");
const base64Img = require("base64-img");
// var crypto = require('crypto');
const path = require('path')
const { v4: uuidv4 } = require('uuid');

// const uuidv4 = () => {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//     (
//       c ^
//       (window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//     ).toString(16)
//   );
// }
module.exports = {

  async getPatientList(req, res) {
    try {
      const patient = await Patient.findAll({ limit: 10000 });
      // console.log(patient);
      res.send(patient);
    } catch (err) {
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to fetch the songs",
      });
    }
  },
  async getPatient(req, res) {
    try {
      const patient = await Patient.findAll({where: {
        patientID: req.query._id
      }});

      // console.log(patient);
      res.send(patient);
    } catch (err) {
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to fetch the songs",
      });
    }
  },
  async queryPatient(req, res) {
    try {
      // console.log(req)
      const patient = await Patient.findAll({where: {
        patientID: {[Sequelize.Op.like]: '%'+req.query._id+'%'}
      }});
      // console.log(patient);
      res.send(patient);
    } catch (err) {
      console.log(err)
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to fetch the songs",
      });
    }
  },
  // async getCase(req, res) {
  //   try {
  //     const patient = await Patient.findAll({ limit: 1000 });
  //     console.log(patient)
  //     res.send(patient);
  //   } catch (err) {
  //     // email already exits
  //     res.status(500).send({
  //       error: "An error has occured trying to fetch the songs",
  //     });
  //   }
  // },
  async addPatient(req, res) {
    try {
      const patient = await Patient.create(req.body);
      res.send(patient.toJSON());
    } catch (err) {
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to create the songs",
      });
    }
  },
  async getCase(req, res) {
    try {
      const patientCase = await Case.findAll({
        where: {
          patientID: req.query._id
        }
      });
      // console.log(patientCase);
      res.send(patientCase);
    } catch (err) {
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to fetch the songs",
      });
    }
  },
  async getCaseList(req, res) {
    try {
      const patientCase = await Case.findAll({ limit: 10000 });
      // console.log(patientCase);
      res.send(patientCase);
    } catch (err) {
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to fetch the songs",
      });
    }
  },
  
  async queryCaseTag(req, res) {
    try {
      var diagList = []
      for (let i = 0; i < req.query.taglist.length; i++){
        diagList.push({
          diagnosis: {
            [Sequelize.Op.like]: '%'+req.query.taglist[i]+'%'
          }
        })
      }
      const patientCase = await Case.findAll({where: {
        [Sequelize.Op.and]: diagList}
      });
      // console.log(patient);
      // {
      //   patientID: {[Sequelize.Op.like]: '%'+req.query._id+'%'}
      // }
      res.send(patientCase);
    } catch (err) {
      console.log(err)
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to fetch the songs",
      });
    }
  },
  async addCase(req, res) {
    try {
      console.log(req.body);
      processedBody = req.body;
      // processedBody.diagnosis = req.body.diagnosis.join(", ");
      console.log(processedBody);
      const newCase = await Case.create(req.body);
      res.send(newCase.toJSON());
    } catch (err) {
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to create the songs",
      });
    }
  },
  async addFile(req, res) {
    try {
      newBody = req.body;
      const file = await File.create(req.body);
      // res.send(file.toJSON());
    } catch (err) {
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to create the songs",
      });
    }
  },
  async addPhoto(req, res) {
    try {
      const { image, real_filename } = req.body;
      const timestamp = Date.now()
      
      base64Img.img(
        image,
        path.join(__dirname, '..', "public"),
        timestamp,
        async function (err, filepath) {
          const pathArr = filepath.split("/");
          const filename = pathArr[pathArr.length - 1];
          // console.log(`http://localhost:8081/static/${filename}`)
          const file = await File.create({
            fileID: timestamp,
            fileLocation: `/static/${filename}`,
            type: "photo",
          });
          res.status(200).json({
            success: true,
            url: `http://localhost:8081/static/${filename}`,
          });
        }
      );
    } catch (err) {
      // email already exits
      console.log(err)
      res.status(500).send({
        error: "An error has occured trying to create the songs",
      });
    }
  },
  async listPhoto(req, res) {
    try {
      const file = await File.findAll({ limit: 1000 });
      res.send(file);
    } catch (err) {
      console.log(err)
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to create the songs",
      });
    }
  },

};
