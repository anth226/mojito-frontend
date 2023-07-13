import { Col, Input, Row } from 'antd';
import { useRef, useState } from 'react';
import { ReactComponent as MagnifyingGlass } from '../../../assets/Icons/MagnifyingGlass.svg';
import ConnectionCard from '../../../components/ConnectionCard/ConnectionCard';
import { Connection } from '../../../interfaces/Connection';
import { otherConnectionList } from '../../../mockdata/Connections';
import classes from './Connections.module.css';
import ConnectionsDrawer from './connectionsDrawer/connectionsDrawer';

const Connections = () => {
  const [showDetails, setShowDetails] = useState<Connection | null>();

  const containerRef = useRef<HTMLDivElement>(null);

  const [otherConnections, setOtherConnections] = useState<Connection[] | []>(
    otherConnectionList
  );

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    if (searchString === '' || searchString === undefined) {
      setOtherConnections(otherConnectionList);
    } else {
      const filteredList = [];
      for (const connection of otherConnectionList) {
        if (connection.name.includes(searchString)) {
          filteredList.push(connection);
        }
      }
      setOtherConnections(filteredList);
    }
  };

  return (
    <Row gutter={[16, 16]} justify={'space-evenly'} ref={containerRef}>
      <ConnectionsDrawer
        connection={showDetails}
        open={!!showDetails?.name}
        onClose={() => setShowDetails(null)}
        closable={false}
      />
      <Col style={{ width: '100%' }}>
        <Row
          style={{
            marginTop: '12px',
          }}
          align={'middle'}
          justify={'space-between'}
        >
          <Col span={16}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ margin: '0 10px' }}>Connections</h1>
            </div>
          </Col>
          <Col span={8}>
            <Input
              className={classes.search_box}
              size='large'
              placeholder='Search'
              prefix={<MagnifyingGlass />}
              onChange={onSearchChange}
            />
          </Col>
        </Row>
      </Col>
      {otherConnections.map((connection, index) => {
        return (
          <Col key={index} span={8}>
            <ConnectionCard
              connection={connection}
              onDetailClick={setShowDetails}
              cover
              description
              direction='vertical'
              detailClickIcon
              onConnectButtonClick={() => {}}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default Connections;
