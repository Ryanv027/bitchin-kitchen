module.exports = function (sequelize, DataTypes) {

  var recipe = sequelize.define('recipe', {
    recipe_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_name: {
      type: DataTypes.STRING(50),
      validate: {
        len: [2, 50],
        isAlphanumeric: true,
        notNull: true
      }
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    recipe_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    ingredients: {
      type: DataTypes.STRING
    },
    directions: {
      type: DataTypes.STRING
    },
    chef: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.STRING
    }
  });

  recipe.associate = function (models) {
    recipe.belongsTo(models.user)
    recipe.belongsToMany(models.user)
  }

  return recipe;

};