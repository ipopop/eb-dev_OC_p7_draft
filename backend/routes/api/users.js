const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// Get all users
router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: ["usrId", "usrPseudo", "usrName", "usrMail"],
  }).catch(errHandler);
  res.json(users);
});

// Get single user
router.get("/:usrId", async (req, res) => {
  const user = await User.findAll({
    where: {
      usrId: req.params.usrId,
    },
  }).catch(errHandler);

  if (user && user.length > 0) {
    res.json(user);
  } else {
    res.status(400).json({ msg: "user not found" });
  }
});

// Create user
router.post("/", async (req, res) => {
  const newUser = {
    usrPseudo: req.body.usrPseudo,
    usrName: req.body.usrName,
    usrMail: req.body.usrMail,
    usrPasswd: req.body.usrPasswd,
  };

  if (!newUser.usrPseudo || !newUser.usrName || !newUser.usrMail || !newUser.usrPasswd) {
    return res.status(400).json({ msg: "Please include : pseudo, name, email and password" });
  }

  const user = await User.create(newUser).catch(errHandler);

  if (user) {
    res.json(user);
  } else {
    res.status(500).json({ msg: "internal db error occured" });
  }
});

// Update user
router.put("/:usrId", async (req, res) => {
  const user = await User.findAll({
    where: {
      usrId: req.params.usrId,
    },
  }).catch(errHandler);

  if (user && user.length > 0) {
    const updUser = req.body;
    const result = await User.update(
      {
        usrPseudo: updUser.usrPseudo ? updUser.usrPseudo : user[0].usrPseudo,
        usrName: updUser.usrName ? updUser.usrName : user[0].usrName,
        usrMail: updUser.usrMail ? updUser.usrMail : user[0].usrMail,
        usrPasswd: updUser.usrPasswd ? updUser.usrPasswd : user[0].usrPasswd
      },
      {
        where: {
          usrId: req.params.usrId,
        },
      }
    ).catch(errHandler);

    res.json({ msg: "user updated", updUser });
  } else {
    res.status(400).json({ msg: "user not found" });
  }
});

// Delete user
router.delete("/:usrId", async (req, res) => {
  const user = await User.findAll({
    where: {
      usrId: req.params.usrId,
    },
  }).catch(errHandler);

  if (user && user.length > 0) {
    const user = User.destroy({
      where: {
        usrId: req.params.usrId,
      },
    });

    res.json({
      msg: "Member deleted",
      user,
    });
  } else {
    res.status(400).json({ msg: "user not found" });
  }
});

// Get all users with pagination
router.get("/:page/:pageSize", async (req, res) => {
  const page = parseInt(req.params.page);
  const pageSize = parseInt(req.params.pageSize);

  const users = await User.findAll({
    attributes: ["usrId", "usrPseudo", "usrName", "usrMail"],
    ...paginate({ page, pageSize }),
  }).catch(errHandler);

  res.json(users);
});

// Helpers
const errHandler = (err) => {
  console.log("Error: ", err);
};

const paginate = ({ page, pageSize }) => {
  const offset = page * pageSize;
  const limit = pageSize;

  return {
    offset,
    limit,
  };
};

module.exports = router;

console.log('backend/routes/api/users.js 🚀');
