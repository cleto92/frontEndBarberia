/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Formik, Form, Field } from "formik";
import "animate.css";
import reservaMercadoPago from "../Api/reservarMercadoPago";

const Reservar = ({ cerrarReservar, obtenerHorarios }) => {
  const enviarReserva = async (values, { setSubmitting }) => {
    try {
      const datosReserva = {
        nombre: values.nombre,
        apellido: values.apellido,
        email: values.email,
        telefono: values.telefono,
        horarioReservaId: values.fecha,
      };
      const respuesta = await reservaMercadoPago(datosReserva);
      if (respuesta.Api_MercadoPago.sandbox_init_point) {
        window.open(respuesta.Api_MercadoPago.sandbox_init_point);
        cerrarReservar();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="animate__animated animate__flipInX fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-transparent p-8 rounded-lg shadow-xl max-w-3xl w-full">
        <h2 className="text-3xl font-bold text-white mb-8">Reservar</h2>

        <Formik
          initialValues={{
            nombre: "",
            apellido: "",
            email: "",
            telefono: "",
            fecha: "",
          }}
          onSubmit={enviarReserva}
        >
          {({ isSubmitting }) => (
            <Form className="">
              <div className="mb-6">
                <label
                  htmlFor="nombre"
                  className="block text-xl font-medium text-gray-300"
                >
                  Nombre
                </label>
                <Field
                  name="nombre"
                  type="text"
                  className="mt-2 block w-full size-8 rounded-lg border-gray-500 bg-gray-800 text-white shadow-md focus:border-black focus:ring focus:ring-opacity-50 focus:ring-black"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="apellido"
                  className="block text-xl font-medium text-gray-300"
                >
                  Apellido
                </label>
                <Field
                  name="apellido"
                  type="text"
                  className="mt-2 block w-full size-8 rounded-lg border-gray-500 bg-gray-800 text-white shadow-md focus:border-black focus:ring focus:ring-opacity-50 focus:ring-black"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-xl font-medium text-gray-300"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="mt-2 block w-full size-8 rounded-lg border-gray-500 bg-gray-800 text-white shadow-md focus:border-black focus:ring focus:ring-opacity-50 focus:ring-black"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="telefono"
                  className="block text-xl font-medium text-gray-300"
                >
                  Teléfono
                </label>
                <Field
                  name="telefono"
                  type="text"
                  className="mt-2 block w-full size-8 rounded-lg border-gray-500 bg-gray-800 text-white shadow-md focus:border-black focus:ring focus:ring-opacity-50 focus:ring-black"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="fecha"
                  className="block text-xl font-medium text-gray-300"
                >
                  Fechas Disponibles
                </label>
                <Field
                  as="select"
                  name="fecha"
                  className="mt-2 block w-full size-8 rounded-lg border-gray-500 bg-gray-800 text-white shadow-md focus:border-black focus:ring focus:ring-opacity-50 focus:ring-black"
                >
                  <option value="">Seleccionar una Fecha</option>
{
  obtenerHorarios
    .filter((horario) => horario.disponible === true)
    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
    .map((horario) => (
      <option key={horario._id} value={horario._id}>
        {`${horario.dia} | ${horario.hora} | ${horario.fecha} - Disponible`}
      </option>
    ))
}
                </Field>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cerrarReservar}
                  type="button"
                  className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-black text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {isSubmitting ? "Procesando..." : "Reservar"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Reservar;
