import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/inicio" className="navbar-brand">ReportaloYa</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/reportes" className="nav-link">Reportes</Link>
            </li>
            <NavDropdown title="Filtros" id="nav-dropdown">
              <NavDropdown.Item as={Link} to="/reportes-colegios">Reportes por colegios</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/reportes-grados">Reportes por grados</NavDropdown.Item>
            </NavDropdown>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;


