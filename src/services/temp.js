const AWS = require('aws-sdk');
AWS.config.update({
	region: 'us-east-1'
});

var dynamoDb = new AWS.DynamoDB();

dynamoDb.scan({
	TableName: "Music",
}, (err, data) => {
	if(err) {
		console.error(err);
	}
	console.log(data);
});