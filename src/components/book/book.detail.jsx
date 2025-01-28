import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import BookCarousel from "./book.slider";

const useStyles = createUseStyles({
  drawerContent: {
    fontFamily: "Arial, sans-serif",
    color: "#333",
    lineHeight: 1.6,
    padding: "10px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#0073e6",
    textAlign: "center",
    marginBottom: "20px",
  },
  paragraph: {
    margin: "10px 0",
    fontSize: "16px",
  },
  divider: {
    borderBottom: "1px solid #ddd",
    margin: "15px 0",
  },
  bookContainer: {
    marginTop: "10px",
    marginBottom: "15px",
    height: "100px", width: "150px",
  },
  bookImage: {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "block",
    margin: "0 auto 15px",
    width: "150x",
    height: "100px",
  },
});

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '500px'
}

const BookDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setDetailOpen, loadBook } = props;
  const classes = useStyles();

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

  const handleUpdateBookThumbnail = async () => {
    // step 1: upload file
    const resUpload = await handleUploadFile(selectedFile, "book");

    if (resUpload.data) {
      // success
      const newBookThumbnail = resUpload.data.fileUploaded;
      // step 2: update book
      const resUpdateBook = await updateBookAPI(dataDetail._id, newBookThumbnail);

      if (resUpdateBook.data) {
        setDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadBook();

        notification.success({
          message: "Update user thumbnail",
          description: "Cập nhật thành công"
        })

      } else {
        notification.error({
          message: "Error upload thumbnail",
          description: JSON.stringify(resUpdateBook.message)
        })
      }

    } else {
      // failed
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message)
      })
    }
  }

  return (
    <Drawer
      width={"30vw"}
      title={<div className={classes.title}>Chi tiết Book</div>}
      onClose={() => {
        setDataDetail(null);
        setDetailOpen(false);
      }}
      open={isDetailOpen}
    >
      {dataDetail ? (
        <div className={classes.drawerContent}>
          {/* {dataDetail.slider && dataDetail.slider.length > 0 &&
            <div className="slide-container">
              <Slide>
                {dataDetail.slider.map((slideImage, index) => {
                  return (
                    <div key={index}>
                      <div style={{ ...divStyle, backgroundImage: `url(${import.meta.env.VITE_BACKEND_URL}/images/book/${slideImage})` }}>
                      </div>
                    </div>
                  )
                }
                )}
              </Slide>
            </div>
          } */}
          {dataDetail.slider && dataDetail.slider.length > 0 &&
            <BookCarousel image={dataDetail.slider} />
          }
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Id: {dataDetail._id}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Tiêu đề: {dataDetail.mainText}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Giá tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(dataDetail.price)}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Số lượng đã bán: {dataDetail.sold}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Số lượng: {dataDetail.quantity}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Tác giả: {dataDetail.author}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Thể loại: {dataDetail.category}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Ảnh thumbnail:</p>
          <div className={classes.bookContainer}>
            <img
              className={classes.bookImage}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataDetail.thumbnail}`}
              alt="Book Thumbnail"
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
            />
          </div>
          {preview &&
            <>
              <div className={classes.bookContainer}>
                <img
                  className={classes.bookImage}
                  src={preview}
                />
              </div>
              <Button type="primary"
                onClick={handleUpdateBookThumbnail}
              >Save</Button>
            </>
          }
        </div>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Drawer>
  );
};

export default BookDetail;
