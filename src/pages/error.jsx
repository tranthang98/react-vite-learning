import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={{
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
    }}>
      <h1 style={{
        fontSize: "4rem",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#ff6b6b",
      }}>Oops!</h1>
      <p style={{
        fontSize: "1.2rem",
        marginBottom: "20px",
      }}>Sorry, an unexpected error has occurred.</p>
      {error && <p style={{
        fontStyle: "italic",
        color: "#555",
        marginBottom: "20px",
      }}>{error.statusText || error.message}</p>}
      <Link
        to="/"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "#007bff",
          borderRadius: "5px",
          textDecoration: "none",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Back to homepage
      </Link>
    </div>
  );
}
