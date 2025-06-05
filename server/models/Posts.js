module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define('Posts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: 'cascade'
        });
        Posts.hasMany(models.Likes, {
            onDelete: 'cascade'
        });
    }
    Posts.belongsTo(Users, {
          foreignKey: {
            name: 'fk_user_id', // <- give it a unique name
            allowNull: true
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });

    return Posts;
}
