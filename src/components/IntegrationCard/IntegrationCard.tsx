import { Avatar, Card, Space } from 'antd';
import ArrowRight from 'assets/Icons/ArrowRight';
import { Avatars } from 'assets/base64Icons';
import classes from './IntegrationCard.module.css';

type IntegrationCardProps = {};

export const IntegrationCard = (props: IntegrationCardProps) => {
  return (
    <Card>
      <Space className={classes.box_content}>
        <div>
          <Avatar size={'large'} src={Avatars.AVATAR1} />
          <p className={classes.integration_name}>Integration name</p>
        </div>
        <ArrowRight />
      </Space>
    </Card>
  );
};
