var should = require('should');var config = require('../../configs/sample_input.json');var swarmlicator = require('../index.js');var test_ids = [];// ////////////////////////////////// //API Test for size conversion//// ////////////////////////////////it('should list adequate sizes', function(done) {	var api = require('../middleware/digital_ocean/digital_ocean.js');	api.setup(config.provider_info, function(e) {		//console.log(api.sizes);			api.sizes[0].id.should.equal(66);		done();	});});// ////////////////////////////////// //End API testing							//// ////////////////////////////////describe('input testing', function() {	it('should fail to initialize using sample_input', function(done) {		try {			swarmlicator.setup({}, done);		} catch (e) {			done();		}	});	it('should be able to initialize using sample_input', function(done) {		swarmlicator.setup(config, done);	});});describe('mock swarmlicant setup for ping testing', function() {	////////////////////////////////	//Mock Server setup 					//	////////////////////////////////	var restify = require('restify');	var server = restify.createServer();	before(function() {		server.use(restify.bodyParser({			mapParams: false		}));		var hit = false;		server.get('/ping', function(req, res, next) {			if (hit === true) {				res.send('pong');			}			hit = true;		});		server.listen(8080, function() {			//console.log('%s listening at %s', server.name, server.url);		});	})	it('should respond to a ping', function(done) {		swarmlicator.swarmlicant_ping(server.url + '/ping', done);	});});//functions are tested in the context of swarm_initdescribe('swarmlicator', function() {	it('should be able to spawn using the config file', function(done) {		this.timeout(500 * 1000);		swarmlicator.swarm_init(config, function(e, o) {			console.log(e,o);			test_ids.push(o.curator.id);			test_ids.push(o.troves[0].id);			test_ids.push(o.troves[1].id);			done();		});	});});// //functions are tested in the context of swarm_init// describe('swarmlicator', function() {// 	it('should be able to spawn 2 small swarmlicants and reply with ids and IPs', function(done) {// 		this.timeout(50 * 1000);// 		swarmlicator.swarmlicant_init(2, 0, "joos", function(e, o) {// 			o.forEach(function(machine) {// 				test_ids.push(machine.id);// 			});// 			done();// 		});// 	});// 	it('should be able to spawn 1 small swarmlicants and reply with ids and IPs', function(done) {// 		this.timeout(50 * 1000);// 		swarmlicator.swarmlicant_init(1, 0, "joos", function(e, o) {// 			test_ids.push(o.id);// 			done();// 		});// 	});// });describe('cleanup functions', function() {	before(function(done) { //timeout function to allow for droplet init		//console.log('\ntest timeout to allow droplet creation\n');		this.timeout(60 * 1000);		setTimeout(done, 60 * 990);	});	it('should be able to destroy test droplets', function(done) {		swarmlicator.swarmlicant_destroy(test_ids, function(e, o) {			console.log(e, o);			o[0].status.should.equal('OK');			o[1].status.should.equal('OK');			o[2].status.should.equal('OK');			done();		});	});});