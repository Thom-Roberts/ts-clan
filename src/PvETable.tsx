import React from 'react';
import { Table } from "semantic-ui-react";
import { Member, Stats } from "./services/Interfaces";
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
	name: string;
	timePlayed: {
		timePlayed: string;
		timePlayedNumber: number;
	};
	kdRatio: string;
}

export default class PvETable extends React.Component<PvETableProps, PvETableState> {

	constructor(props: any) {
		super(props);

		this.state = {
			column: null,
			data: this.props.members.map((member, index) => {
				return {
					'name': member.displayName,
					'timePlayed': {
						'timePlayed': this.props.stats[index].pve!.timePlayed,
						'timePlayedNumber': this.props.stats[index].pve!.timePlayedNumber,
					},
					'kdRatio': this.props.stats[index].pve!.kdRatio,
				};
			}),
			direction: null,
		};
	}

	// Double function here to make sure that set state isn't called continously
	handleSort = (clickedColumn: string) => () => {

		const { column, data, direction } = this.state;

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
					else {
						return item[clickedColumn].toLowerCase();
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
						<Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={this.handleSort('name')}>
							Name
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'timePlayed' ? direction : null} onClick={this.handleSort('timePlayed')}>
							Time Played
						</Table.HeaderCell>
						<Table.HeaderCell sorted={column === 'kdRatio' ? direction : null} onClick={this.handleSort('kdRatio')}>
							KD Ratio
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{
						data.map((member, index) => {
						return (
							<Table.Row key={member.kdRatio}>
								<Table.Cell>{member.name}</Table.Cell>
								<Table.Cell>{member.timePlayed.timePlayed}</Table.Cell>
								<Table.Cell>{member.kdRatio}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		);
	}

}