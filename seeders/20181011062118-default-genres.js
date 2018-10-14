"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Genres",
      [
        { name: "Science fiction" },
        { name: "Satire" },
        { name: "Drama" },
        { name: "Action" },
        { name: "Romance" },
        { name: "Mystery" },
        { name: "Horror" }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Genres", null, {});
  }
};
