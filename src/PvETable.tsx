import React from 'react';
import { Table } from "semantic-ui-react";
import { Member, Stats } from "./services/Interfaces";

interface PvETableProps {
	members: Member[];
	stats: Stats[];
}

export default class PvETable extends React.Component<PvETableProps, {}> {

	render() {
		return (
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>
							Name
						</Table.HeaderCell>
						<Table.HeaderCell>
							Time Played
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{this.props.members.map((member, index) => {
						return (
							<Table.Row key={member.displayName}>
								<Table.Cell>{member.displayName}</Table.Cell>
								<Table.Cell>{this.props.stats[index].pve!.timePlayed}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		);
	}

}