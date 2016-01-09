/*Overview

Here's a high-level overview of tasks we'll be accomplishing:

Create another JavaScript file that can pull data from your Tumblr Blog
Read in a CSV file of your friends' emails
Load the content from some time-period of posts from your Tumblr blog
Populate an email template with your blog content and mail merge it with your friends data
Send the email using the Mandrill API
By the end of the project, you should be able to run a JavaScript file that will send out an email newsletter to a list of friends and family in your CSV file.*/

var fs = require('fs');
var ejs = require('ejs');
var tumblr = require('tumblr.js');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
var emailTemplate = fs.readFileSync('email_template.html', 'utf8');

var client = tumblr.createClient({
  consumer_key: 'crwdl6Um91EmkRHh03DFKJlalloKMJSdZzffEPYa6utOyaqnm3',
  consumer_secret: 'IffZUQ3LvfKKeKi8TnNUSFgQQk3RokX7Y8PFgKpEUsu2DH1Pe8',
  token: 'NnT56dIiJfd7h9BOJkijmsh5q34g0kh1zlmMiV5HPV55ThbTzD',
  token_secret: '18M3XNrvX7yxeGJA2yasOGFBpno4a6KQj9gF3hj7udfufjLhuz'
});

var contactList = csvParse(csvFile);

/*contactList.forEach(function(row) {
	var firstName = row.firstName;
	var numMonthsSinceContact = row.numMonthsSinceContact;
	var template = emailTemplate;
	var customizedTemplate = ejs.render(template, 
                { firstName: firstName,  
                  numMonthsSinceContact: numMonthsSinceContact
                });	
	console.log(customizedTemplate);
})*/

client.posts('drivenbytiberiosity.tumblr.com', function(err, blog) {
  var thirtyDays = 30 * 1000 * 60 * 60 * 24;
  var posts = blog.posts.filter(function(post) {
  	if(Date.now() - Date.parse(post.date) <= thirtyDays) {
  		return post;
  	}
  });
//  console.log(posts);
  var contactList = csvParse(csvFile);
  contactList.forEach(function(row) {
 // 	console.log(posts);
  	row.latestPosts = posts;
 	var template = emailTemplate;
 	var customizedTemplate = ejs.render(template, row);
 	console.log(customizedTemplate);
  });
});


function csvParse(csvFile) {
	var entries = [];
	var rows = csvFile.split("\n");
	for (var i = 1; i < rows.length - 1; i++) {
		var entry = {};
		var fields = rows[i].split(',');
		entry.firstName = fields[0];
		entry.lastName = fields[1];
		entry.numMonthsSinceContact = fields[2];
		entry.emailAddress = fields[3];
		entries.push(entry);
	}
	return entries;
}