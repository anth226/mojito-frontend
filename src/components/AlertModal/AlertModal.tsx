import { Button, Col, Form, Input, Modal, ModalProps, Row, Select } from 'antd';
import {
  actions,
  alertParameter,
  alertSeverity,
  mathValues,
  parameters,
} from 'constants/Alert';

interface AlertModalProps extends Omit<ModalProps, 'onCancel'> {
  closeModal: Function;
  multipleClients?: Boolean;
  addAlert?: Function;
  clientsOptions?: any;
}

const AlertModal = ({
  open,
  closeModal,
  multipleClients,
  addAlert,
  clientsOptions,
}: AlertModalProps) => {
  const onFinish = (values: any) => {
    addAlert && addAlert(values);
  };

  return (
    <Modal
      title='New Alert'
      open={open}
      onCancel={() => closeModal()}
      style={{ color: '#9A9AAF' }}
      footer={null}
    >
      <Form
        id='alert'
        onFinish={onFinish}
        name='wrap'
        labelCol={{ flex: '100%' }}
        labelAlign='left'
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
      >
        <Row gutter={[16, 16]} align={'bottom'}>
          <Col span={12}>
            <Form.Item label='Alert for' name={'clientOption'}>
              <Select
                style={{ width: '100%' }}
                placeholder={'Input Placeholder'}
                options={clientsOptions}
                mode={multipleClients ? 'multiple' : undefined}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Severity' name={'severity'}>
              <Select
                style={{ width: '100%' }}
                placeholder={'Input Placeholder'}
                options={alertSeverity}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <b style={{ color: '#000000' }}>Alert Setting</b>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Select
                showArrow={false}
                options={parameters}
                bordered={false}
                style={{ width: '100%' }}
                defaultValue={parameters[0]}
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={20}>
            <Form.Item label='Parameter' name={'parameter'}>
              <Select
                style={{ width: '100%' }}
                placeholder={'Input Placeholder'}
                options={alertParameter}
              />
            </Form.Item>
          </Col>
          <Col span={4}></Col>
          <Col span={10}>
            <Form.Item label='Math Value' name={'mathValue'}>
              <Select
                style={{ width: '100%' }}
                options={mathValues}
                placeholder={'More Than'}
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item label='Value' name={'value'}>
              <Input placeholder={'Input Placeholder'} />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Select
                showArrow={false}
                options={actions}
                bordered={false}
                style={{ width: '100%' }}
                defaultValue={actions[0]}
              />
            </Form.Item>
          </Col>
          <Col span={20}>
            <Form.Item label='Alert name' name={'alertName'}>
              <Input placeholder={'Input Placeholder'} />
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'flex-end', marginTop: 16 }}>
          <Col style={{ display: 'flex', gap: 16 }}>
            <Button onClick={() => closeModal()}>Cancel</Button>
            <Button
              type='primary'
              htmlType='submit'
              //   disabled={
              //     checkObjectForEmptyValues(newClient) ||
              //     !emailValidator(newClient.email)
              //   }
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AlertModal;
