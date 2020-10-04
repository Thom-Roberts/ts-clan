import React, { SyntheticEvent } from 'react';
import _ from 'lodash';

import { GetMembers, GetProfiles } from "./services/dynamodb";
import { GetClanInfo, GetClanRewardState } from "./services/Clan";
import { GroupByBungieAccount } from "./services/Helper";
import { BungieAccount, Member, ClanInfo, Profile, Stats, ClanRewardState } from "./services/Interfaces";
import { Button, Menu, Transition, Segment, Dimmer, Loader } from "semantic-ui-react";

import PvETable from './views/StatTables/PvETable';
import PvPTable from './views/StatTables/PvPTable';
import PvECompTable from "./views/StatTables/PvECompTable";
import Members from './views/Members/Members';
import Home from './views/Home/Home';

interface MainState {
	bungieAccounts: BungieAccount[];
	members: Member[];
	profiles: Profile[];
	clanInfo: ClanInfo;
	clanRewardState: ClanRewardState;
	fetching: boolean;
	activeItem: string;
	animation: string;
}

const initialState = {
	bungieAccounts: [] as BungieAccount[],
	members: [] as Member[],
	profiles: [] as Profile[],
	clanInfo: {} as ClanInfo,
	clanRewardState: {} as ClanRewardState,
	fetching: false,
	activeItem: 'home',
	animation: 'fade',
};

// Personal note for later: First {} is props, second {} is state. Each should be an interface
class Main extends React.Component<{} ,MainState> {
	constructor(props : any) {
		super(props);

		this.state = initialState;

		this.handleClick = this.handleClick.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	componentDidMount() {
		if(process.env.NODE_ENV === 'production') {
			this.FetchFromDatabase();
			this.FetchClanInfo();
		}
	}

	private handleClick(event: SyntheticEvent) {
		if(!this.state.fetching) {
			event.preventDefault();
			this.setState({
				fetching: true,
			});
			
			this.FetchFromDatabase();
			this.FetchClanInfo();
		}
	}

	private handleMenuClick(event: SyntheticEvent, { name }: any) {
		this.setState({
			activeItem: name,
		});
	}

	private FetchFromDatabase() {
		let members = GetMembers();
		let profiles = GetProfiles();
		Promise.all([members, profiles]).then(values => {
			
			const BUNGIEACCOUNTS = GroupByBungieAccount(values[0], values[1]);
			this.setState({
				bungieAccounts: BUNGIEACCOUNTS,
				members: values[0],
				profiles: values[1],
			});
		}).catch(err => {
			alert(`Failed to get information due to ${err}`);
		}).finally(() => {
			this.setState({
				fetching: false,
			});
		});
	}

	private FetchClanInfo() {
		let prom1 = GetClanInfo();
		let prom2 = GetClanRewardState();

		Promise.all([prom1, prom2]).then(values => {
			this.setState({
				clanInfo: values[0],
				clanRewardState: values[1],
			});
		}).catch(err => {
			console.error(err);
		});
	}

	render() {
		const { bungieAccounts, members, profiles, clanInfo, clanRewardState, fetching, activeItem, animation } = this.state;

		return (
			<div style={{padding: '0px 5px',}}>
				{process.env.NODE_ENV !== 'production' && 
					<Button loading={fetching} onClick={this.handleClick}>Click me</Button>
				}
				
				{fetching && 
					<div>
						<Segment style={{height: '100px',}}>
							<Dimmer active>
								<Loader>Loading...</Loader>
							</Dimmer>
						</Segment>
					</div>
				}

				{members.length > 0 && profiles.length > 0 &&
					<div>
						<Menu pointing secondary>
							<Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleMenuClick}/>
							<Menu.Item name='members' active={activeItem === 'members'} onClick={this.handleMenuClick}/>
							<Menu.Item name='pve' active={activeItem === 'pve'} onClick={this.handleMenuClick}/>
							<Menu.Item name='pvp' active={activeItem === 'pvp'} onClick={this.handleMenuClick}/>
							<Menu.Item name="pveComp" active={activeItem === 'pveComp'} onClick={this.handleMenuClick}/>
						</Menu>
						
						<Transition.Group animation={animation} duration='600'>
							<div style={{padding: '0px 20px',}}>
								{activeItem === 'home' && !(_.isEmpty(clanInfo)) && 
									<Home 
										Info={clanInfo} 
										RewardState={clanRewardState}
									/>
								}

								{activeItem === 'members' && 
									<Members 
										BungieAccounts={bungieAccounts}
										Members={members} 
										Profiles={profiles}
									/>
								}

								{activeItem === 'pve' && 
									<PvETable
										members={members}
										stats={(function() {
											return profiles.map(value => {
												return value.Stats;
											});
										})()}
									/>
								}
								{activeItem === 'pvp' && 
									<PvPTable
										members={members}
										stats={(function() {
											return profiles.map(value => {
												return value.Stats;
											});
										})()}
									/>
								}
								{activeItem === 'pveComp' && 
									<div>
										{ // Removing gambit stats where the activites played is 0
											(function() {
												let statsToPush: Stats[] = [];
												let memberToPush: Member[] = [];
												profiles.forEach((profile, index) => {
													if(profile.Stats.pveCompetitive!.activitesPlayed !== 0) {
														statsToPush.push(profile.Stats);
														memberToPush.push(members[index]);
													}
												});

												return (
													<PvECompTable
														members={memberToPush}
														stats={statsToPush}
													/>
												);
											})()
										}
									</div>
								}
							</div>
						</Transition.Group>
					</div>
				}
			</div>
		);
	}
}

export default Main;