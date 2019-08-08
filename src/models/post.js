

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Post.associate = (models) => {
    // associations can be defined here
  };
  return Post;
};
