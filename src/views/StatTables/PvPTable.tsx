import React from 'react';
import { Table } from "semantic-ui-react";
import { Member, Stats } from "../../services/Interfaces";
import { GetMembershipIcon } from '../../services/Helper';
import _ from 'lodash';

import './table.css';

interface PvPTableProps {
	members: Member[];
	stats: Stats[];
}

interface PvPTableState {
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
	activitiesWon: number;
	totalKills: number;
}

export default class PvPTable extends React.Component<PvPTableProps, PvPTableState> {
	constructor(props: any) {
		super(props);

		this.state = {
			column: null,
			data: this.props.members.map((member, index) => {
				if(Object.prototype.hasOwnProperty.call(this.props.stats[index], 'pvp')) {
					return {
						'membershipType': member.membershipType,
						'name': member.displayName,
						'timePlayed': {
							'timePlayed': this.props.stats[index].pvp!.timePlayed,
							'timePlayedNumber': this.props.stats[index].pvp!.timePlayedNumber
						},
						'kdRatio': this.props.stats[index].pvp!.kdRatio,
						'activitiesWon': this.props.stats[index].pvp!.activitiesWon,
						'totalKills': this.props.stats[index].pvp!.kills,
					};
				}
				else {
					return {
						'membershipType': member.membershipType,
						'name': member.displayName,
						'timePlayed': {
							'timePlayed': 'null',
							'timePlayedNumber': 0
						},
						'kdRatio': 'null',
						'activitiesWon': 0,
						'totalKills': 0,
					}
				}
				
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
			<Table sortable basic unstackable>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell sorted={column === 'membershipType' ? direction : null}>
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
						<Table.HeaderCell sorted={column === 'activitiesWon' ? direction : null} onClick ={this.handleSort('activitiesWon')}>
							Matches Won
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'totalKills' ? direction : null} onClick={this.handleSort('totalKills')}>
							Total Kills
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body className='table-body-custom'>
					{
						data.map((member, index) => {
							return (
								<Table.Row key={`Pvp: ${this.props.members[index].membershipId}`}>
									<Table.Cell>
										<img src={GetMembershipIcon(member.membershipType)}
											alt={member.membershipType.toString()}
											style={{'width': '15px', 'height': '15px'}}
										/>
									</Table.Cell>
									<Table.Cell>{member.name}</Table.Cell>
									<Table.Cell>{member.timePlayed.timePlayed}</Table.Cell>
									<Table.Cell>{member.kdRatio}</Table.Cell>
									<Table.Cell>{member.activitiesWon}</Table.Cell>
									<Table.Cell>{member.totalKills}</Table.Cell>
								</Table.Row>
							);
						})
					}
				</Table.Body>
			</Table>
		);
	}
}