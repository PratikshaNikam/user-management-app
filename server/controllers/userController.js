const userService = require('../services/userService');

exports.register = async (req, res) => {
  const result = await userService.registerUser(req.body);
  res.status(result.status).json(result.data);
};

exports.login = async (req, res) => {
  const result = await userService.loginUser(req.body);
  res.status(result.status).json(result.data);
};

exports.getProfile = async (req, res) => {
  res.json({ msg: 'User profile accessed', user: req.user });
};