import { Row, Col, Space, Avatar } from 'antd';
import { Avatars } from 'assets/base64Icons';
import classes from './UserRow.module.css';
import { ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  avatar?: ReactNode;
}

interface UserRowProps {
  user: User;
  extras: ReactNode;
  style?: React.CSSProperties | undefined;
}

const UserRow = ({ user, extras, style }: UserRowProps) => {
  return (
    <Row
      gutter={[16, 16]}
      align='middle'
      justify={'space-between'}
      style={{
        background: '#f2f3f7',
        padding: '12px 0px',
        borderRadius: '12px',
        marginBottom: '10px',
        ...style,
      }}
    >
      <Col span={12}>
        <Space>
          <Avatar
            size={'large'}
            src={user.avatar ? user.avatar : Avatars.AVATAR1}
          />
          <div className={classes.user_details}>
            <span className={classes.user_name}>{user.name ?? 'NAME'}</span>
            <span className={classes.user_email}>{user.email ?? 'email'}</span>
          </div>
        </Space>
      </Col>
      <Col span={12}>{extras}</Col>
    </Row>
  );
};

export default UserRow;
