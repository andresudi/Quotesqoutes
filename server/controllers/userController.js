const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({
    email: email
  })
    .then(user => {
      if (!user || user == undefined) {
        User.create({
          name: name,
          email: email,
          password: password
        })
          .then(data => {
            let name = data.name;
            let email = data.email;
            let password = data.password;

            if (password.length < 7) {
              res.status(400).json({
                message: "password minimal 6"
              });
            } else {
              res.status(201).json({
                success: true,
                message: "Account helo registered"
              });
            }
          })
          .catch(err => {
            res.status(400).json({
              message: err.message
            });
          });
      } else {
        res.status(400).json({
          message: "email is already exist"
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email: email
  })
    .then(data_user => {
      console.log('ini data user',data_user);
      
      if (data_user) {
        let check_pass = bcrypt.compareSync(password, data_user.password);
        if (check_pass || password == data_user.password) {
          let token = jwt.sign(
            {
              id: data_user._id,
              name: data_user.name,
              email: data_user.email
            },
            process.env.jwt_secret
          );
          res.status(201).json({
            token
          });
        } else {
          res.status(400).json({
            message: `Password is invalid!`
          });
        }
      } else {
        res.status(400).json({
          message: `Email is invalid!`
        });
      }
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
};

module.exports = {
  register,
  login
};
