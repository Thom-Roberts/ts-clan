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
				let temp = ExtractMemberObjects(data.Items as any[]);
				resolve(temp);
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
				let temp = ExtractStatsObject(data.Items as any[]);
				resolve(temp);
			}
		});
	});
}

function ExtractMemberObjects(dbMembers: any[]): Member[] {
	return dbMembers.map((dbMember) : Member => {
		return {
			'displayName': dbMember.displayName.S,
			'membershipId': dbMember.membershipId.S,
			'membershipType': parseInt(dbMember.membershipType.S),
		};
	});
}

function ExtractStatsObject(dbStats: any[]): Stats[] {
	return dbStats.map((dbStat) : Stats => {
		let temp: Stats;
		temp = {
			'membershipId': dbStat.membershipId.S,
		};
		if(Object.prototype.hasOwnProperty.call(dbStat, 'pve')) {
			temp.pve = JSON.parse(dbStat.pve.S);
		}
		if(Object.prototype.hasOwnProperty.call(dbStat, 'pvp')) {
			temp.pvp = JSON.parse(dbStat.pvp.S);
		}
		return temp;
	});
}