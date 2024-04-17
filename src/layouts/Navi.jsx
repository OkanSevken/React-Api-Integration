import React, { useState } from "react";
import { MenuMenu, MenuItem, Menu, Container } from "semantic-ui-react";
import SignedOut from "./SignedOut";
import SignedIn from "./SignedIn";
import { Link } from "react-router-dom"; // React Router'dan Link ekleyin

function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleSignOut=()=>{
    setIsAuthenticated(false)
  
  }

  const handleSignIn=()=>{
    setIsAuthenticated(true)
  }

  return (
    <div>
      <Menu inverted fixed="top">
        <Container>
          <MenuItem as={Link} to="/appointments" name="Randevu" /> {/* Ana sayfaya yönlendirme */}
          <MenuItem as={Link} to="/appointments/add" name="Randevu ekle" /> {/* Mesajlar sayfasına yönlendirme */}
          <MenuItem as={Link} to="/doctorCheck/add" name="Doktor Kontrol" /> {/* Ana sayfaya yönlendirme */}
          <MenuItem as={Link} to="/appointments/update/:id" name="Randevu Güncelle" /> {/* Ana sayfaya yönlendirme */}
          <MenuMenu position="right">
            {isAuthenticated ? <SignedIn signOut={handleSignOut} birsey="1" /> : <SignedOut signIn={handleSignIn} />}
          </MenuMenu>
        </Container>
      </Menu>
    </div>
  );
}

export default Navi;
