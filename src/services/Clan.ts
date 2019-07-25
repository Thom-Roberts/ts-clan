import * as request from 'request';
import { Member, ClanInfo } from "./Interfaces";
import { BUNGIEAPIKEY } from "./APIKEYS";
const ClanId = '407685';

export function GetClanMembers() : Promise<Member[]> {
	return new Promise((resolve, reject) => {
		const options = {
         'url': `https://www.bungie.net/Platform/GroupV2/${ClanId}/Members/`,
         'headers': {
            'x-api-key': BUNGIEAPIKEY(),
         },
      };

		request.get(options, (err, res, body) => {
			let members: Member[] = [];
			if(err) {
				reject(err);
			}
			if(res.statusCode !== 200) {
				reject(`Could not resolve status code: ${res.statusCode}`);
			}

			let temp = JSON.parse(body);

			temp['Response']['results'].forEach((val : any) => {
				if(val.hasOwnProperty('destinyUserInfo')) {
					members.push({
						'membershipId': val['destinyUserInfo']['membershipId'],
						'membershipType': val['destinyUserInfo']['membershipType'],
						'displayName': val['destinyUserInfo']['displayName'],
					});
				}
			});

			resolve(members);
		});
	});
}

export function GetClanInfo() : Promise<ClanInfo> {
	return new Promise((resolve, reject) => {
		const options = {
			'url': `https://www.bungie.net/Platform/GroupV2/${ClanId}/`,
			'headers': {
				'x-api-key': BUNGIEAPIKEY(),
			},
		}

		request.get(options, (err, res, body) => {
			if(err) {
				reject(err);
			}
			if(res.statusCode !== 200) {
				reject(`Could not resolve status code: ${res.statusCode}`);
			}
			else {
				let temp = JSON.parse(body);
				resolve({
					name: temp.Response.detail.name,
					creationDate: new Date(temp.Response.detail.creationDate),
					about: temp.Response.detail.about,
					motto: temp.Response.detail.motto,
					founder: {
						isOnline: temp.Response.founder.isOnline,
						destinyInfo: {
							membershipId: temp.Response.founder.destinyUserInfo.membershipId,
							membershipType: temp.Response.founder.destinyUserInfo.membershipType,
							displayName: temp.Response.founder.destinyUserInfo.displayName,
						},
					},
					flag: {
						decalId: temp.Response.detail.clanInfo.clanBannerData.decalId,
						decalColorId: temp.Response.detail.clanInfo.clanBannerData.decalColorId,
						decalBackgroundColorId: temp.Response.detail.clanInfo.clanBannerData.decalBackgroundColorId,
						gonfalonId: temp.Response.detail.clanInfo.clanBannerData.gonfalonId,
						gonfalonColorId: temp.Response.detail.clanInfo.clanBannerData.gonfalonColorId,
						gonfalonDetailId: temp.Response.detail.clanInfo.clanBannerData.gonfalonDetailId,
						gonfalonDetailColorId: temp.Response.detail.clanInfo.clanBannerData.gonfalonDetailColorId,
					},
				});

			}
		});
	});
}
