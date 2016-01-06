/*Overview

Here's a high-level overview of tasks we'll be accomplishing:

Create another JavaScript file that can pull data from your Tumblr Blog
Read in a CSV file of your friends' emails
Load the content from some time-period of posts from your Tumblr blog
Populate an email template with your blog content and mail merge it with your friends data
Send the email using the Mandrill API
By the end of the project, you should be able to run a JavaScript file that will send out an email newsletter to a list of friends and family in your CSV file.*/

var fs = require('fs');

var csvFile = fs.readFileSync("friend_list.csv","utf8");
console.log(csvFile);

var csv_data = csvParse(csvFile)
console.log(csv_data);

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