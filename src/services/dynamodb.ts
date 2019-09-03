import * as AWS from 'aws-sdk';
import { Member, Character, Profile } from './Interfaces';
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
				let members = ExtractMemberObjects(data.Items as any[]);
				resolve(members);
			}
		});
	});
}

export function GetProfiles(): Promise<Profile[]> {
	return new Promise((resolve, reject) => {
		const tableName = "MemberStats";

		dynamoDb.scan({
			TableName: tableName,
		}, (err, data) => {
			if(err) {
				reject(err);
			}
			else {
				let profiles = ExtractProfilesObject(data.Items as any[]);
				resolve(profiles);
			}
		});
	});
}

function ExtractMemberObjects(dbMembers: any[]): Member[] {
	return dbMembers.map((dbMember) : Member => {
		return {
			'bungieMembershipId': dbMember.bungieMembershipId.S,
			'displayName': dbMember.displayName.S,
			'membershipId': dbMember.membershipId.S,
			'membershipType': parseInt(dbMember.membershipType.S),
			'clanMemberType': dbMember.clanMemberType.S,
			'onlineStatus':  dbMember.onlineStatus.BOOL,
			'isPrimary': dbMember.isPrimary.S === 'true',
			'dateLastOn': new Date(dbMember.dateLastOn.S),
		};
	});
}

function ExtractProfilesObject(dbStats: any[]): Profile[] {
	return dbStats.map((dbStat) : any => {
		let profile: Profile;
		profile = {
			Stats: {
				membershipId: dbStat.membershipId.S,
			},
			MostPlayedCharacter: JSON.parse(dbStat.mostPlayedCharacter.S) as Character,
		};
		if(Object.prototype.hasOwnProperty.call(dbStat, 'pve')) {
			profile.Stats.pve = JSON.parse(dbStat.pve.S);
		}
		if(Object.prototype.hasOwnProperty.call(dbStat, 'pvp')) {
			profile.Stats.pvp = JSON.parse(dbStat.pvp.S);
		}
		if(Object.prototype.hasOwnProperty.call(dbStat, 'pveCompetitive')) {
			profile.Stats.pveCompetitive = JSON.parse(dbStat.pveCompetitive.S);
		}
		return profile;
	});
}