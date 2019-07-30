import React from 'react';
import { Member, Profile } from "./services/Interfaces";


interface MembersProps {
   Members: Member[];
   Profiles: Profile[];
}

export default function Members(props: MembersProps) {
   const { Members, Profiles } = props;
   
   // Calculate the days and hours for displaying
   function GetStringForTimePlayed(minutesPlayed: number): string {
      let hoursPlayed = minutesPlayed / 60;
      let numDays = Math.floor(hoursPlayed / 24);
      let numHours = Math.floor(hoursPlayed - (numDays * 24));

      if(numDays === 0 && numHours === 0) {
         return `${minutesPlayed} minutes`;
      }

      return `${numDays}d ${numHours}h`;
   }

   return (
      <div>
         <ul>
            {Members.map((member, index) => {
               return (
                  <li key={`Members: ${member.membershipId}`}> Name: {member.displayName}. Platform: {member.membershipType}
                     <ul>
                        <li>
                           Favorite class: {Profiles[index].MostPlayedCharacter.class}
                        </li>
                        <li>
                           Time played on class: {GetStringForTimePlayed(Profiles[index].MostPlayedCharacter.minutesPlayed)}
                        </li>
                        <li>
                           Light level: {Profiles[index].MostPlayedCharacter.currentLightLevel}
                        </li>
                     </ul>
                  </li>
            );
            })}
         </ul>
      </div>
   );
}