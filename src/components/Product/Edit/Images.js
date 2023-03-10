import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useEffect, useState } from "react";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const Images = ({ images, id, title, type, count }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    setFileList(
      images
        ? images.split(";").map((el) => {
            return {
              uid: el,
              name: el,
              status: "done",
              url: `https://volga24bot.com/cgi-bin/product/photos/${id}/${type}/${el}`,
            };
          })
        : []
    );
  }, [images, id, type]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options;
    if (fileList.find((el) => el.name === file.name)) {
      alert("Фото с таким именем уже загружено");
    } else {
      const fmData = new FormData();
      const arr = [...fileList, file].map((el) => el.name).join(";");

      fmData.append("images", arr);
      fmData.append("image", file);
      fetch(
        `https://volga24bot.com/cgi-bin/product/addImages.php?id=${id}&type=${type}`,
        {
          method: "POST",
          body: fmData,
        }
      )
        .then((res) => {
          onSuccess("Ok");
        })
        .catch((err) => {
          console.log("Eroor: ", err);
          const error = new Error("Some error");
          onError({ err });
        });
    }
  };

  const RemoveFile = (file) => {
    const fmData = new FormData();
    const arr = fileList
      .filter((el) => el.name !== file.name)
      .map((el) => el.name);

    fmData.append("images", arr);
    fetch(
      `https://volga24bot.com/cgi-bin/product/removeImages.php?id=${id}&name=${file.name}&type=${type}`,
      {
        method: "POST",
        body: fmData,
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <>
      <h2 style={{ fontSize: "15px", padding: "15px 0", textAlign: "left" }}>
        {title}
      </h2>
      <Upload
        customRequest={uploadImage}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={RemoveFile}
      >
        {fileList.length >= count ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
