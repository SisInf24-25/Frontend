import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Style.css'

const Header = () => {
  return (
    <header className="header">
      <div className="left">
        <Link to="/">Inicio</Link>
        <Link to="/new-page">Nueva Página</Link>
        <Link to="/contact">Contacto</Link>
      </div>
      <div className="right">
        <Link to="/auth?action=login">Iniciar sesión</Link>
        <Link to="/auth?action=signup">Registrarse</Link>
      </div>
    </header>
  );
}

export default Header;