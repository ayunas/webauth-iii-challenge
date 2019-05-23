const router = require("express").Router();
const dbHelper = require("./data/dbHelper");
// const db = require("./data/dbConfig");

router.get("/", (req, res) => {
  res.status(200).json({ message: "The router at /api is working" });
});

router.get("/users", (req, res) => {
  // db("users")
  //   .then(users => res.status(200).json(users))
  //   .catch(err => res.status(500).json(err.message));
  dbHelper
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
