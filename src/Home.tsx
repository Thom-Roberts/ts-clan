import React from 'react';
import { ClanInfo, ClanRewardState } from "./services/Interfaces";
const clanBanner = require('./images/banner.png');

interface HomeProps {
	Info: ClanInfo;
	RewardState: ClanRewardState;
}

export default function Home(props: HomeProps) {
	const { name, creationDate, about, motto, founder } = props.Info;
	return (
		<div>
			<img src={clanBanner} alt={name} style={{width: '50px'}}/>
			<h3 style={{marginBottom: '0px',}}>{name} <span style={{fontSize: '12px', color: 'gray',}}>Circa {creationDate.getMonth() + 1}/{creationDate.getDate()}/{creationDate.getFullYear()}</span> </h3>
			<h6 style={{marginTop: '0px',}}>{motto}</h6>
			<p>
				{about}
			</p>
			
			<ul>
				<li>Name: {name}</li>
				<li>Creation Date: {creationDate.toString()}</li>
				<li>About: {about}</li>
				<li>Motto: {motto}</li>
				<li>
					Founder:
					<ul>
						<li>
							Display name: {founder.destinyInfo.displayName}
						</li>
						<li>
							Is Online: {founder.isOnline.toString()}
						</li>
					</ul>
				</li>
			</ul>
		</div>
	);
} 