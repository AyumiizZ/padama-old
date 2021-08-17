const { Patient, File, Case } = require("../models");
const { register } = require("./AuthenticationController");


module.exports = {
  async getPatient(req, res) {
    try {
      const patient = await Patient.findAll({ limit: 1000 });
      console.log(patient)
      res.send(patient);
    } catch (err) {
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
      const patientCase = await Case.findAll({ limit: 1000 });
      // const patientCase = await Case.findAll({
      //   attributes: [
      //     'UserID',
      //     [db.sequelize.fn('SUM', db.sequelize.col('score')), 'score']
      //   ],
      //   include: [{
      //     model: db.User,
      //     required: true,
      //     attributes: ['username']
      //   }],
      //   group: ['UserID']});
      console.log(patientCase)
      res.send(patientCase);
    } catch (err) {
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to fetch the songs",
      });
    }
  },
  async addCase(req, res) {
    try {
      console.log(req.body)
      processedBody = req.body
      processedBody.diagnosis = req.body.diagnosis.join(', ')
      console.log(processedBody)
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
      newBody = req.body
      const file = await File.create(req.body);
      // res.send(file.toJSON());
    } catch (err) {
      // email already exits
      res.status(500).send({
        error: "An error has occured trying to create the songs",
      });
    }
  },
};
