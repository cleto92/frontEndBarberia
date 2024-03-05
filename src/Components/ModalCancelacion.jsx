/* eslint-disable react/prop-types */
import { useState } from "react";

const ModalCancelacion = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [claveDeCancelacion, setClaveDeCancelacion] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessMessage(false);
    setErrorMessage(''); 
    try {
      const respuesta = await fetch("https://backendbarberia-513e27855d49.herokuapp.com/api/cancelarReserva", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          claveDeCancelacion: claveDeCancelacion.trim(),
        }),
      });

      if (respuesta.ok) {

        setShowSuccessMessage(true);
        setTimeout(() => {
          onClose();
          setShowSuccessMessage(false); 
        }, 3000); 
      } else {
        const data = await respuesta.json();
        setErrorMessage(data.mensaje || 'Error desconocido, por favor verifica tu email y código de cancelación.');
      }
    } catch (error) {
      console.error('Error al cancelar la reserva', error);
      setErrorMessage('Error al procesar la solicitud. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className={`fixed inset-0 bg-transparent bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ${!isOpen && 'hidden'}`}>
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white animate__animated animate__fadeIn">
      {showSuccessMessage && (
        <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg  dark:bg-green-200 dark:text-green-800" role="alert">
          Reserva Cancelada con Éxito
        </div>
      )}
      {errorMessage && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Cancelar Reserva</h3>
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-5">
            <div className="mt-4">
              <input
                type="email"
                placeholder="Email"
                className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Código de cancelación"
                className="mt-1 p-2 w-full rounded-md border-gray-300 shadow-sm"
                required
                value={claveDeCancelacion}
                onChange={(e) => setClaveDeCancelacion(e.target.value.trim())}
              />
            </div>
            <div className="items-center px-4 py-3 space-y-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancelar Reserva
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCancelacion;
