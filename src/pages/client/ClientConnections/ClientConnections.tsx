import { Col, Input, Row } from 'antd';
import { useRef, useState } from 'react';
import { ReactComponent as ThunderBolt } from 'assets/Icons/ThunderBolt.svg';
import { ReactComponent as Briefcase } from 'assets/Icons/Briefcase.svg';
import ConnectionCard from 'components/ConnectionCard/ConnectionCard';
import ConnectionsDrawer from './connectionsDrawer/connectionsDrawer';
import { ReactComponent as MagnifyingGlass } from 'assets/Icons/MagnifyingGlass.svg';
import classes from './ClientConnections.module.css';
import useElementSize from 'hooks/useElementSize';
import { Connection } from 'interfaces/Connection';
import { connectionList, otherConnectionList } from 'mockdata/Connections';

const ClientConnections = () => {
  const [showDetails, setShowDetails] = useState<Connection | null>();

  const containerRef = useRef<HTMLDivElement>(null);

  const searchBarContainerSize = useElementSize(
    containerRef,
    (width, height) => {
      return {
        width: Math.floor(width / 403) * 403,
        height,
      };
    }
  );

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
      <Col span={24}>
        <h1 style={{ margin: '0px' }}>Connections</h1>
      </Col>
      <Col span={24}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ThunderBolt width={15} height={19} />
          <h2 style={{ margin: '0 10px', fontWeight: '600' }}>
            Your connections
          </h2>
        </div>
      </Col>
      {connectionList.map((connection, index) => {
        return (
          <Col key={index}>
            <ConnectionCard
              connection={connection}
              onDetailClick={setShowDetails}
              avatar
              direction='horizontal'
              statusDescription
              detailClickIcon
              onConnectButtonClick={() => {}}
            />
          </Col>
        );
      })}
      <ConnectionsDrawer
        connection={showDetails}
        open={!!showDetails?.name}
        onClose={() => setShowDetails(null)}
        closable={false}
      />
      <Col style={{ width: searchBarContainerSize.width }}>
        <Row
          style={{
            marginTop: '12px',
          }}
          align={'middle'}
          justify={'space-between'}
        >
          <Col>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Briefcase width={15} height={19} />
              <h2 style={{ margin: '0 10px', fontWeight: '600' }}>
                Other connections
              </h2>
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
          <Col key={index}>
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

export default ClientConnections;
