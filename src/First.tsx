import React, { SyntheticEvent } from 'react';
import { GetClanMembers } from "./services/Clan";
import { GetHistoricalStats } from "./services/Stats";
import { Member } from "./services/Interfaces";
import { Stats } from "./services/Interfaces";
const initialState = {
	members: [],
	stats: []
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
			Hi there
			<button onClick={this.handleClick}>Click me</button>
			{this.state.members.length > 0 &&
				<ul>

				</ul>

			}

		</div>
		);
	}
	
}

export default First;