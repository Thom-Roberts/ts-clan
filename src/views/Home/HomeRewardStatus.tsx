import React from "react";
import { Icon } from "semantic-ui-react";
import { ClanRewardState } from "../../services/Interfaces";
import './RewardStatus.css';
interface HomeRewardStatusProps {
   Reward: ClanRewardState;
}

export default function HomeRewardStatus(props: HomeRewardStatusProps) {
   const { nightfall, raid, crucible, gambit, timeExpires } = props.Reward;

   function RewardValue(title: string, value: boolean): JSX.Element {
      if(value === true) {
         return (
            <div>
               <Icon name='check circle' color='green'/>
               {title}
            </div>
         );
      }
      else {
         return (
            <div>
               <Icon name='circle' />
               {title}
            </div>
         )
      }
   }

   function getTimeRemaining(): string {
      let tempTime = timeExpires.valueOf() - Date.now(); // Gets difference in time in milliseconds
      if(tempTime === 0) {
         return '0 Minutes';
      }

      // Credit here: https://stackoverflow.com/questions/19225414/how-to-get-the-hours-difference-between-two-date-objects
      let numHours = Math.round(tempTime / 36e5);
      let numDays = Math.round(numHours / 24);
      if(numDays > 0) {
         if(numDays > 1) {
            return `${numDays} days`;
         }
         else {
            return `${numDays} day`;
         }
      }
      else {
         if(numHours > 1) {
            return `${numHours} hours`;   
         }
         else {
            return `${numHours} hour`;
         }
      }
   }

   return (
      <div>
         <h3>Current rewards this week <span className='remaining-text'>(Time remaining: {getTimeRemaining()})</span></h3>
         {RewardValue('Nightfall', nightfall)}
         {RewardValue('Raid', raid)}
         {RewardValue('Crucible', crucible)}
         {RewardValue('Gambit', gambit)}
      </div>
   );
}