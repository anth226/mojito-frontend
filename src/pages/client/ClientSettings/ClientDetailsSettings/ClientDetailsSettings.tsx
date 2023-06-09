import { Button, Card, Col, Divider, Input, Row } from "antd";
import classes from "./ClientDetailsSettings.module.css";
import Uploader from "../../../../components/Uploader/Uploader";
import { read, utils } from "xlsx";
import { emailValidator } from "../../../../utils/validators";
import { useAppSelector } from "../../../../app/hooks";
import { getAuthFromStore } from "../../../../reduxSlices/auth/auth";
import { useState } from "react";

const enum EmailPromptEnum {
  INITIAL = "intial",
  EDIT = "edit",
  SAVE = "save",
}

const ClientDetailsSettings = () => {
  const { userEmail } = useAppSelector(getAuthFromStore);

  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState("");
  const [emailPrompt, setEmailPrompt] = useState<EmailPromptEnum>(
    EmailPromptEnum.INITIAL
  );

  const onFileGet = async (info: any) => {
    const file = await info.file.arrayBuffer();
    const workbook = read(file);
    const data = utils.sheet_to_json(workbook.Sheets["Sheet1"], { raw: true });
    console.log(data);
    // addClientsFromFile(data);
  };

  const onEditEmailClick = () => {
    switch (emailPrompt) {
      case EmailPromptEnum.INITIAL:
        setEmailPrompt(EmailPromptEnum.EDIT);
        return;
      case EmailPromptEnum.EDIT:
        setPassword('')
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

  return (
    <Card>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <p className={classes.bold_text}>Name</p>
          <p className={classes.light_text}>
            This will be displayed on your profile.
          </p>
        </Col>
        <Col span={12}>
          <Input size="large" placeholder="Input placeholder" />
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
            onFileGet={onFileGet}
            filesDescription={"SVG, PNG, JPG or GIF (max. 800x400px)"}
            accept={".svg,.png,.jpg,.gif"}
            listType="picture"
            maxCount={1}
          />
        </Col>
        <Divider />
        <Col span={24}>
          <Button type="primary" onClick={onEditEmailClick}
          disabled={emailPrompt === EmailPromptEnum.EDIT && password === ''}
          >
            {emailPrompt === EmailPromptEnum.EDIT
              ? "Enter Password"
              : emailPrompt === EmailPromptEnum.SAVE
              ? "Save New Email"
              : "Edit Email"}
          </Button>
        </Col>
        {emailPrompt === EmailPromptEnum.EDIT && (
          <Col span={8}>
            <label>Password</label>
            <Input
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </Col>
        )}
        {emailPrompt === EmailPromptEnum.SAVE && (
          <Col span={8}>
            <label>Email</label>
            <Input
              name="email"
              type="email"
              onChange={onEmailChange}
              status={emailValidator(email) ? "" : "error"}
              value={email}
            />
          </Col>
        )}
      </Row>
      <Row
        gutter={[16, 16]}
        align={"middle"}
        justify={"end"}
        style={{ marginTop: "24px" }}
      >
        <Col>
          <Button>Cancel</Button>
        </Col>
        <Col>
          <Button type="primary">Save</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ClientDetailsSettings;
