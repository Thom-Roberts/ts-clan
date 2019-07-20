import * as AWS from 'aws-sdk';

AWS.config.update({
   accessKeyId: "AKIARG6TTP5JHPMRTRBS",
   secretAccessKey: "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",
   region: "us-east-1",
});

var dynamoDb = new AWS.DynamoDB;
var docClient = new AWS.DynamoDB.DocumentClient();
dynamoDb.listTables({}, (err, data) => {
   console.log(data.TableNames);
});

// Example read all
dynamoDb.scan({
   TableName: "Music"
}, (err, data) => {
   console.log(data);
});

// Example select query
docClient.query({
   TableName: "Music",
   KeyConditionExpression: "Artist = :a",
   ExpressionAttributeValues: {
      ":a": "No One You Know",
   }
}, (err, data) => {
   console.log(data);
});

// Example upload
docClient.put({
   TableName: 'Music',
   'Item': {
      'songtitle': 'Created from Node.js',
      'Artist': 'No One You Know'
   },
}, (err, data) => {
   console.log(data);
});