var fs = require('fs')

module.exports = function (path, opts, cb) {
  if('function' == typeof opts)
    cb = opts, opts = null
  var flags = opts && opts.flags || 'w'

  const ownerReadWrite = fs.constants.S_IRUSR + fs.constants.S_IWUSR
  const groupReadWrite = fs.constants.S_IRGRP + fs.constants.S_IWGRP
  const otherReadWrite = fs.constants.S_IROTH + fs.constants.S_IWOTH
  const defaultMode = ownerReadWrite + groupReadWrite + otherReadWrite

  var mode = opts && opts.mode || defaultMode
  var pos = 0
  return function (read) {
    fs.open(path, flags, mode, function (err, fd) {
      if(err) return read(err, cb)
      read(null, function next (end, data) {
        if(end === true) fs.close(fd, cb)
        else if(end)     cb(end) //error!
        else {
          if(typeof data === 'string') data = Buffer.from(data) // convert strings to buffers
          fs.write(fd, data, 0, data.length, pos, function (err, bytes) {
            if(err) read(err, function () { fs.close(fd, cb) })
            else    pos += bytes, read(null, next)
          })
        }
      })
    })
  }
}






