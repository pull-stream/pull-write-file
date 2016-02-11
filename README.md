# pull-write-file

pull-stream version of fs.createWriteStream

currently really simple and does not yet support all fs.createWriteStream options yet.

## Example

``` js
var Write = require('pull-write-stream')

pull(
  source, //must be buffers or strings!
  Write(pathToFile, {}, function (err) {
    //callback is called once write is complete,
    //and file descriptor is closed
  })
)

```


## License

MIT
