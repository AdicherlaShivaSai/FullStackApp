module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    // Your other fields like PostId, etc.
  });

  Likes.associate = (models) => {
    Likes.belongsTo(models.Users, {
      foreignKey: {
        name: 'fk_likes_user', // <-- custom FK name (must be unique)
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    // If Likes also belongs to Post:
    Likes.belongsTo(models.Posts, {
      foreignKey: {
        name: 'fk_likes_post',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };

  return Likes;
};
