const gulp = require('gulp');
const jsonServer = require('json-server');
const conf = require('../conf/json-server.conf')();

gulp.task('json-server', startJsonServer);

function startJsonServer() {
  	const server = jsonServer.create();
  	server.use(jsonServer.defaults());
  	var router = jsonServer.router(conf.routers);
  	server.get('/content', function(req, res, next){
  		req.query['_page'] = setPageCustom(req.query['page']);
		req.query['_limit'] = req.query['size'];
		req.query['q'] = req.query['search'];
		next();
	});
  	router.render = (req, res) => {
	  	res.jsonp({
	  		totalElements: 100,
	  		totalPages: 100/getParameterQuery(req._parsedOriginalUrl.query, 'size'),
	    	size: getParameterQuery(req._parsedOriginalUrl.query, 'size'),
	    	number: getParameterQuery(req._parsedOriginalUrl.query, 'page'),
	    	content: res.locals.data
	  	})
  	};

  	server.use(router);
  	var listener = server.listen(conf, function () {
    	console.log('JSON Server is running, host: ' + listener.address().address + ', port: ' + listener.address().port + ', router: ' + router.db.source);
  	});

  	var getParameterQuery = function(query, parameter) {
  		var str = query.split('&');
  		var regex = new RegExp(parameter+'=[0-9]*');
  		for(var i = 0; i < str.length; i++){
  			if(regex.test(str[i])){
  				return parseInt(str[i].replace(parameter+'=', ''));
  			}
  		}
  		return null;

  	};

  	var setPageCustom = function(page) {
  		if(page == 1){
  			return 2;
  		}

  		return ++page; 
  	};
};

