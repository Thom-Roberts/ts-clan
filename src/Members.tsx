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
                        <li>
                           <div style={{position: 'relative', width: '300px', height: '60.75px', backgroundImage: `url(${Profiles[index].MostPlayedCharacter.emblemLocation})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover',}}>
                              <div style={{display: 'inline-block', paddingTop: '10px', paddingLeft: '60px', width: '50%', textAlign: 'left', color: 'white', fontWeight: 'bold', fontSize: '15px', float: 'left',}}>
                                 {member.displayName}
                              </div>  
                              <div style={{display: 'inline-block', width: '50%', height: '100%', textAlign: 'right', paddingRight: '7px',}}>
                                 <div style={{position: 'relative', color: 'aqua', fontWeight: 'bold', fontSize: '22px', paddingTop: '10px',}}>
                                    <div style={{display: 'inline-block', border: '2px solid aqua', transform: 'rotate(45deg)', width: '7px', height: '7px', marginRight: '2px', marginBottom: '7px',}}></div>
                                    {Profiles[index].MostPlayedCharacter.currentLightLevel}
                                 </div>
                                 <div style={{position: 'relative', color: 'white', fontWeight: 'normal', fontSize: '12px', paddingTop: '3px',}}>Level {Profiles[index].MostPlayedCharacter.currentLevel}</div>  
                              </div>
                           </div>      
                        </li>
                     </ul>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}