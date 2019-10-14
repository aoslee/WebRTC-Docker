var https = require('https')
var fs = require('fs')
var express = require('express')
var crypto = require('crypto')
var app = express()
var cors = require('cors');

app.use(cors());

var option = {
        key : fs.readFileSync('/cert/key.pem'),
        cert: fs.readFileSync('/cert/cert.pem'),
}

var hmac = function (key, content) {
  var method = crypto.createHmac('sha1', key)
  method.setEncoding('base64')
  method.write(content)
  method.end()
  return method.read()
}

/*function handleIceRequest(req, resp) {
  var query = req.query
  var key = '4080218913'
  var time_to_live = 600
  var timestamp = Math.floor(Date.now() / 1000) + time_to_live
  var turn_username = timestamp + ':ninefingers'
  var password = hmac(key, turn_username)

  return resp.send({
    iceServers: [
      {
        urls: [
          'stun:SERVER_PUBLIC_IP:3478',
          'turn:SERVER_PUBLIC_IP:3478'
        ],
        username: turn_username,
        credential: password
      }
    ]
  })
}
*/
app.get('/iceconfig', function (req, resp) {
  var query = req.query
  var key = '4080218913'
  var time_to_live = 3600*24
  var timestamp = Math.floor(Date.now() / 1000) + time_to_live
  var turn_username = timestamp + ':' + 'ninefingers'
  var password = hmac(key, turn_username)

  resp.header("Access-Control-Allow-Origin", "*");   

  return resp.send({
    iceServers: [
      {
        urls: [
          'stun:SERVER_PUBLIC_IP:3478',
          'turn:SERVER_PUBLIC_IP:3478'
        ],
        username: turn_username,
        credential: password
      }
    ]
  })
})
app.post('/iceconfig', function (req, resp) {
  var query = req.query
  var key = '4080218913'
  var time_to_live = 3600*24
  var timestamp = Math.floor(Date.now() / 1000) + time_to_live
  var turn_username = timestamp + ':' + 'ninefingers'
  var password = hmac(key, turn_username)

  resp.header("Access-Control-Allow-Origin", "*");   

  return resp.send({
    iceServers: [
      {
        urls: [
          'stun:SERVER_PUBLIC_IP:3478',
          'turn:SERVER_PUBLIC_IP:3478'
        ],
        username: turn_username,
        credential: password
      }
    ]
  })
})
//app.get('/iceconfig', handleIceRequest)
//app.post('/iceconfig', handleIceRequest)

var server = https.createServer(option, app);

server.listen('3033', function () {
  console.log('server started')
})
