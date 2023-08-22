import { Modal, ModalProps, Space } from 'antd';
import './modal.css';
import SuccessIcon from 'assets/Icons/SuccessIcon';

interface SuccessModalProps extends Omit<ModalProps, 'onCancel'> {
  closeModal: Function;
}

const SuccessModal = ({ open, closeModal }: SuccessModalProps) => {
  return (
    <Modal
      width={600}
      open={open}
      onCancel={() => closeModal()}
      style={{ color: '#9A9AAF' }}
      footer={null}
      className='modal'
    >
      <Space direction='vertical' className='success-box'>
        <SuccessIcon />
        <p className='title'>Phone number confirmed</p>
        <p className='description'>
          We’ll text you a login code to this number whenever you try to log in
          or change your password.
        </p>
      </Space>
    </Modal>
  );
};

export default SuccessModal;
