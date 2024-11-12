import React from 'react'
import { Link } from 'react-router-dom';
import '../Style/Style.css';
import { useSession } from '../Context/SessionContext';

const Header = () => {
  const { userSession, clearSession } = useSession();

  const validSession = (userSession) => {
    if (!userSession) {
      return false;
    }

    if (!userSession.user_id || userSession.user_id <= 0) {
      return false;
    }

    if (!userSession.username) {
      return false;
    }

    if (!(userSession.role === 'guest' || userSession.role === 'owner')) {
      return false;
    }

    return true;
  };

  return (
    <header className="header">
      <div className="left">
        <Link to="/">Inicio</Link>
        <Link to="/new-page">Nueva Página</Link>
        <Link to="/contact">Contacto</Link>
      </div>

      {!validSession(userSession) && (
        <div className="right">
          <Link to="/auth?action=login">Iniciar sesión</Link>
          <Link to="/auth?action=signup">Registrarse</Link>
        </div>
      )}

      {validSession(userSession) && (
        <div className="right">
          <Link
            to="/"
            onClick={() => {
              clearSession();
            }}
          >
            Cerrar sesión
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;