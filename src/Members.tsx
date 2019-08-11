import React from 'react';
import { Member, Profile } from "./services/Interfaces";
import MemberList from "./MemberList";

interface MembersProps {
   Members: Member[];
   Profiles: Profile[];
}

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
   function GetByRole(role: string): any[] {
      let returnVal: any[] = [];

      Members.forEach((member, index) => {
         if(member.clanMemberType === role) {
            returnVal.push({
               'role': role,
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
                  <MemberList MemberList={roleCount} key={`Role: ${role}`}/>
               );
            }
            else {
               return null;
            }
         })}

      </div>
   );
}