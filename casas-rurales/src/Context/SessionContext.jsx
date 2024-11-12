import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Crea el contexto de sesión
const SessionContext = createContext();

// Proveedor del contexto
export const SessionProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    // Recuperar los datos de sesión cuando se monta el componente
    const sessionData = Cookies.get('session');
    if (sessionData) {
      try {
        const parsedData = JSON.parse(sessionData);
        setUserSession(parsedData);
      } catch (error) {
        console.error('Error al parsear la cookie de sesión', error);
      }
    }
  }, []);

  // Función para actualizar la sesión
  const setSession = (data) => {
    Cookies.set('session', JSON.stringify(data), { expires: 7, secure: true, sameSite: 'strict' });
    setUserSession(data);
  };

  // Función para eliminar la sesión
  const clearSession = () => {
    Cookies.remove('session');
    setUserSession(null);
  };

  return (
    <SessionContext.Provider value={{ userSession, setSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);