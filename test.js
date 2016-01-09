var tumblr = require('tumblr.js');

var client = tumblr.createClient({
  consumer_key: 'crwdl6Um91EmkRHh03DFKJlalloKMJSdZzffEPYa6utOyaqnm3',
  consumer_secret: 'IffZUQ3LvfKKeKi8TnNUSFgQQk3RokX7Y8PFgKpEUsu2DH1Pe8',
  token: 'NnT56dIiJfd7h9BOJkijmsh5q34g0kh1zlmMiV5HPV55ThbTzD',
  token_secret: '18M3XNrvX7yxeGJA2yasOGFBpno4a6KQj9gF3hj7udfufjLhuz'
});

client.posts('drivenbytiberiosity.tumblr.com', function(err, blog) {
  var thirtyDays = 30 * 1000 * 60 * 60 * 24;
  console.log("now: " + Date.now());
  console.log("post.date" + blog.posts[0].date);
  var posts = blog.posts.filter(function(post) {
  	if(Date.now() - post.date <= thirtyDays) {
  		return post;
  	}
  });
  console.log(blog.posts);
});

function checkDate(post) {
	var thirtyDays = 30 * 1000 * 60 * 60 * 24;
	if(Date.now() - post.date <= thirtyDays) {
  		return post;
  	}
}
	