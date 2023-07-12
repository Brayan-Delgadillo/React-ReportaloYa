import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const Formulario = () => {
  const [nickname, setNickname] = useState('');
  const [colegio, setColegio] = useState('');
  const [nivel, setNivel] = useState('');
  const [grado, setGrado] = useState('');
  const [seccion, setSeccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [colegios, setColegios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getColegios();
  }, []);

  const getColegios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/colegios');
      const colegiosOrdenados = response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setColegios(colegiosOrdenados);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos requeridos
    if (!nickname || !colegio || !nivel || !grado || !seccion || !descripcion) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      const fechaActual = new Date(); // Obtener la fecha actual
      const response = await axios.post('http://localhost:8080/reportes', {
        nickname,
        colegio,
        nivel,
        grado,
        seccion,
        descripcion,
        fecha_pub: fechaActual // Enviar la fecha actual como java.util.Date
      });

      console.log(response.data); // Imprimir respuesta del servidor
      // Aquí puedes hacer algo con la respuesta del servidor, como mostrar un mensaje de éxito

      // Redireccionar al componente de Reportes
      navigate('/reportes');
    } catch (error) {
      console.error(error); // Manejar error en caso de fallo en la solicitud
      setError('Ocurrió un error al enviar el reporte');
    }
  };

  return (
    <div className="container">
      <h1>Formulario de Reporte</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nickname" className="form-label">Nickname:</label>
          <input
            type="text"
            className="form-control"
            id="nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="colegio" className="form-label">Colegio:</label>
          <Select
            options={colegios.map(colegio => ({ value: colegio.nombre, label: colegio.nombre }))}
            value={{ value: colegio, label: colegio }}
            onChange={(selectedOption) => setColegio(selectedOption.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nivel:</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="primaria"
              value="Primaria"
              checked={nivel === 'Primaria'}
              onChange={() => setNivel('Primaria')}
            />
            <label className="form-check-label" htmlFor="primaria">Primaria</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="secundaria"
              value="Secundaria"
              checked={nivel === 'Secundaria'}
              onChange={() => setNivel('Secundaria')}
            />
            <label className="form-check-label" htmlFor="secundaria">Secundaria</label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="grado" className="form-label">Grado:</label>
          <input
            type="text"
            className="form-control"
            id="grado"
            value={grado}
            onChange={(event) => setGrado(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="seccion" className="form-label">Sección:</label>
          <input
            type="text"
            className="form-control"
            id="seccion"
            value={seccion}
            onChange={(event) => setSeccion(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            id="descripcion"
            rows="4"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;