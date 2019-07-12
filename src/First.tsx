import React, { SyntheticEvent } from 'react';
import { GetClanMembers } from "./services/Clan";
import { GetHistoricalStats } from "./services/Stats";
import { Member } from "./services/Interfaces";
import { Stats } from "./services/Interfaces";

const initialState = {
	members: [] as Member[],
	stats: [] as Stats[],
};

// Personal note for later: First {} is props, second {} is state. Each should be an interface
class First extends React.Component<{} ,{members: Member[], stats: Stats[]}> {
	constructor(props : any) {
		super(props);

		this.state = initialState;

		this.handleClick = this.handleClick.bind(this);
	}

	private handleClick(event: SyntheticEvent) {
		event.preventDefault();

		let clanProm = GetClanMembers();

		clanProm.then((members : Member[]) => {
			console.log(members);
			let statsProm: Promise<Stats>[] = [];
			members.forEach((member: Member) => {
				statsProm.push(GetHistoricalStats(member));
			});

			Promise.all(statsProm).then((stats) => {
				console.log(stats);
				this.setState({
					members: members,
					stats: stats,
				});
			});
		});
	}

	render() {
		return (
		<div>
			Hi there, {process.env.APIKEY}
			<button onClick={this.handleClick}>Click me</button>
			{this.state.members.length > 0 &&
				this.state.stats.length > 0 &&
				<ul>
					{this.state.members.map((member, index) => {
						return (
							<li key={member.membershipId}>
								<img src={member.iconPath} alt="" style={{'width': '15px'}} />
								{member.displayName}:
								{(function() {
									switch(member.membershipType) {
										case 2: return " PlayStation";
										case 3: return " Xbox";
										case 4: return " PC";
										default: return ` Invalid Membership type: ${member.membershipType}`;
									}
								})()
							}
								<ul>
									<li> PvE:
										<ul>
											<li> {/* Doing !. is a null assertion operator */}
												Total time played: {this.state.stats[index].pve!.timePlayed}
											</li>
											<li>
												Number of activities: {this.state.stats[index].pve!.activitiesCleared}
											</li>
											<li>
												Kills: {this.state.stats[index].pve!.kills}
											</li>
											<li>
												Deaths: {this.state.stats[index].pve!.deaths}
											</li>
											<li>
												Assists: {this.state.stats[index].pve!.assists}
											</li>
											<li>
												K/D Ratio: {this.state.stats[index].pve!.kdRatio}
											</li>
											<li>
												Public Events completed: {this.state.stats[index].pve!.publicEventsCompleted}
											</li>
										</ul>
									</li>
									{
										this.state.stats[index].hasOwnProperty("pvp") &&
										<li>
											PvP:
											<ul>
												<li>
													Total time played: {this.state.stats[index].pvp!.timePlayed}
												</li>
												<li>
													Games played: {this.state.stats[index].pvp!.activitiesPlayed}
												</li>
												<li>
													Games won: {this.state.stats[index].pvp!.activitiesWon}
												</li>
												<li>
													Win/Loss Ratio: {this.state.stats[index].pvp!.winLossRatio}
												</li>
												<li>
													Kills: {this.state.stats[index].pvp!.kills}
												</li>
												<li>
													Defeats: {this.state.stats[index].pvp!.opponentsDefeated}
												</li>
												<li>
													Deaths: {this.state.stats[index].pvp!.deaths}
												</li>
												<li>
													Assists: {this.state.stats[index].pvp!.assists}
												</li>
												<li>
													K/D Ratio: {this.state.stats[index].pvp!.kdRatio}
												</li>
												<li>
													Efficiency: {this.state.stats[index].pvp!.efficiency}
												</li>
												<li>
													Most kills in one match: {this.state.stats[index].pvp!.bestSingleGameKils}
												</li>
												<li>
													Longest kill spree: {this.state.stats[index].pvp!.longestKillSpree}
												</li>
											</ul>
										</li>
									}

								</ul>
							</li>
						);
					})}
				</ul>

			}

		</div>
		);
	}

}

export default First;