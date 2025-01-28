import { Button, Drawer, notification } from "antd";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

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
  avatarContainer: {
    marginTop: "10px",
    marginBottom: "15px",
    height: "100px", width: "150px",
  },
  avatarImage: {
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "block",
    margin: "0 auto 15px",
    width: "150x",
    height: "100px",
  },
});

const ViewUserDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, loadUser } = props;
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

  const handleUpdateUserAvatar = async () => {
    // step 1: upload file
    const resUpload = await handleUploadFile(selectedFile, "avatar");

    if (resUpload.data) {
      // success
      const newAvatar = resUpload.data.fileUploaded;
      // step 2: update user
      const resUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);

      if (resUpdateAvatar.data) {
        setIsDetailOpen(false);
        setSelectedFile(null);
        setPreview(null);
        await loadUser();

        notification.success({
          message: "Update user avatar",
          description: "Cập nhật thành công"
        })

      } else {
        notification.error({
          message: "Error upload avatar",
          description: JSON.stringify(resUpdateAvatar.message)
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
      title={<div className={classes.title}>Chi tiết User</div>}
      onClose={() => {
        setDataDetail(null);
        setIsDetailOpen(false);
      }}
      open={isDetailOpen}
    >
      {dataDetail ? (
        <div className={classes.drawerContent}>
          <p className={classes.paragraph}>Id: {dataDetail._id}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Full name: {dataDetail.fullName}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Email: {dataDetail.email}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Phone number: {dataDetail.phone}</p>
          <div className={classes.divider}></div>
          <p className={classes.paragraph}>Avatar:</p>
          <div className={classes.avatarContainer}>
            <img
              className={classes.avatarImage}
              src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
              alt="User Avatar"
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
              Upload Avatar
            </label>
            <input
              type="file" hidden id="btnUpload"
              // onChange={hanldeOnchangeFile}
              onChange={(event) => hanldeOnchangeFile(event)}
            />
          </div>
          {preview &&
            <>
              <div className={classes.avatarContainer}>
                <img
                  className={classes.avatarImage}
                  src={preview}
                />
              </div>
              <Button type="primary"
                onClick={handleUpdateUserAvatar}
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

export default ViewUserDetail;
