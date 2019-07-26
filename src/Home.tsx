import React from 'react';
import { ClanInfo } from "./services/Interfaces";
const clanBanner = require('./images/banner.png');

interface HomeProps {
	Info: ClanInfo;
}

export default function Home(props: HomeProps) {
	return (
		<div>
			<img src={clanBanner} alt={props.Info.name} style={{width: '50px'}}/>
			<ul>
				<li>Name: {props.Info.name}</li>
				<li>Creation Date: {props.Info.creationDate.toString()}</li>
				<li>About: {props.Info.about}</li>
				<li>Motto: {props.Info.motto}</li>
				<li>
					Founder:
					<ul>
						<li>
							Display name: {props.Info.founder.destinyInfo.displayName}
						</li>
						<li>
							Is Online: {props.Info.founder.isOnline.toString()}
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
} 