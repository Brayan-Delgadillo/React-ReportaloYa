import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReportesGrados = () => {
  const [grado, setGrado] = useState('');
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    fetchReportesPorGrado(grado);
  }, [grado]);

  const fetchReportesPorGrado = async (colegio) => {
    try {
      const response = await axios.get(`http://localhost:8080/reportes/query-grado?grado=${grado}`);
      setReportes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Reportes por Grado</h1>
      <div className="form-group">
        <label htmlFor="colegioInput">Buscar por grado:</label>
        <input
          type="text"
          id="gradoInput"
          className="form-control mt-3"
          value={grado}
          onChange={(e) => setGrado(e.target.value)}
        />
      </div>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nickname</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Colegio</th>
            <th>Nivel</th>
            <th>Grado</th>
            <th>Sección</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id}>
              <td>{reporte.id}</td>
              <td>{reporte.nickname}</td>
              <td>{reporte.fecha_pub.slice(0, 10)}</td>
              <td>{reporte.descripcion}</td>
              <td>{reporte.colegio}</td>
              <td>{reporte.nivel}</td>
              <td>{reporte.grado}</td>
              <td>{reporte.seccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <br></br>
      <Link to="/descargar" className="btn btn-primary">Descargar</Link>
    </div>
  );
};

export default ReportesGrados;