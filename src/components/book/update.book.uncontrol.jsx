import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookThumbnailAPI } from "../../services/api.service";

const UpdateBookUncontrol = (props) => {
  const { loadBook, dataUpdate, setDataUpdate, isModalUpdateOpen, setIsModalUpdateOpen } = props;

  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dataUpdate && dataUpdate._id) {
      form.setFieldsValue({
        id: dataUpdate._id,
        mainText: dataUpdate.mainText,
        author: dataUpdate.author,
        price: dataUpdate.price,
        quantity: dataUpdate.quantity,
        category: dataUpdate.category,
      });
      setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
    }
  }, [dataUpdate]);

  const updateBook = async (newThumbnail, values) => {
    const { id, mainText, price, quantity, author, category } = values;
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
    setLoading(false);
  }

  const handleSubmitBtn = async (values) => {
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
      setLoading(true);
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
        setLoading(false);
        return;
      }
    }

    await updateBook(newThumbnail, values);
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

  const resetAndCloseModal = () => {
    setIsModalUpdateOpen(false);
    setSelectedFile(null);
    setPreview(null);
    setDataUpdate(null);
    form.resetFields();
  }

  return (
    <Modal
      title="Update a Book"
      open={isModalUpdateOpen}
      onOk={() => form.submit()}
      okButtonProps={{
        loading: loading
      }}
      onCancel={() => resetAndCloseModal()}
      maskClosable={false}
      okText={"UPDATE"}
    >
      <Form
        form={form}
        layout="vertical"
        style={{
          margin: "10px",
        }}
        onFinish={handleSubmitBtn}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <Form.Item
              label="Id"
              name="id"
            >
              <Input disabled />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Tiêu đề"
              name="mainText"
              rules={[
                {
                  required: true,
                  message: 'Tiêu đề không được để trống!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Tác giả"
              name="author"
              rules={[
                {
                  required: true,
                  message: 'Tác giả không được để trống!',
                }
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Giá tiền"
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Giá tiền không được để trống!',
                }
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min="0"
                addonAfter="đ"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: 'Số lượng không được để trống!',
                }
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min="0"
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              label="Thể loại"
              name="category"
              rules={[
                {
                  required: true,
                  message: 'Thể loại không được để trống!',
                }
              ]}
            >
              <Select
                style={{ width: "100%" }}
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
            </Form.Item>
          </div>
          <div>
            <div>Ảnh thumbnail</div>
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
                style={{ display: "none" }}
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
        </div>
      </Form>
    </Modal>
  )
}

export default UpdateBookUncontrol;