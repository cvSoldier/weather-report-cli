const WebSocket = require('ws');
const setUserNum = require('./render').setUserNum

const socket = new WebSocket('ws://101.42.240.177:8080');

socket.addEventListener('message', function (event) {
  const data = JSON.parse(event.data)
  if(data.type === 'onlineUserCount') {
    setUserNum(data.data)
  }
});

socket.addEventListener('error', function (error) {
  console.error('WebSocket error:', error);
});