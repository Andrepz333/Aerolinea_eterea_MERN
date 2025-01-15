import { useState } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa estilos del carrusel
import { Carousel } from "react-responsive-carousel";
import renderImage from "../img/Flux_Dev_creame_una_imagen_que_este_en_un_fondo_negro_con_un_a_0.jpeg";
import image1 from "../img/Flux_Dev_Create_an_image_set_against_a_deep_rich_black_backgro_0.jpeg";
import image2 from "../img/Flux_Dev_creame_una_imagen_que_este_en_un_fondo_negro_con_un_a_3.jpeg";
import image3 from "../img/Flux_Dev_creame_una_imagen_que_este_en_un_fondo_negro_con_un_a_0.jpeg";

function Home() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="font-sans text-gray-900">
      {/* Barra de navegación y sección principal */}
      <nav className="bg-red-800 text-white py-4 shadow-lg relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white neon-text">Bienvenido a Aerolínea Etérea</h1>

          {/* Contenedor de botones */}
      <div className="flex items-center space-x-4">
        {/* Botón de Inicio */}
        <Link
          to="/"
          className="bg-white text-red-500 px-4 py-2 rounded-md shadow-md text-lg font-semibold hover:bg-red-100 transition"
        >
          Inicio
        </Link>

          {/* Menú desplegable en la barra de navegación */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="bg-white text-red-500 px-4 py-2 rounded-md shadow-md text-lg font-semibold hover:bg-red-100 transition"
            >
              Explora nuestras funcionalidades
            </button>
            {showMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-100 rounded-lg shadow-lg">
                <ul className="space-y-2 p-2">
                  <li>
                    <Link
                      to="/CreateCliente"
                      className="block text-black hover:text-red-500 p-2"
                    >
                      Gestión de clientes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/CreatePasajero"
                      className="block text-black hover:text-red-500 p-2"
                    >
                      Gestión de pasajeros
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/vuelos"
                      className="block text-black hover:text-red-500 p-2"
                    >
                      Gestión de vuelos
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        </div>
      </nav>

      {/* Carrusel de imágenes */}
      <div className="max-w-8xl mx-auto mt-10 z-0">
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus={false}
          dynamicHeight={false}
          className="shadow-lg rounded-lg"
        >
          <div>
            <img src={renderImage} alt="Render de la Aerolínea" />
            <p className="legend">Explora el Futuro</p>
          </div>
          <div>
            <img src={image1} alt="Destinos Increíbles" />
            <p className="legend">Destinos Increíbles</p>
          </div>
          <div>
            <img src={image2} alt="Confort Absoluto" />
            <p className="legend">Confort Absoluto</p>
          </div>
          <div>
            <img src={image3} alt="Viajes Memorable" />
            <p className="legend">Viajes Memorable</p>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default Home;








