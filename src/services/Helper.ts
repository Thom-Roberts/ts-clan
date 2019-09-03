import { Member, Profile, BungieAccount } from "./Interfaces";

// TODO: Make function to create a list of bungie accounts from the members and profiles objects

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