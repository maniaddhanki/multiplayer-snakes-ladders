player = {
  name: 'mani',
  color: 'black',
  currentPosition: 0
}

const injectPlayer = (req, res, next) => {
  req.player = player;
  next();
};

module.exports = { injectPlayer };
