import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Input,
  Row,
  Skeleton,
  Space,
} from 'antd';
import Close from 'assets/Icons/Close';
import PlusIcon from 'assets/Icons/Plus';
import classes from '../UserSetting.module.css';
import { ReactComponent as MagnifyingGlass } from 'assets/Icons/MagnifyingGlass.svg';
import ArrowRight from 'assets/Icons/ArrowRight';
import UserIcon from 'assets/Icons/UserIcon';
import StarIcon from 'assets/Icons/StarIcon';
import CustomSwitch from 'components/CustomSwitch/CustomSwitch';
import { useState } from 'react';

interface UserRoleDrawerProps extends DrawerProps {
  loading?: boolean;
  refetch?: Function;
}

const UserRoleDrawer = (props: UserRoleDrawerProps) => {
  const { loading, refetch, ...drawerProps } = props;
  const [showContentBox, setShowContentBox] = useState<string[]>(['', '']);

  const handleChangeshowContentBox = (index: number) => {
    const newshowContentBox = showContentBox;
    if (index === 0) {
      newshowContentBox[index]
        ? (newshowContentBox[index] = '')
        : (newshowContentBox[index] = 'staff');
    } else {
      newshowContentBox[index]
        ? (newshowContentBox[index] = '')
        : (newshowContentBox[index] = 'client');
    }

    setShowContentBox([...newshowContentBox]);
  };

  return (
    <Drawer closable placement='right' width={700} {...drawerProps}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ margin: '0', marginLeft: '10px' }}>User Roles</h1>
        </div>
        <Close style={{ cursor: 'pointer' }} onClick={drawerProps.onClose} />
      </div>

      {loading && (
        <Col span={24}>
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          ></Skeleton>
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          ></Skeleton>
        </Col>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '12px',
          marginBottom: '24px',
        }}
      >
        <Row style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Col span={18}>
            <Input
              className={classes.search_box}
              style={{ borderRadius: '5px' }}
              size='large'
              placeholder='Search'
              prefix={<MagnifyingGlass />}
            />
          </Col>
          <Col
            span={6}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              icon={
                <PlusIcon
                  fill='#FFFFFF'
                  stroke='#FFFFFF'
                  style={{ marginTop: '2px' }}
                />
              }
              type='primary'
              size='large'
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '14px 24px',
                alignItems: 'center',
              }}
            >
              <b>New role</b>
            </Button>
          </Col>
        </Row>
      </div>
      <div>
        <Space
          className={classes.box_item}
          onClick={() => handleChangeshowContentBox(0)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserIcon stroke='#384CFF' />
            <div>
              <p className={classes.item_title}>Staff members</p>
              <p className={classes.item_value}>12 users</p>
            </div>
          </div>
          <ArrowRight />
        </Space>
        {showContentBox.includes('staff') && (
          <div className={classes.content}>
            <h2 className={classes.content_title}>Permissions</h2>
            <div>
              <div className={classes.content_card}>
                <p className={classes.content_item_name}>Access Billing</p>
                <CustomSwitch checked={true} />
              </div>
            </div>
          </div>
        )}
        <Space
          className={classes.box_item}
          onClick={() => handleChangeshowContentBox(1)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <StarIcon stroke='#384CFF' />
            <div>
              <p className={classes.item_title}>Clients</p>
              <p className={classes.item_value}>12 users</p>
            </div>
          </div>
          <ArrowRight transform='rotate(90)' />
        </Space>
      </div>

      {showContentBox.includes('client') && (
        <div className={classes.content}>
          <h2 className={classes.content_title}>Permissions</h2>
          <div>
            <div className={classes.content_card}>
              <p className={classes.content_item_name}>Access Billing</p>
              <CustomSwitch checked={true} />
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default UserRoleDrawer;
