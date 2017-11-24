const gulp = require('gulp');
const jsonServer = require('json-server');
const conf = require('../conf/json-server.conf')();

gulp.task('json-server', startJsonServer);

function startJsonServer() {
  const server = jsonServer.create();
  server.use(jsonServer.defaults());
  var router = jsonServer.router(conf.router);
  server.use(router);
  var listener = server.listen(conf.port, function () {
    console.log('JSON Server is running, port: ' + listener.address().port + ', router: ' + router.db.source);
  });
}
