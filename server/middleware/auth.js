const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

function admin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Admin resource. Access denied.' });
  }
  next();
}

module.exports = { auth, admin };
