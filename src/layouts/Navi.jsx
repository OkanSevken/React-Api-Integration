import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Container } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import SignedOut from "./SignedOut";

function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
    }
  }, []);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserId(null);
    sessionStorage.removeItem('userId');
  };

  const handleSignIn = (id) => {
    setIsAuthenticated(true);
    setUserId(id);
    sessionStorage.setItem('userId', id);
  };

  const isAuthPage = location.pathname === "/" || location.pathname === "/giris" || location.pathname === "/register";
  const isSecretaryPage = location.pathname === "/appointments/add";
  const isRestrictedUser = ['1', '2', '3'].includes(userId);

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          {!isAuthPage && (
            <>
              {isSecretaryPage && !isRestrictedUser && (
                <>
                  <MenuItem as={Link} to="/appointments" name="Randevu" />
                  <MenuItem as={Link} to="/appointments/add" name="Sekreter Randevu ekle" />
                </>
              )}
              <MenuItem as={Link} to="/patientForDoctor/list" name="Doktor - Hasta Atama" />
            </>
          )}
          {!isAuthPage && !isRestrictedUser && (
            <MenuItem as={Link} to="/appointmentsForPatient/add" name="Hasta Randevu ekle" />
          )}
          <Menu.Menu position="right">
            {!isAuthPage && isAuthenticated && (
              <MenuItem as={Link} to="/" onClick={handleSignOut}>Çıkış Yap</MenuItem>
            )}
            {isAuthPage && !isAuthenticated && <SignedOut signIn={handleSignIn} />}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}

export default Navi;
