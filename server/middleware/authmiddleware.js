const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith('bearer')) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid or expired' });
  }
};
