const joiningPage = `<html>
<head>
  <title>join</title>
</head>
<body>
  <form action="/join" method="post">
    <label for="name">name</label>
  <input type="text" name="name" id="name">
  <input type="submit" value="submit">
  </form>
</body>
</html>`;

const showjoiningPage = (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(joiningPage);
};

const validateRequest = (req, res, next) => {
  if (req.session.isPopulated) {
    res.redirect('/');
    res.end('already joined');
    return;
  }
  next();
};

const joinHandler = (req, res, next) => {
  const name = req.body.name;
  const game = req.game;

  if (!name) {
    res.statusCode = 405;
    console.log(name);
    res.end();
    return;
  }

  req.session.name = name;
  const playerId = game.addPlayer(name);
  req.session.playerId = playerId;
  res.redirect('/');
  res.end();
};

module.exports = { joinHandler, showjoiningPage, validateRequest };
