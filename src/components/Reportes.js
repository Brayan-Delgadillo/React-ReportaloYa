import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Reportes() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    getReportes();
  }, []);

  const getReportes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/reportes');
      setReportes(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className='mt-4'>¡Ayúdanos a mejorar como sociedad!</h1>
      <p>Reporta tu caso o el de algún compañero o compañera que conozcas, y recuerda que NO ESTAS SOLO</p>
      <Link to="/formulario" className="btn btn-primary">Reportar</Link>
      {reportes.map((reporte) => (
        <div className="card mt-4 border border-primary-subtle" key={reporte.id}>
          <div className="card-body">
            <h5 className="card-title">{reporte.nickname}</h5>
            <p className="card-text">{reporte.descripcion}</p>
            <p className="card-text">
              <small className="text-muted">Fecha: {reporte.fecha_pub.slice(0, 10)}</small><br />
              <small className="text-muted">Colegio: {reporte.colegio}</small><br />
              <small className="text-muted">Nivel: {reporte.nivel}</small><br />
              <small className="text-muted">Grado: {reporte.grado}</small><br />
              <small className="text-muted">Sección: {reporte.seccion}</small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Reportes;
