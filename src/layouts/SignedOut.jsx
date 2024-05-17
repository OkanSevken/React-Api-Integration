import React from "react";
import { Button, MenuItem } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Giris from "../pages/Giris";

export default function SignedOut({ Giris }) {
  return (
    <div>
      <MenuItem>
        <Link to="/giris">
          <Button primary onClick={Giris}>
            Giriş Yap
          </Button>
        </Link>
        <Link to="/register">
          <Button primary style={{ marginLeft: "0.5em" }}>
            Kayıt Ol
          </Button>
        </Link>
      </MenuItem>
    </div>
  );
}
