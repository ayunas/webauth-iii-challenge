const db = require("./dbConfig");

function getUsers() {
  return db("users");
}

module.exports = {
  getUsers: getUsers
};
