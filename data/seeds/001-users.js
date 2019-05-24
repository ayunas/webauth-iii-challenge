const encrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "user1", password: encrypt.hashSync("pass", 10) },
        { username: "user2", password: encrypt.hashSync("pass", 10) },
        { username: "user3", password: encrypt.hashSync("pass", 10) }
      ]);
    });
};
