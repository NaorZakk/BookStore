"use strict";
module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      ISBN: { type: DataTypes.BIGINT, primaryKey: true },
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      publicationDate: DataTypes.DATE,
      createdAt: DataTypes.DATE
    },
    {}
  );
  Book.associate = function(models) {
    Book.belongsTo(models.Genre, { targetKey: "id" });
  };
  return Book;
};
