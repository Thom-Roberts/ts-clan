import React from "react";
import { ClanRewardState } from "./services/Interfaces";

interface HomeRewardStatusProps {
   Reward: ClanRewardState;
}

export default function HomeRewardStatus(props: HomeRewardStatusProps) {
   const { nightfall, raid, crucible, gambit, timeExpires } = props.Reward;

   function RewardValue(title: string, value: boolean): JSX.Element {
      if(value === true) {
         return (
            <div>
               <span style={{display: 'inline-block', backgroundColor: 'green', width: '14px', height: '14px',
                              position: 'relative', top: '2px', marginRight: '5px',}}></span>
               {title}
            </div>
         );
      }
      else {
         return (
            <div>
               <span style={{display: 'inline-block', backgroundColor: 'lightgray', width: '14px', height: '14px',
                              position: 'relative', top: '2px', marginRight: '5px',}}></span>
               {title}
            </div>
         )
      }
   }

   return (
      <div>
         {RewardValue('Nightfall', nightfall)}
         {RewardValue('Raid', raid)}
         {RewardValue('Crucible', crucible)}
         {RewardValue('Gambit', gambit)}
      </div>
   );
}