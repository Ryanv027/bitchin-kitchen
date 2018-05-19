module.exports = function (sequelize, DataTypes) {

  var user = sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(50),
      validate: {
        len: [2, 50],
        isAlphanumeric: true,
        notNull: true
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING(30),
      validate: {
        isEmail: true,
        notNull: true
      }
    },
    bio: {
      type: DataTypes.STRING
    }
  });

  user.associate = function (models) {

    user.hasMany(models.recipe, { onDelete: 'cascade' })

    user.hasMany(models.comment, { onDelete: 'cascade' })

    user.hasMany(models.day, { onDelete: 'cascade' })

  };

  return user;
};