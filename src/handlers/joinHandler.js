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

const generateSessionId = () => {
  return new Date().getTime();
};

const createSession = (username, sessionId) => {
  const time = new Date();
  return { username, time, sessionId };
};

const validateRequest = (req, res, next) => {
  if (req.session) {
    res.redirect('/');
    res.end('already joined');
    return;
  }
  next();
};

const joinHandler = (sessions) => (req, res, next) => {
  const name = req.body.name;
  const game = req.game;

  if (!name) {
    res.statusCode = 405;
    console.log(name);
    res.end();
    return;
  }

  const sessionId = generateSessionId();
  const session = createSession(name, sessionId);
  sessions[sessionId] = session;

  game.addPlayer(name, sessionId);

  res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
  res.redirect('/');
  res.end();
};

module.exports = { joinHandler, showjoiningPage, validateRequest };
