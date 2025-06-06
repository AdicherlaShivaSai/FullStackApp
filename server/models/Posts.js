module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });

    // ✅ THIS is the missing part — links Posts to Users
    Posts.belongsTo(models.Users, {
      foreignKey: {
        name: "UserId",
        field: "UserId",
        constraintName: 'fk_Posts_UserId', // This should match the foreign key in your Users model
        allowNull: false, // or true, depending on your logic
      },
      onDelete: "CASCADE",
    });
  };

  return Posts;
};
