module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define("Case", {
    patientID: DataTypes.STRING,
    visitDate: DataTypes.DATE,
    diagnosis: DataTypes.STRING,
    type: DataTypes.STRING,
    onset: DataTypes.STRING,
    phyExam: DataTypes.STRING,
    operation: DataTypes.STRING,
    operativeDate: DataTypes.DATE,
    operativeNote: DataTypes.STRING,
    bloodloss: DataTypes.FLOAT,
    operativeTime: DataTypes.FLOAT,
    complication: DataTypes.STRING,
    other: DataTypes.STRING,
  });
  return Case;
};
