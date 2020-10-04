import React from 'react';
import { Table } from "semantic-ui-react";
import { Member, Stats } from "../../services/Interfaces";
import { GetMembershipIcon } from '../../services/Helper';
import _ from 'lodash';

interface PvETableProps {
	members: Member[];
	stats: Stats[];
}

interface PvETableState {
	column: any;
	data: temp[];
	direction: any;
}

interface temp {
	membershipType: number;
	name: string;
	timePlayed: {
		timePlayed: string;
		timePlayedNumber: number;
	};
	kdRatio: string;
	activitesCleared: number;
	publicEventsCompleted: number;
	totalKills: number;
}

export default class PvETable extends React.Component<PvETableProps, PvETableState> {

	constructor(props: any) {
		super(props);

		this.state = {
			column: null,
			data: this.props.members.map((member, index) => {
				return {
					'membershipType': member.membershipType,
					'name': member.displayName,
					'timePlayed': {
						'timePlayed': this.props.stats[index].pve!.timePlayed,
						'timePlayedNumber': this.props.stats[index].pve!.timePlayedNumber,
					},
					'kdRatio': this.props.stats[index].pve!.kdRatio,
					'activitesCleared': this.props.stats[index].pve!.activitiesCleared,
					'publicEventsCompleted': this.props.stats[index].pve!.publicEventsCompleted,
					'totalKills': this.props.stats[index].pve!.kills,
				};
			}),
			direction: null,
		};
	}

	componentDidMount() {
		// Set the initial column sort to descending
		const { data } = this.state;
		const temp = _.sortBy(data, [(item: any) => {
			return item['timePlayed'].timePlayedNumber;
		}]);

		this.setState({
			column: 'timePlayed',
			data: temp.reverse(),
			direction: 'descending',
		});
	}

	// Double function here to make sure that set state isn't called continously
	handleSort = (clickedColumn: string) => () => {
		const { column, data, direction } = this.state;

		if(clickedColumn === 'membershipType')
			return;

		if(column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				data: _.sortBy(data, [(item: any) => {
					if(clickedColumn === 'timePlayed') {
						return item['timePlayed'].timePlayedNumber;
					}
					else if(clickedColumn === 'kdRatio') {
						return parseInt(item['kdRatio']);
					}
					else if(clickedColumn === 'name') {
						return item[clickedColumn].toLowerCase();
					}
					else {
						return item[clickedColumn];
					}
				}]),
				direction: 'ascending'
			});
			
			return;
		}

		this.setState({
			data: data.reverse(),
			direction: direction === 'ascending' ? 'descending' : 'ascending',
		});

	}

	render() {
		const { column, data, direction } = this.state;

		return (
			<Table sortable celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell sorted={column === 'membershipType' ? direction : null} onClick={this.handleSort('membershipType')}>
							Platform
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>
							Name
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'timePlayed' ? direction : null} onClick={this.handleSort('timePlayed')}>
							Time Played
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'kdRatio' ? direction : null} onClick={this.handleSort('kdRatio')}>
							KD Ratio
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'activitesCleared' ? direction : null} onClick ={this.handleSort('activitesCleared')}>
							Activites Cleared
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'publicEventsCompleted' ? direction : null} onClick={this.handleSort('publicEventsCompleted')}>
							Public Events Completed
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'totalKills' ? direction : null} onClick={this.handleSort('totalKills')}>
							Total Kills
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{
						data.map((member, index) => {
						return (
							<Table.Row key={'pve ' + this.props.members[index].membershipId}>
								<Table.Cell>
									<img src={GetMembershipIcon(member.membershipType)}
										alt={member.membershipType.toString()}
										style={{'width': '15px', 'height': '15px'}}
									/>
								</Table.Cell>
								<Table.Cell>{member.name}</Table.Cell>
								<Table.Cell>{member.timePlayed.timePlayed}</Table.Cell>
								<Table.Cell>{member.kdRatio}</Table.Cell>
								<Table.Cell>{member.activitesCleared}</Table.Cell>
								<Table.Cell>{member.publicEventsCompleted}</Table.Cell>
								<Table.Cell>{member.totalKills}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		);
	}
}