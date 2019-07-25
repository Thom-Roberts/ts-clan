import React, { SyntheticEvent } from 'react';
import { GetMembers, GetStats } from "./services/dynamodb";
import { Member, Stats } from "./services/Interfaces";
import { Button, Segment, Menu } from "semantic-ui-react";
import "./PvETable";
import * as bnetIcon from './images/battleNet.png';
import * as psnIcon from './images/psIcon.png';
import PvETable from './PvETable';
import PvPTable from './PvPTable';
const xboxIcon = require('./images/xboxIcon.png');
// import * as xboxIcon from './images/xboxIcon.png'; //WHY DOES THIS NOT WORK??

interface FirstState {
	members: Member[];
	stats: Stats[];
	fetching: boolean;
	activeItem: string;
}

const initialState = {
	members: [] as Member[],
	stats: [] as Stats[],
	fetching: false,
	activeItem: 'pve',
};

// Personal note for later: First {} is props, second {} is state. Each should be an interface
class First extends React.Component<{} ,FirstState> {
	constructor(props : any) {
		super(props);

		this.state = initialState;

		this.handleClick = this.handleClick.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	private handleClick(event: SyntheticEvent) {
		event.preventDefault();
		this.setState({
			fetching: true,
		});

		let members = GetMembers();
		let stats = GetStats();
		Promise.all([members, stats]).then(values => {
			console.log(values);
			this.setState({
				members: values[0],
				stats: values[1],
			});
		}).catch(err => {
			alert(`Failed to get information due to ${err}`);
		}).finally(() => {
			this.setState({
				fetching: false,
			});
		});
	}

	private handleMenuClick(event: SyntheticEvent, { name }: any) {
		this.setState({
			activeItem: name,
		});
	}

	render() {
		const { members, stats, fetching, activeItem } = this.state;
		const temp = (<Button onClick={this.handleClick}>Click me</Button>);
		const temp2 = (<Button loading>Click me</Button>);

		return (
		<div>
			{(function() {
				if(fetching) {
					return temp2;
				}
				return temp;
			})()}
			

			{members.length > 0 && stats.length > 0 &&
				<div>
					<Menu pointing secondary>
						<Menu.Item name='pve' active={activeItem === 'pve'} onClick={this.handleMenuClick}/>
						<Menu.Item name='pvp' active={activeItem === 'pvp'} onClick={this.handleMenuClick}/>
					</Menu>
					{activeItem === 'pve' && 
						<div>
						PvE Stats
						<PvETable
							members={members}
							stats={stats}
						/>
						</div>
					}
					{activeItem === 'pvp' && 
						<div>
							PvP Stats
							<PvPTable
								members={members}
								stats={stats}
							/>
						</div>
					}
					
					<Segment.Group>
					{members.map((member, index) => {
						return (
							<Segment key={member.membershipId}>
								<img src=
								{(function() {
									switch(member.membershipType) {
										case 2: return psnIcon;
										case 3: return xboxIcon;
										case 4: return bnetIcon;
										default: return ` Invalid Membership type: ${member.membershipType}`;
									}
								})()
								}
								alt="" style={{'width': '14px', 'position': 'relative', 'top': '2px'}} />
								{member.displayName}:

								<ul>
									<li> PvE:
										<ul>
											<li> {/* Doing !. is a null assertion operator */}
												Total time played: {stats[index].pve!.timePlayed}
											</li>
											<li>
												Number of activities: {stats[index].pve!.activitiesCleared}
											</li>
											<li>
												Kills: {stats[index].pve!.kills}
											</li>
											<li>
												Deaths: {stats[index].pve!.deaths}
											</li>
											<li>
												Assists: {stats[index].pve!.assists}
											</li>
											<li>
												K/D Ratio: {stats[index].pve!.kdRatio}
											</li>
											<li>
												Public Events completed: {stats[index].pve!.publicEventsCompleted}
											</li>
										</ul>
									</li>
									{
										stats[index].hasOwnProperty("pvp") &&
										<li>
											PvP:
											<ul>
												<li>
													Total time played: {stats[index].pvp!.timePlayed}
												</li>
												<li>
													Games played: {stats[index].pvp!.activitiesPlayed}
												</li>
												<li>
													Games won: {stats[index].pvp!.activitiesWon}
												</li>
												<li>
													Win/Loss Ratio: {stats[index].pvp!.winLossRatio}
												</li>
												<li>
													Kills: {stats[index].pvp!.kills}
												</li>
												<li>
													Defeats: {stats[index].pvp!.opponentsDefeated}
												</li>
												<li>
													Deaths: {stats[index].pvp!.deaths}
												</li>
												<li>
													Assists: {stats[index].pvp!.assists}
												</li>
												<li>
													K/D Ratio: {stats[index].pvp!.kdRatio}
												</li>
												<li>
													Efficiency: {stats[index].pvp!.efficiency}
												</li>
												<li>
													Most kills in one match: {stats[index].pvp!.bestSingleGameKils}
												</li>
												<li>
													Longest kill spree: {stats[index].pvp!.longestKillSpree}
												</li>
											</ul>
										</li>
									}

								</ul>
							</Segment>
						);
					})}
					</Segment.Group>
				</div>
			}

		</div>
		);
	}

}

export default First;