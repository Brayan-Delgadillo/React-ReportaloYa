import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ReportesColegios = () => {
  const [colegio, setColegio] = useState('');
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    fetchReportesPorColegio(colegio);
  }, [colegio]);

  const fetchReportesPorColegio = async (colegio) => {
    try {
      const response = await axios.get(`http://localhost:8080/reportes/query-colegio?colegio=${colegio}`);
      setReportes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Reportes por Colegios</h1>
      <div className="form-group">
        <label htmlFor="colegioInput">Buscar por colegio:</label>
        <input
          type="text"
          id="colegioInput"
          className="form-control mt-3"
          value={colegio}
          onChange={(e) => setColegio(e.target.value)}
        />
      </div>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nickname</th>
            <th>Descripción</th>
            <th>Colegio</th>
            <th>Grado</th>
            <th>Sección</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id}>
              <td>{reporte.id}</td>
              <td>{reporte.nickname}</td>
              <td>{reporte.descripcion}</td>
              <td>{reporte.colegio}</td>
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

export default ReportesColegios;