const gulp = require('gulp');
const jsonServer = require('json-server');
const conf = require('../conf/json-server.conf')();

gulp.task('json-server', startJsonServer);

function startJsonServer() {
  	const server = jsonServer.create();
  	server.use(jsonServer.defaults());
  	var router = jsonServer.router(conf.router);
  	router.render = (req, res) => {
	  	res.jsonp({
	  		totalElements: 100,
	  		totalPages: 10,
	    	size: 10,
	    	number: parseInt(req._parsedOriginalUrl.query.replace(/_page=/, '')),
	    	content: res.locals.data
	  	})
  	};

  	server.use(router);
  	var listener = server.listen(conf.port, function () {
    	console.log('JSON Server is running, port: ' + listener.address().port + ', router: ' + router.db.source);
  	});
};

