import Axios, { AxiosResponse } from 'axios';
import { GroupApiResponse, WeeklyRewardResponse } from './Requests';
import { ClanInfo, ClanRewardState } from "./Interfaces";
import { BUNGIEAPIKEY } from "./APIKEYS";
const CLANID = '407685';

export async function GetClanInfo() : Promise<ClanInfo> {
	const url = `https://www.bungie.net/Platform/GroupV2/${CLANID}/`;
	const headers = {
		'x-api-key': BUNGIEAPIKEY(),
	}

	try {
		const response: AxiosResponse<GroupApiResponse> = await Axios.get(url, {headers});
		if(response.status !== 200)
			throw new Error('Response failed for getting clan info.');
		
		const temp = response.data;
		return {
			name: temp.Response.detail.name,
			creationDate: new Date(temp.Response.detail.creationDate),
			about: temp.Response.detail.about,
			motto: temp.Response.detail.motto,
			founder: {
				isOnline: temp.Response.founder.isOnline,
				destinyInfo: {
					bungieMembershipId: temp.Response.founder.bungieNetUserInfo.membershipId,
					membershipId: temp.Response.founder.destinyUserInfo.membershipId,
					membershipType: temp.Response.founder.destinyUserInfo.membershipType,
					displayName: temp.Response.founder.destinyUserInfo.displayName,
					clanMemberType: 'Founder',
					onlineStatus: temp.Response.founder.isOnline,
					isPrimary: false,
					dateLastOn: new Date(),
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
		}
	}
	catch(err) {
		throw new Error(`Unexpected error when acquiring clan data. ${err}`);
	}
}

export async function GetClanRewardState(): Promise<ClanRewardState> {
	const url = `https://www.bungie.net/Platform/Destiny2/Clan/${CLANID}/WeeklyRewardState/`;
	const headers = {
		'x-api-key': BUNGIEAPIKEY(),
	};
	const NIGHTFALLENTRYHASH = 3789021730;
	const GAMBITENTRYHASH = 248695599;
	const RAIDENTRYHASH = 2043403989;
	const CRUCIBLEENTRYHASH = 964120289;

	try {
		const response: AxiosResponse<WeeklyRewardResponse> = await Axios.get(url, {headers});
		if(response.status !== 200)
			throw new Error('Response failed for getting clan reward state.');
		const easierTemp: any[] = response.data.Response.rewards[0].entries;

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

		returnVal.timeExpires = new Date(response.data.Response.endDate as Date);

		return returnVal;
	}
	catch(err) {
		throw new Error(err);
	}
}