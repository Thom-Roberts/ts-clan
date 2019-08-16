declare module '*.png'{ // Allows png's to be imported
	const value: any;
	export = value;
}

export interface Member {
	membershipId: string;
	membershipType: number;
	displayName: string;
	clanMemberType: string;
	onlineStatus: boolean;
};

export interface Profile {
	Stats: Stats;
	MostPlayedCharacter: Character;
}

// Just the most played character
export interface Character { // Get profile
	characterId: string; // Most played id
	class: string; // Should be Titan, Hunter, or Warlock
	minutesPlayed: number;
	emblemLocation: string; // Append the https://www.bungie.net before pushing it up
	currentLightLevel: number;
	currentLevel: number;
}

export interface Stats {
	membershipId: string;
	// Response.mergedAllCharacters.results
	pve?: pve;
	pvp?: pvp;
	pveCompetitive?: PveCompetitive;
}

export interface pve {
	activitiesCleared: number; //activitiesCleared.basic.value
	assists: number; //assists.basic.value
	kills: number; //kills.basic.value
	timePlayed: string; //secondsPlayed.basic.displayValue
	timePlayedNumber: number; // secondsPlayed.basic.value
	deaths: number; //deaths.basic.value
	kdRatio: string; //killsDeathsRatio.basic.displayValue
	publicEventsCompleted: number; //publicEventsCompleted.basic.value
}

export interface pvp {
	activitiesPlayed: number; //activitesEntered.basic.value
	activitiesWon: number; //activitesWon.basic.value
	assists: number; //assists.basic.value
	kills: number; //kills.basic.value
	timePlayed: string; //secondsPlayed.basic.displayValue
	timePlayedNumber: number; //secondsPlayed.basic.value
	deaths: number; //deaths.basic.value
	bestSingleGameKills: number; //bestSingleGameKills.basic.value
	opponentsDefeated: number; //opponentsDefeated.basic.value
	efficiency: string; //efficiency.basic.displayValue
	kdRatio: string; //killsDeathsRatio.basic.displayValue
	winLossRatio: string; //winLossRatio.basic.displayValue
	longestKillSpree: number; //longestKillSpree.basic.value
}

export interface PveCompetitive {
	activitesPlayed: number; // activitesEntered.basic.value
	activitiesWon: number; // activitiesWon.basic.value
	assists: number; // assists.basic.value
	kills: number; // kills.basic.value
	killsPerGame: string; // kills.pga.displayValue
	timePlayed: string; // secondsPlayed.basic.displayValue
	timePlayedNumber: number; // secondsPlayed.basic.value
	deaths: number; // deaths.basic.value
	bestSingleGameKills: number; // bestSingleGameKills.basic.value
	kdRatio: string; // killsDeathsRatio.basic.displayValue
	winLossRatio: string; // winLossRatio.basic.displayValue
	longestKillSpree: number; // longestKillSpree.basic.value
	invasionKills: number; // invasionKills.basic.value
	invaderKills: number; // invaderKills.basic.value
	motesDeposited: number; // motesDeposited.basic.value
	motesLost: number; // motesLost.basic.value
}

export interface ClanInfo { // Response
	name: string; // detail.name
	creationDate: Date; // detail.creationDate
	about: string; // detail.about
	motto: string; // detail.motto
	founder: { // founder
		isOnline: boolean; // isOnline
		destinyInfo: Member; // destinyUserInfo.membershipType, etc.
	};
	flag: { // detail.clanInfo.clanBannerData
		decalId: number; // decalId
		decalColorId: number; // decalColorId
		decalBackgroundColorId: number; // decalBackgroundColorId
		gonfalonId: number; // gonfalonId
		gonfalonColorId: number; // gonfalonColorId
		gonfalonDetailId: number; // gonfalonDetailId
		gonfalonDetailColorId: number; // gonfalonDetailColorId
	}
}