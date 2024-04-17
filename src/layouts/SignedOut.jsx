import React from "react";
import { Button, MenuItem } from "semantic-ui-react";
import {Link} from 'react-router-dom';

export default function SignedOut({signIn}) {
  return (
    <div>
      <MenuItem>
      <Link to="/appointments">
          <Button primary onClick={signIn}>Giriş Yap</Button>
        </Link>
        <Button primary style={{marginLeft:'0.5em'}}>Kayıt Ol</Button>
      </MenuItem>
    </div>
  );
}   
