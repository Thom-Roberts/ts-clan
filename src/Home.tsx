import React from 'react';
import { ClanInfo } from "./services/Interfaces";

interface HomeProps {
	Info: ClanInfo;
}

export default class Home extends React.Component<HomeProps, {}> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<div>
				<ul>
					<li>Name: {this.props.Info.name}</li>
					<li>Creation Date: {this.props.Info.creationDate.toString()}</li>
					<li>About: {this.props.Info.about}</li>
					<li>Motto: {this.props.Info.motto}</li>
					<li>
						Founder:
						<ul>
							<li>
								Display name: {this.props.Info.founder.destinyInfo.displayName}
							</li>
							<li>
								Is Online: {this.props.Info.founder.isOnline.toString()}
							</li>
						</ul>
					</li>
				</ul>
			</div>
		);
	}
} 