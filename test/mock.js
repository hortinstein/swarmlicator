var server = restify.createServer();
server.use(restify.bodyParser({
    mapParams: false
}));
var hit = false;
server.get('/ping', function(req, res, next) {
    if (hit === true){
        res.send('pong');
    }
    hit = true;
});
server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});
