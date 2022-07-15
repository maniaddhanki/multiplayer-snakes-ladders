const joiningPage = `<html>
<head>
  <title>join</title>
</head>
<body>
  <form action="/join" method="post">
    <label for="username">Username</label>
  <input type="text" name="username" id="name">
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
  const username = req.body.username;

  if (!username) {
    res.statusCode = 405;
    res.end();
    return;
  }

  const sessionId = generateSessionId();
  const session = createSession(username, sessionId);
  sessions[sessionId] = session;

  res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
  res.redirect('/');
  res.end();
};

module.exports = { joinHandler, showjoiningPage, validateRequest };
