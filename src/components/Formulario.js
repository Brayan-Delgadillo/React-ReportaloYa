import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {
  const [nickname, setNickname] = useState('');
  const [colegio, setColegio] = useState('');
  const [grado, setGrado] = useState('');
  const [seccion, setSeccion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos requeridos
    if (!nickname || !colegio || !grado || !seccion || !descripcion) {
      setError('Todos los campos son requeridos');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/reportes', {
        nickname,
        colegio,
        grado,
        seccion,
        descripcion
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
          <input
            type="text"
            className="form-control"
            id="colegio"
            value={colegio}
            onChange={(event) => setColegio(event.target.value)}
          />
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
}

export default Formulario;