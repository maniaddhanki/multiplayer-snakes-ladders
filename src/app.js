const express = require('express');

const createApp = ({ root = './public' }, sessions = {}) => {
  const app = express();
  app.use(express.static(root));
  return app;
};

module.exports = { createApp };
