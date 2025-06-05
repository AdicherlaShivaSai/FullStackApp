module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    // Your other fields like PostId, etc.
  });

  return Likes;
};
