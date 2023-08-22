import { Button, Col, Form, Modal, ModalProps, Row } from 'antd';
import ResendIcon from 'assets/Icons/ResendIcon';
import { InputCode } from 'components/InputCode/InputCode';
import './styles.css';
import styles from './styles.module.css';

interface VerifyCodeModalProps extends Omit<ModalProps, 'onCancel'> {
  closeModal: Function;
  handleVerify: Function;
}

const VerifyCodeModal = ({
  open,
  closeModal,
  handleVerify,
}: VerifyCodeModalProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const { code } = values;

    if (!code || code.includes(undefined) || code.includes(''))
      return form.setFields([
        {
          name: 'code',
          errors: ['X Invalid code. Please, try another one.'],
        },
      ]);

    handleVerify(code);
  };
  return (
    <Modal
      title='Enter code'
      open={open}
      width={600}
      onCancel={() => closeModal()}
      style={{ color: '#9A9AAF' }}
      footer={null}
      className='verify-modal'
    >
      <p>
        Enter the 6-digit login code that we sent to your number ending in 1111
        to finish setting up two-factor authentication.
      </p>
      <Form
        form={form}
        onFinish={handleFinish}
        name='wrap'
        labelCol={{ flex: '100%' }}
        labelAlign='left'
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        className='verify-form'
      >
        <Row gutter={[16, 16]} align={'bottom'}>
          <Col span={24}>
            <Form.Item
              name='code'
              className='verify-code center-error-message'
              rules={[{ validator: async () => Promise.resolve() }]}
            >
              <InputCode autoFocus inputType='numeric' length={6} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row style={{ alignItems: 'center', marginTop: 16 }}>
              <Col span={16}>
                <p className={styles.resendText}>
                  <ResendIcon /> Resend code in 60 sec
                </p>
              </Col>
              <Col span={8}>
                <Row style={{ justifyContent: 'flex-end' }}>
                  <Col style={{ display: 'flex', gap: 16 }}>
                    <Button
                      onClick={() => closeModal()}
                      style={{ background: '#E2E2EA' }}
                    >
                      Back
                    </Button>
                    <Button type='primary' htmlType='submit'>
                      Next
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default VerifyCodeModal;
