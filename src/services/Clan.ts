import * as request from 'request';
import { Member, ClanInfo, ClanRewardState } from "./Interfaces";
import { BUNGIEAPIKEY } from "./APIKEYS";
const CLANID = '407685';

export function GetClanMembers() : Promise<Member[]> {
	return new Promise((resolve, reject) => {
		const options = {
         'url': `https://www.bungie.net/Platform/GroupV2/${CLANID}/Members/`,
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
						'clanMemberType': val['memberType'],
						'onlineStatus': val['isOnline'],
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
			'url': `https://www.bungie.net/Platform/GroupV2/${CLANID}/`,
			'headers': {
				'x-api-key': BUNGIEAPIKEY(),
			},
		}

		request.get(options, (err, res, body) => {
			if(err) {
				reject(`err: ${res.body}`);
			}
			if(res.statusCode !== 200) {
				reject(`Could not resolve status code: ${res.statusCode}, ${res.body}`);
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
							clanMemberType: 'Founder',
							onlineStatus: temp.Response.founder.isOnline,
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

export function GetClanRewardState(): Promise<ClanRewardState> {
	return new Promise((resolve, reject) => {
		const OPTIONS = {
			url: `https://www.bungie.net/Platform/Destiny2/Clan/${CLANID}/WeeklyRewardState/`,
			headers: {
				'x-api-key': BUNGIEAPIKEY(),
			},
		};
		const NIGHTFALLENTRYHASH = 3789021730;
		const GAMBITENTRYHASH = 248695599;
		const RAIDENTRYHASH = 2043403989;
		const CRUCIBLEENTRYHASH = 964120289;

		request.get(OPTIONS, (err, res, body) => {
			if(err) {
				reject(err);
			}
			if(res.statusCode !== 200) {
				reject(`Status code invalid: ${res.body}`);
			}
			else {
				let temp = JSON.parse(body);
				let easierTemp: any[] = temp.Response.rewards[0].entries;
				let returnVal : ClanRewardState = {
					crucible: false,
					raid: false,
					nightfall: false,
					gambit: false,
					timeExpires: new Date(),
				}; 

				easierTemp.forEach(entry => {
					if(entry.rewardEntryHash === CRUCIBLEENTRYHASH) {
						returnVal.crucible = entry.earned;
					}
					if(entry.rewardEntryHash === RAIDENTRYHASH) {
						returnVal.raid = entry.earned;
					}
					if(entry.rewardEntryHash === NIGHTFALLENTRYHASH) {
						returnVal.nightfall = entry.earned;
					}
					if(entry.rewardEntryHash === GAMBITENTRYHASH) {
						returnVal.gambit = entry.earned;
					}
				});

				returnVal.timeExpires = new Date(temp.Response.endDate);

				resolve(returnVal);
			}
		});
	});
}