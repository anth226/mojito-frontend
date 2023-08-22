import { Button, Card, Col, Form, Input, Row } from 'antd';
import './PasswordAndSecurity.css';

const PasswordAndSecurity = () => {
  const onFinish = (values: any) => {
    console.log('form: ', values);
  };
  return (
    <>
      <Card>
        <Form layout='vertical' onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <h2 style={{ margin: '0px' }}>Password</h2>
              <p>
                Your password must contains at least 6 characters, 1 uppercase,
                1 lowercase and 1 number
              </p>
            </Col>
            <Col span={12}>
              <Row gutter={[16, 16]}>
                <Col span={24} className='col-item'>
                  <Form.Item
                    className='password-label'
                    name='curPassword'
                    label='Current Password'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input type='password' size='large' />
                  </Form.Item>
                </Col>
                <Col span={24} className='col-item'>
                  <Form.Item
                    className='password-label'
                    name='password'
                    label='New Password'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input type='password' size='large' />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    className='password-label'
                    name='confirm'
                    label='Confirm new Password'
                    dependencies={['password']}
                    rules={[
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              'The new password that you entered do not match!'
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input type='password' size='large' />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Row gutter={[16, 16]} justify={'end'}>
                    <Col>
                      <Button htmlType='reset'>Cancel</Button>
                    </Col>
                    <Col>
                      <Button type='primary' htmlType='submit'>
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default PasswordAndSecurity;
