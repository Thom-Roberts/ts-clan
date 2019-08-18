import React from 'react';
import { ClanInfo, ClanRewardState } from "./services/Interfaces";
import HomeRewardStatus from "./HomeRewardStatus";
const clanBanner = require('./images/banner.png');

interface HomeProps {
	Info: ClanInfo;
	RewardState: ClanRewardState;
}

export default function Home(props: HomeProps) {
	const { name, creationDate, about, motto, founder } = props.Info;
	const { nightfall, raid, crucible, gambit, timeExpires } = props.RewardState;
	return (
		<div>
			<img src={clanBanner} alt={name} style={{width: '50px'}}/>
			<h3 style={{marginBottom: '0px',}}>{name} <span style={{fontSize: '12px', color: 'gray',}}>Circa {creationDate.getMonth() + 1}/{creationDate.getDate()}/{creationDate.getFullYear()}</span> </h3>
			<h6 style={{marginTop: '0px',}}>{motto}</h6>
			<p>
				{about}
			</p>
			
			<ul>
				<li>Nightfall: {nightfall.toString()}</li>
				<li>Raid: {raid.toString()}</li>
				<li>Crucible: {crucible.toString()}</li>
				<li>Gambit: {gambit.toString()}</li>
				<li>Next cycle: {timeExpires.toString()}</li>
				<li>
					<h3>Current rewards this week:</h3>
				</li>
				<HomeRewardStatus 
					Reward={props.RewardState}
				/>
			</ul>
		</div>
	);
} 