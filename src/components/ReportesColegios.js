import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const ReportesColegios = () => {
  const [colegio, setColegio] = useState('');
  const [colegios, setColegios] = useState([]);
  const [reportes, setReportes] = useState([]);

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

  const fetchReportesPorColegio = async (selectedColegio) => {
    setColegio(selectedColegio);
    try {
      const response = await axios.get(`http://localhost:8080/reportes/query-colegio?colegio=${selectedColegio}`);
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
        <Select
          options={colegios.map(colegio => ({ value: colegio.nombre, label: colegio.nombre }))}
          value={colegio ? { value: colegio, label: colegio } : null}
          onChange={(selectedOption) => fetchReportesPorColegio(selectedOption?.value)}
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

      <br />
      <Link to="/descargar" className="btn btn-primary">Descargar</Link>
    </div>
  );
};

export default ReportesColegios;
