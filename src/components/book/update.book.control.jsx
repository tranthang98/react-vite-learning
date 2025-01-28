import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookThumbnailAPI } from "../../services/api.service";

const UpdateBookControl = (props) => {

  const { loadBook, dataUpdate, setDataUpdate, isModalUpdateOpen, setIsModalUpdateOpen } = props;

  const [id, setId] = useState("");
  const [mainText, setMainText] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");

  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

  // next dataUpdate != prev dataUpdate
  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      setId(dataUpdate._id)
      setMainText(dataUpdate.mainText);
      setAuthor(dataUpdate.author);
      setPrice(dataUpdate.price);
      setQuantity(dataUpdate.quantity);
      setCategory(dataUpdate.category);
      setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
    }
  }, [dataUpdate]);

  const updateBook = async (newThumbnail) => {
    const res = await updateBookThumbnailAPI(id, newThumbnail, mainText, price, quantity, author, category);
    if (res.data) {
      notification.success({
        message: "Update book",
        description: "Cập nhật book thành công"
      })
      resetAndCloseModal();
      await loadBook();
    } else {
      notification.error({
        message: "Error update book",
        description: JSON.stringify(res.message)
      })
    }
  }

  const handleSubmitBtn = async () => {
    if (!preview && !selectedFile) {
      notification.error({
        message: "Error update book",
        description: "Vui lòng upload ảnh thumbnail"
      })
      return;
    }

    let newThumbnail = "";
    if (preview && !selectedFile) {
      newThumbnail = dataUpdate.thumbnail;
    } else {
      console.log(">>> selectedFile: ", selectedFile);
      const resUpload = await handleUploadFile(selectedFile, "book");
      if (resUpload.data) {
        // success
        newThumbnail = resUpload.data.fileUploaded;
      } else {
        // failed
        notification.error({
          message: "Error upload thumbnail",
          description: JSON.stringify(resUpload.message)
        })
        return;
      }
    }

    await updateBook(newThumbnail);
  }

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setId("");
    setMainText("");
    setAuthor("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setSelectedFile(null);
    setPreview(null);
    setDataUpdate(null);
  }

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

  return (
    <Modal
      title="Update a Book"
      open={isModalUpdateOpen}
      onOk={() => handleSubmitBtn()}
      onCancel={() => resetAndCloseModal()}
      maskClosable={false}
      okText={"UPDATE"}
    >
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <div>
          <span>Id</span>
          <Input
            value={id}
            disabled
          />
        </div>
        <div>
          <span>Tiêu đề</span>
          <Input
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
  )
}

export default UpdateBookControl;