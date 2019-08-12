import React, { SyntheticEvent } from 'react';
import { GetMembers, GetProfiles } from "./services/dynamodb";
import { GetClanInfo } from "./services/Clan";
import { Member, ClanInfo, Profile } from "./services/Interfaces";
import { Button, Menu, Transition, Segment, Dimmer, Loader } from "semantic-ui-react";
import PvETable from './PvETable';
import PvPTable from './PvPTable';
import Members from './Members';
import _ from 'lodash';
import Home from './Home';

interface MainState {
	members: Member[];
	profiles: Profile[];
	clanInfo: ClanInfo;
	fetching: boolean;
	activeItem: string;
	animation: string;
}

const initialState = {
	members: [] as Member[],
	profiles: [] as Profile[],
	clanInfo: {} as ClanInfo,
	fetching: false,
	activeItem: 'home',
	animation: 'horizontal flip',
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

			GetClanInfo().then(value => {
				this.setState({
					clanInfo: value
				});
			}).catch(err => {
				console.error(err);
			});
		}
	}

	private handleClick(event: SyntheticEvent) {
		if(!this.state.fetching) {
			event.preventDefault();
			this.setState({
				fetching: true,
			});
			
			this.FetchFromDatabase();
			GetClanInfo().then(value => {
				this.setState({
					clanInfo: value
				});
			}).catch(err => {
				console.error(err);
			});
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
			console.log(values);
			this.setState({
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

	render() {
		const { members, profiles, clanInfo, fetching, activeItem, animation } = this.state;

		return (
		<div>
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
					</Menu>
					
					<Transition.Group animation={animation} duration='600'>
						{activeItem === 'home' && !(_.isEmpty(clanInfo)) && 
							<Home Info={clanInfo} />
						}

						{activeItem === 'members' && 
							<div>
								<Members 
									Members={members} 
									Profiles={profiles}
								/>
							</div>
						}

						{activeItem === 'pve' && 
						<div>
							PvE Stats
							<PvETable
								members={members}
								stats={(function() {
									return profiles.map(value => {
										return value.Stats;
									});
								})()}
							/>
						</div>
						}
						{activeItem === 'pvp' && 
						<div>
							PvP Stats
							<PvPTable
								members={members}
								stats={(function() {
									return profiles.map(value => {
										return value.Stats;
									});
								})()}
							/>
						</div>
						}
					</Transition.Group>
				</div>
			}

		</div>
		);
	}

}

export default Main;