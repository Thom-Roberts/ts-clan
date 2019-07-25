import React, { SyntheticEvent } from 'react';
import { GetMembers, GetStats } from "./services/dynamodb";
import { Member, Stats } from "./services/Interfaces";
import { Button, Menu, Transition } from "semantic-ui-react";
import "./PvETable";
import PvETable from './PvETable';
import PvPTable from './PvPTable';


interface FirstState {
	members: Member[];
	stats: Stats[];
	fetching: boolean;
	activeItem: string;
	animation: string;
}

const initialState = {
	members: [] as Member[],
	stats: [] as Stats[],
	fetching: false,
	activeItem: 'pve',
	animation: 'fade left',
};

// Personal note for later: First {} is props, second {} is state. Each should be an interface
class First extends React.Component<{} ,FirstState> {
	constructor(props : any) {
		super(props);

		this.state = initialState;

		if(process.env.NODE_ENV === 'production') {
			this.FetchFromDatabase();
		}

		this.handleClick = this.handleClick.bind(this);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}

	private handleClick(event: SyntheticEvent) {
		if(!this.state.fetching) {
			event.preventDefault();
			this.setState({
				fetching: true,
			});
			
			this.FetchFromDatabase();
			
		}
	}

	private handleMenuClick(event: SyntheticEvent, { name }: any) {
		let animation = 'fade right';
		if(name === 'pve') {
			animation = 'fade left';
		}
		this.setState({
			activeItem: name,
			animation: animation
		});
	}

	private FetchFromDatabase() {
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

	render() {
		const { members, stats, fetching, activeItem, animation } = this.state;

		return (
		<div>
			{process.env.NODE_ENV !== 'production' && 
				<Button loading={fetching} onClick={this.handleClick}>Click me</Button>
			}
			
			{members.length > 0 && stats.length > 0 &&
				<div>
					<Menu pointing secondary>
						<Menu.Item name='pve' active={activeItem === 'pve'} onClick={this.handleMenuClick}/>
						<Menu.Item name='pvp' active={activeItem === 'pvp'} onClick={this.handleMenuClick}/>
					</Menu>
					
					<Transition.Group animation={animation} duration='500'>
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
					</Transition.Group>
				</div>
			}

		</div>
		);
	}

}

export default First;