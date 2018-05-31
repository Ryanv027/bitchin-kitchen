module.exports = function (sequelize, DataTypes) {

  var user = sequelize.define('user', {
    user_name: {
      type: DataTypes.STRING(50),
      // validate: {
      //   len: [2, 50],
      //   // isAlphanumeric: true,
      //   notNull: true
      // }
    },
    email: {
      type: DataTypes.STRING(30),
      // validate: {
      //   isEmail: true, 
      //   notNull: true
      // }
    },
    bio: {
      type: DataTypes.STRING
    },
    fuid: {
      type: DataTypes.STRING,
      // notNull: true
    },
    });

  user.associate = function (models) {

    user.hasMany(models.recipe, { onDelete: 'cascade' })

    user.hasMany(models.comment, { onDelete: 'cascade' })

    user.hasMany(models.day, { onDelete: 'cascade' })

  };

  return user;
};