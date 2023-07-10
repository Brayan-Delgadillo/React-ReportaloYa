import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <img src="https://img.freepik.com/vector-gratis/dejar-bullying-concepto-ilustracion_52683-40743.jpg?w=2000" alt="Dejar bullying concepto" className="img-fluid" />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 ">
          <div className="left-section">
            <h2>El bullying es inaceptable</h2>
            <p>
              Ya sea que estés siendo víctima de bullying o seas testigo de un ataque contra otros, hay muchas cosas que puedes hacer para pararlo. Lo mejor es que se lo comuniques a alguien para poder ayudarte.
            </p>
          </div>
        </div>
        <div className="col-lg-6 text-center">
          <div className="right-section">
            <h2>Ayúdanos reportando un caso</h2>
            <Link to="/formulario" className="btn btn-primary">Reportar</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
