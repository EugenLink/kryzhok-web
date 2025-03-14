import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import styles from "./Dashboard.module.scss";
import { AccountCircle } from "@mui/icons-material";
import VipBanner from "./VipBanner";
import AddIcon from "@mui/icons-material/Add";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useState } from "react";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function UploadImage({
  fileList,
  setFileList,
  count,
  fileListUp,
}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList, file }) => {
    setFileList(newFileList);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, fileList } = options;
    fileListUp(file);
  };
  return (
    <div className={styles.uploadWrapper}>
      {" "}
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= count ? null : uploadButton}
      </Upload>
    </div>
  );
}
