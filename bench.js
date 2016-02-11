
var path = require('path')
var crypto = require('crypto')
var pull = require('pull-stream')
var osenv = require('osenv')
var Write = require('./')

var bytes = crypto.randomBytes(64*1024)
var MB = 1024*1024
var count = 0, start = Date.now()
pull(
  pull.count(1024*100),
  pull.map(function (e) {
    return bytes
  }),
  pull.through(function (d) {
    count += d.length
  }),
  Write(path.join(osenv.tmpdir(), 'pull-write-file_test.'+Date.now()), {}, function (err) {
    var size = count/MB
    var time = (Date.now()-start)/1000
    console.log('write', size,  'in', time, 'at', size/time )

  })
)

