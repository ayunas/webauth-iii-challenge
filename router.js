const router = require("express").Router();
const dbHelper = require("./data/dbHelper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();

router.get("/", (req, res) => {
  res.status(200).json({ message: "The router at /api is working" });
});

router.get("/users", (req, res) => {
  dbHelper
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/register", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  const hash = bcrypt.hashSync(password, 10);

  dbHelper
    .register({ username, password: hash })
    .then(id => {
      res
        .status(200)
        .json({ message: `${username} created with id # : ${id}` });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.post("/login", (req, res) => {
  const username = req.headers.username;
  const password = req.headers.password;

  dbHelper
    .login(username)
    .first()
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res
          .status(200)
          .json({ message: `Welcome ${user.username}`, token: token });
      } else {
        res
          .status(404)
          .json({ message: `${username} not found in the database` });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get("/logout", (req,res) => {
  
})

function generateToken(user) {
  const secret = process.env.TOKENSECRET;

  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
