const ua = require('universal-analytics');
const { v4: uuid } = require('uuid');
const store = require('../store');

const userId = store.get('userId') || uuid();

store.set('userId', userId);

function activateUser() {
  const user = ua('UA-142775737-2', userId);
  user.pageview('/').send();
}

module.exports = { activateUser };
