import { Drawer } from "antd";
import { createUseStyles } from "react-jss";

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
    textAlign: "center",
  },
  avatarImage: {
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "block",
    margin: "0 auto",
    width: "300px",
    height: "250px",
  },
});

const ViewUserDetail = (props) => {
  const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;
  const classes = useStyles();

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
        </div>
      ) : (
        <p>Không có dữ liệu</p>
      )}
    </Drawer>
  );
};

export default ViewUserDetail;
