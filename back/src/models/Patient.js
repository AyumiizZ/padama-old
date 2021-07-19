module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("Patient", {
    regis_id: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    age: DataTypes.STRING,
  });
  return Patient;
};
