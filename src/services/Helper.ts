import { Member, Profile, BungieAccount } from "./Interfaces";

/**
 * Sorts through the list of members and profiles and combines those with the same bungie membership id
 * @param members
 * @param profiles 
 */
export function GroupByBungieAccount(members: Member[], profiles: Profile[]): BungieAccount[] {
   let bungieAccounts: BungieAccount[] = [];
   members.forEach((member, index) => {
      let accountIndex = bungieAccounts.findIndex(account => {
         return account.bungieMembershipId === member.bungieMembershipId;
      });
      // If the account couldn't be found
      if(accountIndex === -1) {
         bungieAccounts.push({
            bungieMembershipId: member.bungieMembershipId,
            Memberships: [member],
            Profiles: [profiles[index]],
         });
      }
      else { // otherwise, push the member onto that position
         bungieAccounts[accountIndex].Memberships.push(member);
         bungieAccounts[accountIndex].Profiles.push(profiles[index]);
      }
   });

   return bungieAccounts;
}

/**
 * Returns the image appropriate to the membershiptype.
 * If not recognized, throws an error.
 * @param membershipType 
 */
export function GetMembershipIcon(membershipType: number) {
   switch(membershipType) {
      case 1:
         return require('../images/xboxIcon.png');
      case 2:
         return require('../images/psIcon.png');
      case 3:
         return require('../images/steam.png');
      case 4:
         return require('../images/battleNet.png');
      default:
         throw new Error('Membership type not recognized. Received: ' + membershipType);
   }
}