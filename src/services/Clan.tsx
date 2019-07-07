import * as request from 'request';
import { Member } from "./Interfaces";
import { BUNGIEAPIKEY } from "./APIKEYS";
const ClanId = '407685';

export function GetClanMembers() : Promise<Member[]> {
	return new Promise((resolve, reject) => {
		let members: Member[];
		const options = {
         'url': `http://bungie.net/Platform/GroupV2/${ClanId}/Members/`,
         'headers': {
            'x-api-key': BUNGIEAPIKEY,
         },
      };

		request.get(options, (err, res, body) => {
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
					});
				}
			});

			resolve(members);
		});
	});
}

