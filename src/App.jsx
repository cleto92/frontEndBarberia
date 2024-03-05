import { useState, useEffect } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Reservar from "./Components/Reservar";
import useObtenerHorarios from "./Api/obtenerHorarios";
import Leon from "./assets/reybarberia.jpg";
import io from "socket.io-client";
import ModalConfirmacion from "./Components/ModalConfirmacion";
import ModalCancelacion from "./Components/ModalCancelacion";

const App = () => {
  const { obtenerHorarios } = useObtenerHorarios();

  const [reservarModal, setReservarModal] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const [cancelarModal, setCancelarModal] = useState(false);

  useEffect(() => {
    const socket = io("https://backendbarberia-513e27855d49.herokuapp.com/", {
      transports: ["websocket"],
    });

    socket.on("pagoAprobado", (data) => {
      if (data.detallesPago.status === "approved") {
        localStorage.removeItem("modalCerrado");

        setModal({ isOpen: true, data: data.detallesPago });
        console.log("Pago aprobado:", data);
      }
    });

    return () => {
      socket.off("pagoAprobado");
    };
  }, []);

  useEffect(() => {
    const modalCerrado = localStorage.getItem("modalCerrado");
    if (modalCerrado) {
      setModal({ isOpen: false, data: null });
    }
  }, []);

  const cerrarModal = () => {
    setModal({ isOpen: false, data: null });
    localStorage.setItem("modalCerrado", "true");
  };

  const abrirReservar = () => setReservarModal(true);
  const cerrarReservar = () => setReservarModal(false);
  const abrirCancelar = () => setCancelarModal(true);
  const cerrarCancelar = () => setCancelarModal(false);

  return (
    <div>
      <section className="relative w-full min-h-screen p-20 py-10 flex justify-between items-center md:flex-row flex-col">
        <header className="absolute left-0 top-0 w-full py-10 flex items-center justify-between z-50 text-white px-24">
          <div className="flex-1"></div>
          <a href="#" className="flex items-center justify-center flex-1">
            <span className="text-3xl font-light text-white uppercase tracking-wide">
              Rey <span className="font-semibold text-2xl">Barbería</span>
            </span>
          </a>
          <div className="flex items-center flex-1 justify-end">
            <button
              onClick={abrirCancelar}
              className=" mr-10 font-semibold uppercase hover:bg-red-700 rounded transition hover:scale-105"
            >
              Cancelar Reserva
            </button>

            <a
              href="https://timely-parfait-26193c.netlify.app/login"
              className="font-semibold uppercase hover:bg-black transition hover:scale-105"
            >
              Panel
            </a>
          </div>
        </header>
        <img
          src={Leon}
          className=" absolute top-0 left-0 w-full h-full object-cover "
        />

        <div
          id="Overlay"
          className="absolute top-0 left-0 w-full h-full bg-black/95 flex justify-between items-center px-32 py-96"
        >
          <div className="flex flex-col items-start gap-4 z-50">
            <h1 className="text-5xl text-white">
              <span className="font-semibold text-6xl uppercase">Reservas</span>
            </h1>
            <p className="leading-relaxed mt-4 text-gray-200 md:block hidden">
              Click para realizar una reserva en Rey Barbería.
            </p>
            <button
              className="text-black bg-white border-0 py-2 px-8 my-4 text-md font-semibold uppercase tracking-widest hover:bg-gray-300 transition hover:scale-105"
              onClick={abrirReservar}
            >
              Reservar
            </button>
            {reservarModal && (
              <Reservar
                cerrarReservar={cerrarReservar}
                obtenerHorarios={obtenerHorarios}
              />
            )}
          </div>
          <div className="flex md:flex-col flex-row gap-10 z-50">
            <FaFacebook className="w-auto ml-64 h-6 text-white/50 hover:text-white hover:scale-150 transition" />
            <FaInstagram className="w-auto ml-64 h-6 text-white/50 hover:text-white hover:scale-150 transition" />
            <FaSquareXTwitter className="w-auto ml-64 h-6 text-white/50 hover:text-white hover:scale-150 transition" />
          </div>
        </div>
      </section>
      <ModalCancelacion isOpen={cancelarModal} onClose={cerrarCancelar} />
      <ModalConfirmacion
        isOpen={modal.isOpen}
        onClose={cerrarModal}
        detallesPago={modal.data}
      />
      <footer></footer>
    </div>
  );
};

export default App;
