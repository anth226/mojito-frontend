import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Modal,
  Row,
  UploadFile,
} from 'antd';
import { UPDATE_AGENCY, UPDATE_BUSINESS } from 'api/graphql/mutations';
import { VIEWER } from 'api/graphql/queries';
import { useAppSelector } from 'app/hooks';
import { CustomLoading } from 'components/CustomLoading/CustomLoading';
import Uploader from 'components/Uploader/Uploader';
import { useGraphQlMutation, useGraphQlQuery } from 'hooks/useCustomHookApollo';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AccountRole, getAuthFromStore } from 'reduxSlices/auth/auth';
import { emailValidator } from 'utils/validators';
import classes from './AgencyDetailsSettings.module.css';

const enum EmailPromptEnum {
  INITIAL = 'intial',
  EDIT = 'edit',
  SAVE = 'save',
}

const AgencyDetailsSettings = () => {
  const { userEmail, role } = useAppSelector(getAuthFromStore);

  const [name, setName] = useState('');
  const [logo, setLogo] = useState<string | null>('');
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');

  const [emailPrompt, setEmailPrompt] = useState<EmailPromptEnum>(
    EmailPromptEnum.INITIAL
  );
  const {
    data: accountInfo,
    refetch,
    loading: isFetchViewer,
  } = useGraphQlQuery(VIEWER);

  const [updateAgency, { loading: isLoadingUpdateAgency }] = useGraphQlMutation(
    UPDATE_AGENCY,
    {
      onError(error) {
        toast.error(error.message);
        throw error;
      },
      onCompleted: () => {
        refetch();
      },
    }
  );

  const [updateBusiness, { loading: isLoadingUpdateBusiness }] =
    useGraphQlMutation(UPDATE_BUSINESS, {
      onError(error) {
        toast.error(error.message);
        throw error;
      },
      onCompleted: () => {
        refetch();
      },
    });

  const onFileGet = (info: any) => {
    let fileList = [...info.fileList];
    let reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const base64 = e.target?.result;
      if (typeof base64 === 'string') {
        setLogo(base64);
        setFileList([{ uid: '', name: '', url: base64 }]);
      }
    };
    reader.readAsDataURL(fileList[0].originFileObj);
  };

  const onEditEmailClick = () => {
    switch (emailPrompt) {
      case EmailPromptEnum.INITIAL:
        setEmailPrompt(EmailPromptEnum.EDIT);
        return;
      case EmailPromptEnum.EDIT:
        setPassword('');
        setEmailPrompt(EmailPromptEnum.SAVE);
        return;
      case EmailPromptEnum.SAVE:
        setEmailPrompt(EmailPromptEnum.INITIAL);
        return;
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUpdate = async () => {
    const input = {
      name: name,
      logo: logo,
      clientMutationId: null,
    };
    if (name || logo) {
      if (role === AccountRole.BUSINESS) {
        await updateBusiness({ variables: { input: input } });
      } else {
        await updateAgency({ variables: { input: input } });
      }
    }
  };

  const handlePreview = (file: any) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);

  useEffect(() => {
    const data =
      role === AccountRole.BUSINESS
        ? accountInfo?.viewer?.business
        : accountInfo?.viewer?.agency;

    if (data) {
      setName(data.name);
      setLogo(data.logo);
      setFileList([{ uid: '', name: '', url: data.logo }]);
    }
  }, [accountInfo, role]);

  return (
    <>
      <Card>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <p className={classes.bold_text}>Name</p>
            <p className={classes.light_text}>
              This will be displayed on your profile.
            </p>
          </Col>
          <Col span={12}>
            <Input
              size='large'
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Input placeholder'
            />
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <p className={classes.bold_text}>Company logo</p>
            <p className={classes.light_text}>
              Update your company logo and then choose where you want it to
              display.
            </p>
          </Col>
          <Col span={12}>
            <Uploader
              onPreview={handlePreview}
              fileList={fileList}
              onFileGet={onFileGet}
              filesDescription={'SVG, PNG, JPG or GIF (max. 800x400px)'}
              accept={'.svg,.png,.jpg,.gif'}
              listType='picture'
              maxCount={1}
              onRemove={() => {
                setLogo('');
                setFileList([]);
              }}
            />
            <Modal
              open={previewOpen}
              title='Company logo'
              footer={null}
              onCancel={handleCancel}
              width={700}
            >
              <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Col>
          <Divider />
          <Col span={24}>
            <Button
              type='primary'
              onClick={onEditEmailClick}
              disabled={emailPrompt === EmailPromptEnum.EDIT && password === ''}
            >
              {emailPrompt === EmailPromptEnum.EDIT
                ? 'Enter Password'
                : emailPrompt === EmailPromptEnum.SAVE
                ? 'Save New Email'
                : 'Edit Email'}
            </Button>
          </Col>
          {emailPrompt === EmailPromptEnum.EDIT && (
            <Col span={8}>
              <label>Password</label>
              <Input
                name='password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Col>
          )}
          {emailPrompt === EmailPromptEnum.SAVE && (
            <Col span={8}>
              <label>Email</label>
              <Input
                name='email'
                type='email'
                onChange={onEmailChange}
                status={emailValidator(email) ? '' : 'error'}
                value={email}
              />
            </Col>
          )}
        </Row>
        <Row
          gutter={[16, 16]}
          align={'middle'}
          justify={'end'}
          style={{ marginTop: '24px' }}
        >
          <Col>
            <Button>Cancel</Button>
          </Col>
          <Col>
            <Button type='primary' onClick={() => handleUpdate()}>
              Save
            </Button>
          </Col>
        </Row>
      </Card>
      <CustomLoading
        loading={
          isFetchViewer || isLoadingUpdateAgency || isLoadingUpdateBusiness
        }
      />
    </>
  );
};

export default AgencyDetailsSettings;
