module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define("Case", {
    patientID: DataTypes.STRING,
    visitDate: DataTypes.STRING,
    diagnosis: DataTypes.STRING,
    phyExam: DataTypes.STRING,
  });
  return Case;
};
