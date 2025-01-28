import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../services/api.service";

const CreateBookControl = (props) => {

  const { isCreateOpen, setCreateOpen, loadBook } = props;

  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const hanldeOnchangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmitBtn = async () => {
    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail"
      })
      return;
    }

    const resUpload = await handleUploadFile(selectedFile, "book");
    if (resUpload.data) {
      // success
      const thumbnail = resUpload.data.fileUploaded;
      const res = await createBookAPI(thumbnail, mainText, price, quantity, author, category)
      if (res.data) {
        notification.success({
          message: "create book",
          description: "Tạo book thành công"
        })
        resetAndCloseModal();
        await loadBook();
      } else {
        notification.error({
          message: "Error create book",
          description: JSON.stringify(res.message)
        })
      }
    } else {
      // failed
      notification.error({
        message: "Error upload thumbnail",
        description: JSON.stringify(resUpload.message)
      })
    }
  }

  const resetAndCloseModal = () => {
    setCreateOpen(false);
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setSelectedFile(null);
    setPreview(null);
  }

  return (
    <div>
      <Modal
        title="Create Book"
        open={isCreateOpen}
        onOk={() => handleSubmitBtn()}
        onCancel={() => resetAndCloseModal()}
        maskClosable={false}
        okText={"CREATE"}
      >
        <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <div>
            <span>Tiêu đề</span>
            <Input
              required={true}
              value={mainText}
              onChange={(event) => setMainText(event.target.value)}
            />
          </div>
          <div>
            <span>Tác giả</span>
            <Input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
          <div>
            <span>Giá tiền</span>
            <InputNumber
              style={{ width: "100%" }}
              min="0"
              addonAfter="đ"
              value={price}
              onChange={(event) => setPrice(event)}
            />
          </div>
          <div>
            <span>Số lượng</span>
            <InputNumber
              style={{ width: "100%" }}
              min="0"
              value={quantity}
              onChange={(event) => setQuantity(event)}
            />
          </div>
          <div>
            <span>Thể loại</span>
            <Select
              style={{ width: "100%" }}
              value={category}
              onChange={(event) => setCategory(event)}
              options={[
                { value: 'Arts', label: 'Arts' },
                { value: 'Business', label: 'Business' },
                { value: 'Comics', label: 'Comics' },
                { value: 'Cooking', label: 'Cooking' },
                { value: 'Entertainment', label: 'Entertainment' },
                { value: 'History', label: 'History' },
                { value: 'Music', label: 'Music' },
                { value: 'Sports', label: 'Sports' },
                { value: 'Teen', label: 'Teen' },
                { value: 'Travel', label: 'Travel' },
              ]}
            />
          </div>
          <div>
            <label htmlFor="btnUpload" style={{
              display: "block",
              width: "fit-content",
              marginTop: "15px",
              padding: "5px 10px",
              background: "orange",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              Upload Thumbnail
            </label>
            <input
              type="file" hidden id="btnUpload"
              // onChange={hanldeOnchangeFile}
              onChange={(event) => hanldeOnchangeFile(event)}
              onClick={(event) => event.target.value = null}
            />
          </div>
          {preview &&
            <>
              <div style={{
                marginTop: "10px",
                marginBottom: "15px",
                height: "100px", width: "150px",
              }}>
                <img
                  style={{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    display: "block",
                    margin: "0 auto 15px",
                    width: "150x",
                    height: "100px",
                  }}
                  src={preview}
                />
              </div>
            </>
          }
        </div>
      </Modal>
    </div>
  )
}

export default CreateBookControl;