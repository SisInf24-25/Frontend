import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="left">
        <Link to="/">Inicio</Link>
        <Link to="/new-page">Nueva Página</Link>
        <Link to="/contact">Contacto</Link>
      </div>
      <div className="right">
        <Link to="/">Iniciar sesión</Link>
        <Link to="/">Registrarse</Link>
      </div>
    </header>
  );
}

export default Header;