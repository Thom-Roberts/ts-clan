import React, { SyntheticEvent } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { pve, pvp, PveCompetitive } from './services/Interfaces';
//import * as psnIcon from './images/psIcon.png';
//import * as pcIcon from "./images/battleNet.png";
const psnIcon = require('./images/psIcon.png');
const xboxIcon = require('./images/xboxIcon.png');
const pcIcon = require('./images/battleNet.png');

interface MemberListProps {
   role: string;
   membershipId: string;
   displayName: string;
   membershipType: number;
   favoriteClass: string;
   favoriteClassTimePlayed: number;
   totalTimePlayed: number;
   onlineStatus: boolean;
   dateLastOn: Date;
   getStringForTimePlayed: Function;
   pve: pve;
   pvp: pvp;
   pveCompetitive: PveCompetitive;
};

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
         return curr.onlineStatus ? total + 1 : total;
      }, 0);
   }

   private GetTimeToDisplay(dateLastOn: Date) : string {
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

   render() {
      const { MemberList } = this.props;
      const { activeIndex, secondActiveIndex } = this.state;

      const ONLINESTATUS = (
         <span style={{display: 'inline-block', height: '100%',}}>
            <span style={{display: 'inline-block', width: '15px', height: '15px', 
                           borderRadius: '15px', marginRight: '3px', backgroundColor: 'green', 
                           position: 'relative', top: '2px',}}></span>
            Online
         </span>
      );

      const OFFLINESTATUS = (dateLastOn: Date) => {
         return (
            <span style={{display: 'inline-block', height: '100%',}}>
               <span style={{display: 'inline-block', width: '15px', height: '15px', 
                              borderRadius: '15px', marginRight: '3px', border: '3px solid lightgrey',
                              position: 'relative', top: '2px',}}></span>
               Last Online: {this.GetTimeToDisplay(dateLastOn)}
            </span>
         );
      }


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
                        <div key={`MemberList: ${memberprops.membershipId}`}>
                           <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}
                              style={{position: 'relative',}}>
                              <Icon name='dropdown' />
                              <span>
                                 {/* Platform image */}
                                 <img src={(function() {
                                    switch(memberprops.membershipType) {
                                       case 2:
                                          return psnIcon;
                                       case 3:
                                          return xboxIcon;
                                       case 4:
                                          return pcIcon;
                                       default:
                                          throw new Error(`Invalid membership type: ${memberprops.membershipType}`);
                                    }
                                 })()} alt="Temp" style={{width: '15px', height: '15px', marginRight: '5px', position: 'relative', top: '2px',}}/>

                                 {memberprops.displayName}
                                 
                              </span>
                              <span style={{position: 'absolute', right: '10px',}}>{memberprops.onlineStatus ? ONLINESTATUS : OFFLINESTATUS(memberprops.dateLastOn)}
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