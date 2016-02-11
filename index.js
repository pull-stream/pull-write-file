var fs = require('fs')

module.exports = function (path, opts, cb) {
  var pos = 0
  return function (read) {
    fs.open(path, 'a', function (err, fd) {
      read(null, function next (end, data) {
        if(end === true)
          fs.close(fd, cb)
        else if(end) cb(end) //error!
        else
          fs.write(fd, data, 0, data.length, pos, function (err, bytes) {
            if(err) read(err, function () { fs.close(fd, cb) })
            else    pos += bytes, read(null, next)
            
          })
      })

    })
  }
}
