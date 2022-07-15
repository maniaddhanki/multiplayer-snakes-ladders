const authenticatePlayer = (req, res, next) => {
  if (!req.session) {
    res.redirect('/join');
    res.end('');
  }
  next();
};

module.exports = { authenticatePlayer };
