"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Books", {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isAlpha: true }
      },
      publicationDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: { min: 0 }
      },
      ISBN: {
        primaryKey: true,
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
      },
      GenreId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Books");
  }
};
