import { Link, useRouteError } from "react-router-dom";
import { createUseStyles } from 'react-jss'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const useStyles = createUseStyles({
    errorPage: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f8f9fa",
      color: "#333",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    errorH1: {
      fontSize: "4rem",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#ff6b6b"
    },
    errorP: {
      fontSize: "1.2rem",
      marginBottom: "20px"
    },
    error2ndP: {
      fontStyle: "italic",
      color: "#555",
      marginBottom: "20px"
    },
    errorLink: {
      display: "inline-block",
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "#007bff",
      borderRadius: "5px",
      textDecoration: "none",
      transition: "background-color 0.3s ease"
    }
  })

  const classes = useStyles();
  return (
    <div className={classes.errorPage}>
      <h1 className={classes.errorH1}>Oops!</h1>
      <p className={classes.errorP}>Sorry, an unexpected error has occurred.</p>
      {
        error
        &&
        <p className={classes.error2ndP}>
          {error.statusText || error.message}
        </p>
      }
      <Link
        to="/"
        className={classes.errorLink}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Back to homepage
      </Link>
    </div>
  );
}
