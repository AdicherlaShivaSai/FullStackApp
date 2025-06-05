module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      foreignKey: "UserId", // 🔑 explicitly define foreign key
      onDelete: "CASCADE",
    });

    Users.hasMany(models.Posts, {
      foreignKey: "UserId", // 🔑 explicitly define foreign key
      onDelete: "CASCADE",
    });
  };

  return Users;
};
