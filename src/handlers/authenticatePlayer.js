const authenticatePlayer = (req, res, next) => {
  if (!req.session.isPopulated) {
    res.redirect('/join');
    res.end('');
  }
  next();
};

module.exports = { authenticatePlayer };
