const db = require("./dbConfig");

function getUsers() {
  return db("users");
}

function register(newUser) {
  return db("users").insert(newUser);
}

function login(username) {
  return db("users").where({ username: username });
}

module.exports = {
  getUsers: getUsers,
  register: register,
  login: login
};
