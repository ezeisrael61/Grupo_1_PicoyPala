const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User, UserDetail, Sequelize } = require("../database/models");
const { Op } = Sequelize;
const fs = require("fs");
module.exports = {
      users: (req, res) => {
            User.findAll({
                  include: [{ association: "userdetail" }],
            }).then((users) => {
                  return res.render("admin/adminusers", { users, session: req.session });
            });
      },
      updateUserAdmin: (req, res) => {
            res.send("Aca se podra modificar el mail, y el tipo de acceso del Usuario , pronto estara funcional");
      },
};
