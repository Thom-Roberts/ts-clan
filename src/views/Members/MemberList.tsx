import React, { SyntheticEvent } from 'react';
import { Accordion, Icon, Segment} from 'semantic-ui-react';
import { MemberListProps } from "../../services/MemberListProps";
import { GetMembershipIcon } from '../../services/Helper';


import './memberList.css';

const psnIcon = require('../../images/psIcon.png');
const xboxIcon = require('../../images/xboxIcon.png');
const steamIcon = require('../../images/steam.png');
const bnetIcon = require('../../images/battleNet.png');


interface MemberListState {
   activeIndex: number;
   secondActiveIndex: string;
};

export default class MemberList extends React.Component<{MemberList: MemberListProps[]}, MemberListState> {
   constructor(props: any) {
      super(props);

      this.state = {
         activeIndex: -1,
         secondActiveIndex: '',
      };

      this.handleClick = this.handleClick.bind(this);
      this.handleInteriorClick = this.handleInteriorClick.bind(this);
   }

   private handleClick(e: SyntheticEvent, titleProps: any) {
      const { index } = titleProps;
      const { activeIndex } = this.state;

      const newIndex = activeIndex === index ? -1 : index;
      this.setState({ activeIndex: newIndex });
   }

   private handleInteriorClick(e: SyntheticEvent, titleProps: any) {
      const { index } = titleProps;
      const { secondActiveIndex } = this.state;

      const newIndex = secondActiveIndex === index ? '' : index;
      this.setState({ secondActiveIndex: newIndex });
   }

   private getPlayerOnlineCount(): number {
      const { MemberList } = this.props;
      // Condense the online count
      return MemberList.reduce((total, curr): number => {
         return curr.onlineStatuses[0] ? total + 1 : total; // TODO: Update
      }, 0);
   }

   private getTimeToDisplay(dateLastOn: Date) : string {
      let timeDifferenceMs = Date.now() - dateLastOn.valueOf(); // Time in milliseconds
      let numMinutes = timeDifferenceMs / 60000; // 1000 ms in a second, 60 seconds in a minute
      let numHours = numMinutes / 60; // 60 minutes in an hour
      let numDays = numHours / 24; // 24 hours in a day
      
      let roundedMinutes = Math.floor(numMinutes);
      let roundedHours = Math.floor(numHours);
      let roundedDays = Math.floor(numDays);
      let roundedMonths = Math.floor(numDays / 30);

      if(roundedDays > 365) {
         return `>1 year ago`;
      }

      if(roundedMonths > 0) {
         if(roundedMonths > 1) {
            return `${roundedMonths} months ago`;
         }
         return `${roundedMonths} month ago`;
      }

      if(roundedDays > 0) {
         if(roundedDays > 1) {
            return `${roundedDays} days ago`;
         }
         return `${roundedDays} day ago`;
      }
      if(roundedHours > 0) {
         if(roundedHours > 1) {
            return `${roundedHours} hours ago`;
         }
         return `${roundedHours} hour ago`;
      }
      if(roundedMinutes > 0) {
         if(roundedMinutes > 1) {
            return `${roundedMinutes} minutes ago`;
         }
         return `${roundedMinutes} minute ago`;
      }
      
      return 'Just now';
   }

   private getOnlineStatus(onlineStatuses: boolean[]): boolean {
      onlineStatuses.forEach(status => { // return true if one of the online statuses is true
         if(status === true) {
            return true;
         }
      });
      return false; // false if none of them are true
   }

   private getDisplayName(displayNames: string[], isPrimary: boolean[]): string {
      const index =  isPrimary.findIndex(value => { // searches for the primary account
         return value;
      });

      return displayNames[index];
   }

