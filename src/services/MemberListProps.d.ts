import { pve, pvp, PveCompetitive } from "./Interfaces";

export interface MemberListProps {
	role: string;
	membershipIds: string[];
	displayNames: string[];
	membershipTypes: number[];
	favoriteClass: string;
	favoriteClassTimePlayed: number;
	totalTimePlayed: number;
	onlineStatuses: boolean[];
	isPrimary: boolean[];
	dateLastOn: Date;
	getStringForTimePlayed: Function;
	pve: pve;
	pvp: pvp;
	pveCompetitive: PveCompetitive;
}