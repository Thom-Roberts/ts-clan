import * as request from "request";
import { BUNGIEAPIKEY } from "./APIKEYS";
import { Member } from "./Interfaces";
import { Stats } from "./Interfaces";

export function GetHistoricalStats(member: Member): Promise<Stats> {
	return new Promise((resolve, reject) => {
		const options = {
			url: `https://www.bungie.net/Platform/Destiny2/${member.membershipType}/Account/${member.membershipId}/Stats/`,
			headers: {
				"x-api-key": BUNGIEAPIKEY,
			},
		};

		request.get(options, (err, res, body) => {
			if(err) {
				reject(err);
			}
			if(res.statusCode !== 200) {
				reject(`Stats request failed: ${res.statusCode} ${body}`);
			}

			let temp = JSON.parse(body);
			let values = temp.Response.mergedAllCharacters.results;
			console.log(values);
			// Creating a stats interface 'inline'
			resolve({
				pve: {
					activitiesCleared: values.allPvE.allTime.activitiesCleared.basic.value,
					assists: values.allPvE.allTime.assists.basic.value,
					kills: values.allPvE.allTime.kills.basic.value,
					timePlayed: values.allPvE.allTime.secondsPlayed.basic.displayValue,
					deaths: values.allPvE.allTime.deaths.basic.value,
					kdRatio: values.allPvE.allTime.killsDeathsRatio.basic.displayValue,
					publicEventsCompleted: values.allPvE.allTime.publicEventsCompleted.basic.value,
				},
				pvp: {
					activitiesWon: values.allPvP.allTime.activitiesWon.basic.value,
					assists: values.allPvP.allTime.assists.basic.value,
					kills: values.allPvP.allTime.kills.basic.value,
					timePlayed: values.allPvP.allTime.secondsPlayed.basic.displayValue,
					deaths: values.allPvP.allTime.deaths.basic.value,
					bestSingleGameKils: values.allPvP.allTime.bestSingleGameKills.basic.value,
					opponentsDefeated: values.allPvP.allTime.opponentsDefeated.basic.value,
					efficiency: values.allPvP.allTime.efficiency.basic.displayValue,
					kdRatio: values.allPvP.allTime.killsDeathsRatio.basic.displayValue,
					winLossRatio: values.allPvP.allTime.winLossRatio.basic.displayValue,
					longestKillSpree: values.allPvP.allTime.longestKillSpree.basic.value,
				},
			});
		});
	});
}