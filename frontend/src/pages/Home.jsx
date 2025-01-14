import { useState } from "react";
import { Link } from "react-router-dom"; // Asegúrate de usar React Router
import renderImage from "../img/render.jpeg"

function Home() {
  const [showMenu, setShowMenu] = useState(false);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      margin: "0 auto",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    header: {
      backgroundColor: "red",
      color: "white",
      textShadow: "0 0  16px rgba(255, 255, 255, 0.9)",
      padding: "10px 20px",
      borderRadius: "8px",
      marginBottom: "20px",
      maxWidth: "5000px",
      margin: "20px auto",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      margin: "10px 0",
    },
    button: {
      backgroundColor: "white",
      color: "red",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "25px",
    },
    dropdown: {
      marginTop: "10px",
      display: showMenu ? "block" : "none",
      
    },
    dropdownItem: {
      margin: "10px 0",
    },

    image: {
        width: "100%",
        maxWidth: "800px",
        borderRadius: "50%",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        margin: "20px auto",
      },
    dropdownLink: {
      textDecoration: "none",
      color: "white",
      backgroundColor: "black",
      padding: "10px 15px",
      borderRadius: "5px",
      fontSize: "14px",
      display: "inline-block",
      transition: "background-color 0.2s ease",
    },
    dropdownLinkHover: {
      backgroundColor: "#f5f5f5",
    },
  };

  return (
    <div style={styles.container}>
      
      <header style={styles.header}>
        <h1 style={styles.title}>Bienvenido a nuestra Aerolínea Etérea</h1>
        <button
          style={styles.button}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          Explora nuestras funcionalidades
        </button>
        <div style={styles.dropdown}>
          <div style={styles.dropdownItem}>
            <Link to="/CreateCliente" style={styles.dropdownLink}>
              Gestión de clientes
            </Link>
          </div>
          <div style={styles.dropdownItem}>
            <Link to="/CreatePasajero" style={styles.dropdownLink}>
              Gestión de pasajeros
            </Link>
          </div>
          <div style={styles.dropdownItem}>
            <Link to="/vuelos" style={styles.dropdownLink}>
              Gestión de vuelos
            </Link>
          </div>
        </div>
      </header>

      <img
        src={renderImage}
        alt="Render de la Aerolínea"
        style={styles.image}
      />

    </div>
  );
}

export default Home;







