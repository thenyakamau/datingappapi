const User = require("../models/user");
const { Op, Sequelize } = require("sequelize");
const Matches = require("../models/matches");

async function fetchAllPotentials(req, res, next) {
  const u_id = req.user.id;
  const c_user = req.user;
  try {
    let users = await User.findAll({
      where: {
        gender: {
          [Op.ne]: c_user.gender,
        },
      },
    });
    checkUser(users, res, u_id);
  } catch (err) {
    const messages = err.toString();
    return res.status(500).json({
      success: false,
      error: messages,
    });
  }
}

exports.fetchAllPotentials = fetchAllPotentials;

function fetchPotentialsByLocation(req, res, next) {
  const c_user = req.user;
  User.findAll({
    where: {
      county: c_user.county,
      gender: {
        [Op.ne]: c_user.gender,
      },
    },
  })
    .then((users) => {
      let u_id = c_user.id;
      if (users.length > 5) {
        checkUser(users, res, u_id);
      } else {
        fetchAllPotentials(req, res, next);
      }
    })
    .catch((err) => {
      const messages = err.toString();
      return res.status(500).json({
        success: false,
        error: messages,
      });
    });
}
exports.fetchPotentialsByLocation = fetchPotentialsByLocation;

function makeMatch(req, res, next) {
  const c_user = req.user;
  Matches.findOne({
    where: {
      s_id: c_user.id,
    },
  })
    .then((match) => {
      if (match == null) {
        createMatch(req, res, next);
      } else if (match.reject == 1) {
        return res.status(200).json({
          success: true,
          message: "Cannot match",
        });
      } else {
        updateMatch(req, res, next);
      }
    })
    .catch((err) => {
      const messages = err.toString();
      return res.status(500).json({
        success: false,
        error: messages,
      });
    });
}

exports.makeMatch = makeMatch;

function updateMatch(req, res, next) {
  const c_user = req.user;
  Matches.update(
    { match: 1 },
    {
      where: {
        s_id: c_user.id,
      },
    }
  )
    .then((match) => {
      res.status(200).json({
        success: true,
        message: "Match has been made",
      });
    })
    .catch((err) => {
      const messages = err.toString();
      return res.status(500).json({
        success: false,
        error: messages,
      });
    });
}
exports.updateMatch = updateMatch;

function createMatch(req, res, next) {
  const { s_id } = req.body;
  const c_user = req.user;
  Matches.create({ f_id: c_user.id, s_id: s_id })
    .then((match) => {
      return res.status(200).json({
        success: true,
        message: "Match created",
      });
    })
    .catch((err) => {
      const messages = err.toString();
      return res.status(500).json({
        success: false,
        error: messages,
      });
    });
}
exports.createMatch = createMatch;

function rejectMatch(req, res, next) {
  const u_id = req.user.id;
  const { s_id } = req.body;
  Matches.update(
    { reject: 1 },
    {
      where: {
        f_id: {
          [Op.or]: {
            [Op.eq]: u_id,
            [Op.eq]: s_id,
          },
        },
        s_id: {
          [Op.or]: {
            [Op.eq]: u_id,
            [Op.eq]: s_id,
          },
        },
      },
    }
  )
    .then((match) => {
      return res.status(200).json({
        success: true,
        message: "Chat has been terminated",
      });
    })
    .catch((err) => {
      const messages = err.toString();
      return res.status(500).json({
        success: false,
        error: messages,
      });
    });
}

exports.rejectMatch = rejectMatch;

async function checkUser(users, res, u_id) {
  try {
    let matches = await Matches.findAll({
      where: { [Op.or]: [{ f_id: u_id }, { s_id: u_id }] },
    });

    let viewUsers = [];
    for (let i = 0; i < users.length; i++) {
      let user = users[i];

      if (user.name && user.county) {
        if (matches.length > 0) {
          matches.forEach((match) => {
            if (match.f_id != user.id && match.s_id != user.id) {
              viewUsers.push(user);
            }
          });
        } else {
          viewUsers.push(user);
        }
      }
    }
    return res.status(200).json({
      success: true,
      data: viewUsers,
    });
  } catch (err) {
    const messages = err.toString();
    return res.status(500).json({
      success: false,
      error: messages,
    });
  }
}
