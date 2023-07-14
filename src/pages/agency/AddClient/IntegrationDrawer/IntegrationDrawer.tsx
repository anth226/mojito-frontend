import { Col, Drawer, DrawerProps, Input, Row } from 'antd';
import Close from 'assets/Icons/Close';
import classes from './IntegrationDrawer.module.css';
import { ReactComponent as MagnifyingGlass } from 'assets/Icons/MagnifyingGlass.svg';
import { IntegrationCard } from 'components/IntegrationCard/IntegrationCard';

interface IntegrationDrawerProps extends DrawerProps {}

const IntegrationDrawer = (props: IntegrationDrawerProps) => {
  const { ...drawerProps } = props;
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <Drawer closable placement='right' width={700} {...drawerProps}>
      <Row
        style={{
          marginTop: '6px',
          gap: 32,
        }}
        align={'middle'}
        justify={'space-between'}
      >
        <Col span={24}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 className={classes.title}>New integration</h1>
            </div>
            <Close
              style={{ cursor: 'pointer' }}
              onClick={drawerProps.onClose}
            />
          </div>
        </Col>
        <Col span={24}>
          <Input
            className={classes.search_box}
            size='large'
            placeholder='Search'
            prefix={<MagnifyingGlass />}
            onChange={onSearchChange}
          />
        </Col>
        <Col
          span={24}
          style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
        >
          <IntegrationCard />
          <IntegrationCard />
          <IntegrationCard />
          <IntegrationCard />
        </Col>
      </Row>
    </Drawer>
  );
};

export default IntegrationDrawer;
