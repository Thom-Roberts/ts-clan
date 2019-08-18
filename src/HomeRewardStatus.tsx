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
               <span style={{display: 'inline-block', backgroundColor: 'black', width: '15px', height: '15px',
                              position: 'relative', top: '2px', marginRight: '5px', border: '1px solid white',}}>
                  <span style={{display: 'inline-block', backgroundColor: 'green', width: '11px', height: '11px',
                                 position: 'relative', bottom: '3px', left: '1px',}}></span>
               </span>
               {title}
            </div>
         );
      }
      else {
         return (
            <div>
               <span style={{display: 'inline-block', backgroundColor: 'black', width: '15px', height: '15px',
                              position: 'relative', top: '2px', marginRight: '5px', border: '1px solid white',}}>
               </span>
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