import { Button, Col, Row } from 'antd';
import UserRow from 'components/UserRow/UserRow';
import UserTypeSelection from 'components/UserTypeSelection/UserTypeSelection';

interface InvitedUserProps {
  client: {
    name: string;
    surname: string;
    email: string;
  };
}

const InvitedUser = ({ client }: InvitedUserProps) => {
  return (
    <Col span={24}>
      <UserRow
        user={client}
        extras={
          <Row justify={'end'} gutter={[16, 16]}>
            <Col span={8}>
              <UserTypeSelection />
            </Col>
            <Col span={4}>
              <Button size='large' style={{ width: '100%' }} disabled>
                Invited
              </Button>
            </Col>
          </Row>
        }
      />
    </Col>
  );
};

export default InvitedUser;
