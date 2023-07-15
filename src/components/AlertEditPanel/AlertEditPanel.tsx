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
import { useAppSelector } from 'app/hooks';
import Close from 'assets/Icons/Close';
import {
  actions,
  alertParameter,
  alertSeverity,
  mathValues,
  parameters,
} from 'constants/Alert';
import { Alert } from 'interfaces/Alert';
import { useEffect } from 'react';

import { useForm } from 'antd/es/form/Form';
import { getAlertFromStore } from 'reduxSlices/alerts/alerts';
import classes from './AlertEditPanel.module.css';

interface AlertModalProps extends DrawerProps {
  multipleClients?: Boolean;
  clientsOptions: any;
  alert?: Alert;
  onUpdateAlert: Function;
}

const AlertEditPanel = ({
  multipleClients,
  clientsOptions,
  onUpdateAlert,
  ...drawerProps
}: AlertModalProps) => {
  const { alert } = useAppSelector(getAlertFromStore);
  const [form] = useForm();

  const formatData = (data: any) => {
    const clientIds = data?.clients?.map((client: any) => {
      return client._id;
    });

    return {
      alertName: data?.name,
      clientOption: clientIds,
      mathValue: data?.operation,
      parameter: data?.parameter,
      severity: data?.severity,
      value: data?.value,
    };
  };

  const onFinish = (values: any) => {
    onUpdateAlert({ ...values, id: alert?.id });
  };

  const curAlert = formatData(alert);

  useEffect(() => {
    form.setFieldsValue(curAlert);
  }, [form, curAlert]);

  return (
    <Drawer closable placement='right' width={700} {...drawerProps}>
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
        form={form}
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