   render() {
      const { MemberList } = this.props;
      const { activeIndex, secondActiveIndex } = this.state;

      return (
         <div style={{marginBottom: '10px', width: '100%',}}> {/* Space between each accordion */}
            <div style={{maxWidth: '600px', margin: '0 auto',}}>
               <div style={{paddingBottom: '5px',}}> {/* Space between the role name and bottom */}
                  <span style={{textAlign: 'left',}}>{MemberList[0].role}:</span>
                  <span style={{float: 'right',}}>{this.getPlayerOnlineCount().toString()} online</span>
               </div>
               <Accordion styled>
                  {MemberList.map((memberprops, index) => {
                     return (
                        <div key={`MemberList: ${memberprops.membershipIds[0]}`}>
                           <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}
                                 style={{position: 'relative',}}>
                              <Icon name='dropdown' />
                              <span className='online-status-circle-wrapper'>
                                 <div className={`online-status-circle ${this.getOnlineStatus(memberprops.onlineStatuses) ? 'online' : 'offline'}`} />
                              </span>
                              <span>
                                 {this.getDisplayName(memberprops.displayNames, memberprops.isPrimary)} 
                              </span>
                              <span className='right-pushed'>
                                 <span style={{fontWeight: 'normal'}}>

                                 </span>
                                 {this.getOnlineStatus(memberprops.onlineStatuses) ? (
                                    'Online'
                                 ) : (
                                    <span>
                                       Last Online: {this.getTimeToDisplay(memberprops.dateLastOn)}
                                    </span>
                                 )}
                              </span>
                           </Accordion.Title>
                           <Accordion.Content active={activeIndex === index}>
                                 <p>
                                    Favorite Class: {memberprops.favoriteClass}
                                    {
                                       // TODO: Fix this time issue, add a / for character time / total time
                                    }
                                    <span style={{float: 'right',}}>{memberprops.getStringForTimePlayed(memberprops.favoriteClassTimePlayed * 60)} / {memberprops.getStringForTimePlayed(memberprops.totalTimePlayed)}</span>
                                 </p>
                                 { /* Display each platform they own with their online status here */}
                                 <Segment.Group>
                                    {memberprops.membershipIds.map((membershipId, index) => {
                                       return (
                                          <Segment key={`MemberListSegment: ${membershipId}`}>
                                             <img src={GetMembershipIcon(memberprops.membershipTypes[index])} alt="Temp" style={{width: '15px', height: '15px', marginRight: '5px', position: 'relative', top: '2px',}}/>
                                             <span>{memberprops.displayNames[index]}</span>
                                             <span className='right-pushed'>
                                                <span className='online-status-circle-wrapper'>
                                                   <div className={`online-status-circle ${memberprops.onlineStatuses[index] ? 'online' : 'offline'}`} />
                                                </span>
                                                {memberprops.onlineStatuses[index] ? 'Online' : 'Offline'}
                                             </span>
                                          </Segment>
                                       );
                                    })}
                                 </Segment.Group>
                                 
                              <Accordion styled>
                                 {memberprops.pve !== undefined &&
                                    <div>
                                       <Accordion.Title active={secondActiveIndex === `${index}a`} index={`${index}a`} onClick={this.handleInteriorClick}>
                                          <Icon name='dropdown' />
                                          <span style={{textAlign: 'left',}}>PvE</span>
                                          <span style={{float: 'right',}}>{memberprops.pve.timePlayed}</span>
                                       </Accordion.Title>
                                       <Accordion.Content active={secondActiveIndex === `${index}a`}>
                                          <div style={{margin: '0px',}}>Time Played: {memberprops.pve.timePlayed}</div>
                                          <div style={{margin: '0px',}}>KD ratio: {memberprops.pve.kdRatio}</div>
                                       </Accordion.Content>
                                    </div>
                                 }
                                 
                                 {memberprops.pvp !== undefined &&
                                    <div>
                                       <Accordion.Title active={secondActiveIndex === `${index}b`} index={`${index}b`} onClick={this.handleInteriorClick}>
                                          <Icon name='dropdown' />
                                          <span style={{textAlign: 'left',}}>PvP</span>
                                          <span style={{float: 'right',}}>{memberprops.pvp.timePlayed}</span>
                                       </Accordion.Title>
                                       <Accordion.Content active={secondActiveIndex === `${index}b`}>
                                          <div style={{margin: '0px',}}>Time Played: {memberprops.pvp.timePlayed}</div>
                                          <div style={{margin: '0px',}}>Efficiency: {memberprops.pvp.efficiency}</div>
                                       </Accordion.Content>
                                    </div>
                                 }
                                 
                                 {memberprops.pveCompetitive.activitesPlayed > 0 &&
                                    <div>
                                       <Accordion.Title active={secondActiveIndex === `${index}c`} index={`${index}c`} onClick={this.handleInteriorClick}>
                                          <Icon name='dropdown' />
                                          <span style={{textAlign: 'left',}}>PvE Competitive</span>
                                          <span style={{float: 'right',}}>{memberprops.pveCompetitive.timePlayed}</span>
                                       </Accordion.Title>
                                       <Accordion.Content active={secondActiveIndex === `${index}c`}>
                                          <div style={{margin: '0px',}}>Time Played: {memberprops.pveCompetitive.timePlayed}</div>
                                          <div style={{margin: '0px',}}>KD Ratio: {memberprops.pveCompetitive.kdRatio}</div>
                                       </Accordion.Content>
                                    </div>
                                 }
                                 

                              </Accordion>
                           </Accordion.Content>
                        </div>
                     );
                  })}
               </Accordion>
            </div>
         </div>
      );
   }
}