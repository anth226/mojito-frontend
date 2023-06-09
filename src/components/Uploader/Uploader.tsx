import Dragger from "antd/es/upload/Dragger";
import { ReactComponent as UploadIcon } from "../../assets/Icons/Upload.svg";
import { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";

interface UploaderProps extends UploadProps {
  onFileGet: ((info: UploadChangeParam<UploadFile<any>>) => void) | undefined;
  filesDescription: string;
  accept: string;
}

const Uploader = ({
  onFileGet,
  filesDescription,
  accept,
  ...upload
}: UploaderProps) => {
  return (
    <Dragger
      style={{ background: "#FFFFFF" }}
      beforeUpload={() => false}
      onChange={onFileGet}
      accept={accept ?? "*"}
      height={200}
      {...upload}
    >
      <p className="ant-upload-drag-icon">
        <UploadIcon
          style={{
            width: "48px",
            height: "48px",
            background: "#F2F3F7",
            padding: "11px",
            borderRadius: "25px",
          }}
        />
      </p>
      <p className="ant-upload-text" style={{ margin: "0px" }}>
        <span style={{ color: "#0062FF" }}>Click to upload</span> or drag and
        drop
      </p>
      <p className="ant-upload-hint" style={{ margin: "0px" }}>
        {filesDescription}
      </p>
    </Dragger>
  );
};

export default Uploader;
