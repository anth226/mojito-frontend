import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import {
  actions,
  alertParameter,
  alertSeverity,
  mathValues,
  parameters,
} from 'constants/Alert';
import Close from '../../assets/Icons/Close';
import classes from './AlertEditPanel.module.css';
import { Alert } from 'interfaces/Alert';

interface AlertModalProps extends DrawerProps {
  multipleClients?: Boolean;
  clientsOptions: any;
  alert?: Alert;
}

const AlertEditPanel = ({
  multipleClients,
  clientsOptions,
  alert,
  ...drawerProps
}: AlertModalProps) => {
  const curAlert = {
    alertName: alert?.name,
    clientOption: alert?.connectionId,
    mathValue: alert?.operation,
    parameter: alert?.parameter,
    severity: alert?.severity,
    value: alert?.value,
  };
  const onFinish = (values: any) => {
    console.log('values', values);
  };
  return (
    <Drawer
      closable
      placement='right'
      width={700}
      {...drawerProps}
      //   bodyStyle={{ padding: "0px" }}
    >
      <div className={classes.alert_panel_header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 style={{ margin: '0' }}>Edit Alert</h1>
        </div>
        <Close style={{ cursor: 'pointer' }} onClick={drawerProps.onClose} />
      </div>

      <Form
        id='alert'
        onFinish={onFinish}
        name='wrap'
        labelCol={{ flex: '100%' }}
        labelAlign='left'
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        initialValues={curAlert}
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
          <Col span={24}>
            <Row gutter={[16, 16]} justify={'end'}>
              <Col>
                <Button onClick={drawerProps.onClose}>Cancel</Button>
              </Col>
              <Col>
                <Button type='primary' htmlType='submit'>
                  Save
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AlertEditPanel;
