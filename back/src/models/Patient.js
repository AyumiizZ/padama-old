module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("Patient", {
    patientID: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    sex: DataTypes.STRING,
    ud: DataTypes.STRING,
    smoking: DataTypes.STRING
  });
  return Patient;
};
