import React, { SyntheticEvent } from 'react';
import { GetClanMembers } from "./services/Clan";

// Personal note for later: First {} is props, second {} is state. Each should be an interface
class First extends React.Component<{} ,{}> {
	constructor(props : any) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
	}

	private handleClick(event: SyntheticEvent) {
		event.preventDefault();

		let prom = GetClanMembers();

		prom.then((value : any) => {
			console.log(value);
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