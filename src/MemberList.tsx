import React, { SyntheticEvent } from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
// import { Member } from './services/Interfaces';
//import * as psnIcon from './images/psIcon.png';
//import * as pcIcon from "./images/battleNet.png";
const psnIcon = require('./images/psIcon.png');
const xboxIcon = require('./images/xboxIcon.png');
const pcIcon = require('./images/battleNet.png');

interface MemberListProps {
   displayName: string;
   membershipType: number;
   favoriteClass: string;
   totalTimePlayed: number;
   onlineStatus: string;
   getStringForTimePlayed: Function;
};

interface MemberListState {
   activeIndex: number;
};

export default class MemberList extends React.Component<{MemberList: MemberListProps[]}, MemberListState> {
   constructor(props: any) {
      super(props);

      this.state = {
         activeIndex: -1,
      };

      this.handleClick = this.handleClick.bind(this);
   }

   private handleClick(e: SyntheticEvent, titleProps: any) {
      const { index } = titleProps;
      const { activeIndex } = this.state;

      const newIndex = activeIndex === index ? -1 : index;
      this.setState({ activeIndex: newIndex });
   }


   render() {
      const { MemberList } = this.props;
      const { activeIndex } = this.state;
      return (
         <div>
            <Accordion styled>
               {MemberList.map((memberprops, index) => {
                  return (
                     <div>
                        <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                           <Icon name='dropdown' />
                           <span>
                              {memberprops.displayName}
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
                              })()} alt="Temp" style={{width: '15px', height: '15px',}}/>
                              {memberprops.onlineStatus}
                           </span>
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === index}>
                           <p>
                              {memberprops.favoriteClass}: {memberprops.getStringForTimePlayed(memberprops.totalTimePlayed)}
                           </p>
                        </Accordion.Content>
                     </div>
                  );
               })}
            </Accordion>
         </div>
      );
   }
   
}