import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Table } from 'semantic-ui-react';

import styles from './Games.scss';

@CSSModules(styles)
class Games extends Component {
  render() {
    return (
      <div className="ui container">
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Round</Table.HeaderCell>
              <Table.HeaderCell>Wildling Threat</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>Game #1</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Game #2</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Game #3</Table.Cell>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  }
}
export default Games