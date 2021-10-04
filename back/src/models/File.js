module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define("File", {
      fileID: DataTypes.STRING,
      fileLocation: DataTypes.STRING,
      type: DataTypes.STRING,
    });
    return File;
  };
  