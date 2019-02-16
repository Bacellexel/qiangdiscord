const selfReloadJSON = require('self-reload-json');
const userData = new selfReloadJSON('./data/users.json', 'utf8');
const file = require('../util/fsHandler.js');


function get(name) {
  for (let i = 0; i < userData.users.length; i++) {
    if (userData.users[i].username === name) {
      return userData.users[i];
    }
  }
}

function getEveryone(){
  let data = [];
  for (let i = 0; i < userData.users.length; i++) {
      data.push(userData.users[i]);
  }
  return data;
}

function verify(name) {
  for (let i = 0; i < userData.users.length; i++) {
    if (userData.users[i].username === name) {
      return true;
    }
    return false;
  }
}

function create(name) {
  var newUser = {
    username: name,
    level: 1,
    currency: 0,
    exp:0
  }
  let json = userData;
  json['users'].push(newUser);
  file.writeJSON('./data/users.json', json);
}

function setCurrency(name, amount) {
  if (Number(amount) === NaN) return;

  for (let i = 0; i < userData.users.length; i++) {
    if (userData.users[i].username === name) {
      let json = userData;
      let actualCoins = parseInt(json['users'][i].currency);
      let coinsToAdd = parseInt(amount);
      let sumOfCoins = actualCoins + coinsToAdd;
      json['users'][i].currency = sumOfCoins;
      file.writeJSON('./data/users.json', json);
    }
  }
}

function setExp(name, amount){
  if(Number(amount) === NaN) return;

  for (let i = 0; i < userData.users.length; i++) {
    if (userData.users[i].username === name) {
      let json = userData;
      let actualExp = parseInt(json['users'][i].exp);
      let expToAdd = parseInt(amount);
      let sumOfExp = actualExp + expToAdd;
      json['users'][i].exp = sumOfExp;
      file.writeJSON('./data/users.json', json);
    }
  }
}

function setLevel(name, amount){
  if(Number(amount) === NaN) return;

  for (let i = 0; i < userData.users.length; i++) {
    if (userData.users[i].username === name) {
      let json = userData;
      json['users'][i].level = amount;
      file.writeJSON('./data/users.json', json);
    }
  }
}
module.exports.get = get;
module.exports.verify = verify;
module.exports.create = create;
module.exports.setCurrency = setCurrency;
module.exports.setExp = setExp;
module.exports.setLevel = setLevel;
module.exports.getEveryone = getEveryone;
