import React from 'react';
import { BungieAccount, Member, Profile } from "./services/Interfaces";
import MemberList from "./MemberList";
import _ from 'lodash';

interface MembersProps {
   BungieAccounts: BungieAccount[];
   Members: Member[];
   Profiles: Profile[];
}

export default function Members(props: MembersProps) {
   const { BungieAccounts, Members, Profiles } = props;
   
   // The order that we grab display the accordions in
   const SPLITORDER = ['Founder', 'Acting Founder', 'Admin', 'Member', 'Beginner', 'None']; 

   // Calculate the days and hours for displaying
   // Boolean is only true if we're calculating the time for a character, since bungie returns that as minutes played
   function GetStringForTimePlayed(secondsPlayed: number): string {
      let minutesPlayed = secondsPlayed / 60;
      let hoursPlayed = minutesPlayed / 60;
      let numDays = Math.floor(hoursPlayed / 24);
      let numHours = Math.floor(hoursPlayed - (numDays * 24));

      if(numDays === 0 && numHours === 0) {
         return `${Math.floor(minutesPlayed)} minutes`;
      }

      return `${numDays}d ${numHours}h`;
   }

   // Break up members by their types. 
   function GetByRole(role: string): any[] {
      let returnVal: any[] = [];

      BungieAccounts.forEach((account) => {
         if(account.Memberships[0].clanMemberType === role) { // TODO: Update to not only check the first membership
            let totalMinutesPlayed = account.Profiles.reduce((prev, curr) => {
               prev += curr.Stats.pve!.timePlayedNumber;
               if(curr.Stats.pvp !== undefined) {
                  prev += curr.Stats.pvp.timePlayedNumber;
               }
               if(curr.Stats.pveCompetitive !== undefined) {
                  prev += curr.Stats.pveCompetitive.timePlayedNumber;
               }
               return prev;
            }, 0);
         
            // TODO: Update to use bungieaccount
            let membershipIds: string[] = [];
            let displayNames: string[] = [];
            let membershipTypes: number[] = [];
            let onlineStatuses: boolean[] = [];

            account.Memberships.forEach(member => {
               membershipIds.push(member.membershipId);
               displayNames.push(member.displayName);
               membershipTypes.push(member.membershipType);
               onlineStatuses.push(member.onlineStatus);
            });

            returnVal.push({
               'role': role,
               'membershipIds': membershipIds,
               'displayNames': displayNames,
               'favoriteClass': account.Profiles[0].MostPlayedCharacter.class,
               'favoriteClassTimePlayed': account.Profiles[0].MostPlayedCharacter.minutesPlayed,
               'membershipTypes': membershipTypes,
               'onlineStatuses': onlineStatuses,
               'dateLastOn': account.Memberships[0].dateLastOn,
               'totalTimePlayed': totalMinutesPlayed, // TODO: Change to be the sum of player time
               'getStringForTimePlayed': GetStringForTimePlayed,
               'pve': account.Profiles[0].Stats.pve,
               'pvp': account.Profiles[0].Stats.pvp,
               'pveCompetitive': account.Profiles[0].Stats.pveCompetitive,
            });
         }
      });

      // Members.forEach((member, index) => {
      //    if(member.clanMemberType === role) {
      //       let totalMinutesPlayed = Profiles[index].Stats.pve!.timePlayedNumber; // All these stats were actually in seconds
      //       if(Profiles[index].Stats.pvp !== undefined) {
      //          totalMinutesPlayed += Profiles[index].Stats.pvp!.timePlayedNumber;
      //       }
      //       if(Profiles[index].Stats.pveCompetitive !== undefined) {
      //          totalMinutesPlayed += Profiles[index].Stats.pveCompetitive!.timePlayedNumber;
      //       }

      //       returnVal.push({
      //          'role': role,
      //          'membershipId': member.membershipId,
      //          'displayName': member.displayName,
      //          'favoriteClass': Profiles[index].MostPlayedCharacter.class,
      //          'favoriteClassTimePlayed': Profiles[index].MostPlayedCharacter.minutesPlayed,
      //          'membershipType': member.membershipType,
      //          'onlineStatus': member.onlineStatus,
      //          'dateLastOn': member.dateLastOn,
      //          'totalTimePlayed': totalMinutesPlayed, // TODO: Change to be the sum of player time
      //          'getStringForTimePlayed': GetStringForTimePlayed,
      //          'pve': Profiles[index].Stats.pve,
      //          'pvp': Profiles[index].Stats.pvp,
      //          'pveCompetitive': Profiles[index].Stats.pveCompetitive,
      //       });
      //    }
      // });

      if(returnVal.length > 0) {
         returnVal = _.sortBy(returnVal, [function(o) { return o.displayNames[0].toLowerCase(); }]); // TODO: Update
      }
      
      return returnVal;
   }
   
   return (
      <div style={{backgroundColor: 'white',}}>
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