import React from 'react';
import { Table } from "semantic-ui-react";
import { Member, Stats } from "../../services/Interfaces";
import { GetMembershipIcon } from '../../services/Helper';
import _ from 'lodash';

interface PvECompTableProps {
	members: Member[];
	stats: Stats[];
}

interface PvECompTableState {
	column: any;
	data: temp[];
	direction: any;
}

// Actual data that I want to display in the table
interface temp {
	membershipType: number;
	name: string;
	timePlayed: {
		timePlayed: string;
		timePlayedNumber: number;
	};
	kdRatio: string;
	activitiesPlayed: number;
	winLossRatio: string;
	totalKills: number;
}

export default class PvECompTable extends React.Component<PvECompTableProps, PvECompTableState> {
	constructor(props: any) {
		super(props);

		this.state = {
			column: null,
			data: this.props.stats.map((stat, index): temp => {
				return {
					membershipType: this.props.members[index].membershipType,
					name: this.props.members[index].displayName,
					timePlayed: {
						timePlayed: stat.pveCompetitive!.timePlayed,
						timePlayedNumber: stat.pveCompetitive!.timePlayedNumber,
					},
					kdRatio: stat.pveCompetitive!.kdRatio,
					activitiesPlayed: stat.pveCompetitive!.activitesPlayed,
					winLossRatio: stat.pveCompetitive!.winLossRatio,
					totalKills: stat.pveCompetitive!.kills,
				};
			}),
			direction: null,
		};
	}

	handleSort = (clickedColumn: string) => () => {
		const { column, data, direction } = this.state;
		
		if(clickedColumn === 'membershipType')
			return;

		// Sorting a new column
		if(column !== clickedColumn) {
			this.setState({
				column: clickedColumn,
				data: _.sortBy(data, [(item: any) => {
					if(clickedColumn === 'timePlayed') {
						return item['timePlayed'].timePlayedNumber
					}
					else if(clickedColumn === 'kdRatio') {
						return parseFloat(item['kdRatio']);
					}
					else if(clickedColumn === 'winLossRatio') {
						return parseFloat(item['winLossRatio']);
					}
					else if(clickedColumn === 'name') {
						return item[clickedColumn].toLowerCase();
					}
					else {
						return item[clickedColumn];
					}
				}]),
				direction: 'ascending',
			});

			return;
		}

		// Flipping the order of our already selected column
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
						<Table.HeaderCell sorted={column === 'activitiesPlayed' ? direction : null} onClick={this.handleSort('activitiesPlayed')}>
							Activites Played
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'winLossRatio' ? direction : null} onClick={this.handleSort('winLossRatio')}>
							Win Rate
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
								<Table.Row key={'pveComp ' + this.props.members[index].membershipId}>
									<Table.Cell>
										<img src={GetMembershipIcon(member.membershipType)}
											alt={member.membershipType.toString()}
											style={{'width': '15px', 'height': '15px'}}
										/>
									</Table.Cell>
									<Table.Cell>{member.name}</Table.Cell>
									<Table.Cell>{member.timePlayed.timePlayed}</Table.Cell>
									<Table.Cell>{member.kdRatio}</Table.Cell>
									<Table.Cell>{member.activitiesPlayed}</Table.Cell>
									<Table.Cell>{(parseFloat(member.winLossRatio) * 100).toFixed(0).toString()}%</Table.Cell>
									<Table.Cell>{member.totalKills}</Table.Cell>
								</Table.Row>
							)
						})
					}
				</Table.Body>
			</Table>
		)
	}
}