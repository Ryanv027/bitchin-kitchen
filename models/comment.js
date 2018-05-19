module.exports = function (sequelize, DataTypes) {

  var comment = sequelize.define('comment', {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(50),
      validate: {
        len: [2, 50],
        isAlphanumeric: true,
        notNull: true
      }
    },
    comment_text: {
      type: DataTypes.STRING
    }
  });

  comment.associate = function (models) {
    comment.belongsTo(models.user)
  };

  return comment;

};