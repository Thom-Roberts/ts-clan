import React from 'react';
import { Member, Profile } from "./services/Interfaces";
import MemberList from "./MemberList";

interface MembersProps {
   Members: Member[];
   Profiles: Profile[];
}

interface MemberListProps {
   membershipId: string;
   displayName: string;
   membershipType: number;
   favoriteClass: string;
   totalTimePlayed: number;
   onlineStatus: boolean;
   getStringForTimePlayed: Function;
};

export default function Members(props: MembersProps) {
   const { Members, Profiles } = props;
   
   // The order that we grab display the accordions in
   const SPLITORDER = ['Founder', 'Acting Founder', 'Admin', 'Member', 'Beginner', 'None']; 

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

   // Break up members by their types. 
   function GetByRole(role: string): MemberListProps[] {
      let returnVal: MemberListProps[] = [];

      Members.forEach((member, index) => {
         if(member.clanMemberType === role) {
            returnVal.push({
               'membershipId': member.membershipId,
               'displayName': member.displayName,
               'favoriteClass': Profiles[index].MostPlayedCharacter.class,
               'membershipType': member.membershipType,
               'onlineStatus': member.onlineStatus, // TODO: Change to valid online status
               'totalTimePlayed': Profiles[index].MostPlayedCharacter.minutesPlayed, // TODO: Change to be the sum of player time
               'getStringForTimePlayed': GetStringForTimePlayed,
            });
         }
      });

      return returnVal;
   }
   


   return (
      <div>
         {SPLITORDER.map(role => {
            let roleCount = GetByRole(role);
            if(roleCount.length > 0) {
               return (
                  <div key={`Role: ${role}`} style={{margin: '0 auto'}}>
                     {role}: 
                     <MemberList MemberList={roleCount} />
                  </div>
               );
            }
            else {
               return null;
            }
         })}



         <ul>
            {Members.map((member, index) => {
               return (
                  <li key={`Members: ${member.membershipId}`}> Name: {member.displayName}. Platform: {member.membershipType}
                     <ul>
                        <li>
                           Member Type: {member.clanMemberType}
                        </li>
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
                           <div style={{position: 'relative', width: '300px'}}>
                              <img src={Profiles[index].MostPlayedCharacter.emblemLocation} style={{width: '100%'}} alt={`${member.displayName} emblem`}/>
                              <div style={{position: 'absolute', top: '15%', left: '20%', color: 'white', fontWeight: 'bold', fontSize: '15px'}}>{member.displayName}</div>
                              <div style={{position: 'absolute', top: '15%', right: '3%', color: 'aqua', fontWeight: 'bold', fontSize: '22px'}}>
                                 <div style={{display: 'inline-block', border: '2px solid aqua', transform: 'rotate(45deg)', width: '7px', height: '7px', marginRight: '2px', marginBottom: '7px'}}></div>
                                 {Profiles[index].MostPlayedCharacter.currentLightLevel}
                              </div>
                              <div style={{position: 'absolute', top: '50%', right: '3%', color: 'white', fontWeight: 'normal', fontSize: '12px'}}>Level {Profiles[index].MostPlayedCharacter.currentLevel}</div>
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