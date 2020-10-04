import React from 'react';
import { ClanInfo, ClanRewardState } from "../../services/Interfaces";
import HomeRewardStatus from "./HomeRewardStatus";

interface HomeProps {
	Info: ClanInfo;
	RewardState: ClanRewardState;
}

export default function Home(props: HomeProps) {
	const { name, creationDate, about, motto } = props.Info;

	return (
		<div>
			<div style={{textAlign: 'center',}}>
				<h2 style={{marginBottom: '0px'}}>
					{name} 
				</h2>
				<i style={{marginTop: '0px'} }>
					{motto}
				</i>
				<div style={{fontSize: '12px', color: 'gray'}}>
					Circa {creationDate.getMonth() + 1}/{creationDate.getDate()}/{creationDate.getFullYear()}
				</div> 
			</div>
			<p>
				{about}
			</p>
			
			<HomeRewardStatus 
				Reward={props.RewardState}
			/>
		</div>
	);
} 