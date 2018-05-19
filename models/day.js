module.exports = function (sequelize, DataTypes) {

  var day = sequelize.define('day', {
    day_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      validate: {
        notNull: true,
        isDate: true
      }
    }
  });


  day.associate = function (models) {
    day.hasMany(models.recipe)
    day.belongsTo(models.user)

  }

  return day;

};