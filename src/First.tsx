import React, { SyntheticEvent } from 'react';
import { GetClanMembers } from "./services/Clan";
import { GetHistoricalStats } from "./services/Stats";
import { Member } from "./services/Interfaces";
import { Stats } from "./services/Interfaces";

// Personal note for later: First {} is props, second {} is state. Each should be an interface
class First extends React.Component<{} ,{}> {
	constructor(props : any) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	private handleClick(event: SyntheticEvent) {
		event.preventDefault();

		let clanProm = GetClanMembers();

		clanProm.then((value : any) => {
			console.log(value);
			let statsProm: Promise<Stats>[] = [];
			value.forEach((member: Member) => {
				statsProm.push(GetHistoricalStats(member));
			});

			Promise.all(statsProm).then((values) => {
				console.log(values);
			});
		});
	}

	render() {
		return (
		<div>
			Hi there
			<button onClick={this.handleClick}>Click me</button>
		</div>
		);
	}
	
}

export default First;