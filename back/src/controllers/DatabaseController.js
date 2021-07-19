const { Patient } = require("../models");

module.exports = {
  async index(req, res) {
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
  async post(req, res) {
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
};
