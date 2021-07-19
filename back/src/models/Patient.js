module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("Patient", {
    regisID: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthDate: DataTypes.DATE,
  });
  return Patient;
};
