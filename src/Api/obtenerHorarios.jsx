
import {useState, useEffect} from 'react';

const useObtenerHorarios = () => {
  const [obtenerHorarios, setObtenerHorarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHorarios = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch('https://backendbarberia-513e27855d49.herokuapp.com/api/obtenerHorarios');
        const resultado = await respuesta.json();
        setObtenerHorarios(resultado.obtener);
      } catch (error) {
        setError(error);
      } finally {
        setCargando(false);
      }
    };

    fetchHorarios();
  }, []);

  return { obtenerHorarios, cargando, error };
};

export default useObtenerHorarios;
