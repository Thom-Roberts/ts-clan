import * as AWS from 'aws-sdk';
import { Member, Stats } from './Interfaces';
// Configuring credentials to read/write from app (unauthorized user)
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:ae54b554-e785-4778-91a6-fb40ce7fd5b2',
});

const dynamoDb = new AWS.DynamoDB();

export function GetMembers(): Promise<Member[]> {
	return new Promise((resolve, reject) => {
		const tableName = "Member";

		dynamoDb.scan({
			TableName: tableName,
		}, (err, data) => {
			if(err) {
				reject(err);
			}
			else {
				resolve(data.Items as unknown as Member[]);
			}
		});
	});
}

export function GetStats(): Promise<Stats[]> {
	return new Promise((resolve, reject) => {
		const tableName = "MemberStats";

		dynamoDb.scan({
			TableName: tableName,
		}, (err, data) => {
			if(err) {
				reject(err);
			}
			else {
				resolve(data.Items as unknown as Stats[]);
			}
		});
	});
}
