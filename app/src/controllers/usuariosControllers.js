const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../database");

const dbUsers = readJSON("users.json");

module.exports = {
      login: (req, res) => {
            return res.render("users/login");
      },
      registro: (req, res) => {
            return res.render("users/registro");
      },
      store: (req, res) => {
            const errors = validationResult(req);

            if (errors.isEmpty()) {
                  let lastId = dbUsers[dbUsers.length - 1].id;
                  let newUser = {
                        id: lastId + 1,
                        firstName: req.body.nombre,
                        lastName: req.body.apellido,
                        email: req.body.email,
                        password: req.body.pass,
                        avatar: req.file ? req.file.filename : "defauld.png",
                  };
                  dbUsers.push(newUser);
                  writeJSON("users.json", dbUsers);
                  return res.redirect("/");
            } else {
                  res.render("users/registro", {
                        errors: errors.mapped(),
                        old: req.body,
                  });
            }
      },
};
